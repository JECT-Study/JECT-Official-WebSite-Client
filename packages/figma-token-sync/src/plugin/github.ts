import type { TokenFile } from "./dtcg";
import type { SyncResult } from "../shared/messages";

const GITHUB_API = "https://api.github.com";

/** 동기화할 저장소와 브랜치, 커밋 정보 */
export interface SyncTarget {
  owner: string;
  repo: string;
  token: string;
  baseBranch: string;
  syncBranch: string;
  /** 토큰 파일을 둘 저장소 안의 디렉터리 */
  directory: string;
  commitMessage: string;
  pullRequestBody: string;
}

interface GitRef {
  object: { sha: string };
}

interface GitCommit {
  sha: string;
  tree: { sha: string };
}

interface GitTree {
  sha: string;
}

interface PullRequest {
  html_url: string;
}

interface ContentEntry {
  path: string;
  type: string;
}

type TreeEntry =
  | { path: string; mode: "100644"; type: "blob"; content: string }
  | { path: string; mode: "100644"; type: "blob"; sha: null };

/** GitHub API가 실패 응답을 돌려준 경우 */
export class GitHubRequestError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "GitHubRequestError";
  }
}

async function request<T>(
  target: SyncTarget,
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const response = await fetch(`${GITHUB_API}/repos/${target.owner}/${target.repo}${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${target.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const { message } = (await response.json().catch(() => ({}))) as { message?: string };

    throw new GitHubRequestError(
      response.status,
      `GitHub 요청이 실패했습니다 (${response.status} ${method} ${path}): ${message ?? response.statusText}`,
    );
  }

  return (await response.json()) as T;
}

/** 대상이 없으면(404) `null`을 돌려주는 요청 */
async function requestIfExists<T>(target: SyncTarget, path: string): Promise<T | null> {
  try {
    return await request<T>(target, "GET", path);
  } catch (error) {
    if (error instanceof GitHubRequestError && error.status === 404) return null;
    throw error;
  }
}

function joinPath(...segments: string[]): string {
  return segments
    .flatMap(segment => segment.split("/"))
    .filter(Boolean)
    .join("/");
}

function encodePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function getBranchSha(target: SyncTarget, branch: string): Promise<string | null> {
  const ref = await requestIfExists<GitRef>(target, `/git/ref/heads/${encodePath(branch)}`);

  return ref?.object.sha ?? null;
}

async function findOpenPullRequest(target: SyncTarget): Promise<PullRequest | null> {
  const head = encodeURIComponent(`${target.owner}:${target.syncBranch}`);
  const pullRequests = await request<PullRequest[]>(
    target,
    "GET",
    `/pulls?state=open&head=${head}`,
  );

  return pullRequests[0] ?? null;
}

/**
 * 이번에 쓰지 않는 기존 토큰 파일을 찾습니다.
 *
 * @remarks
 * Figma에서 모드 이름을 바꾸거나 모드를 지우면 예전 파일이 남으므로, 내보낸 컬렉션 폴더 안의 `*.tokens.json`만 정리합니다.
 */
async function findStaleTokenFiles(
  target: SyncTarget,
  commitSha: string,
  filePaths: string[],
): Promise<string[]> {
  const directories = [...new Set(filePaths.map(path => path.slice(0, path.lastIndexOf("/"))))];
  const writtenPaths = new Set(filePaths);
  const stalePaths: string[] = [];

  for (const directory of directories) {
    const entries = await requestIfExists<ContentEntry[]>(
      target,
      `/contents/${encodePath(directory)}?ref=${commitSha}`,
    );

    for (const entry of entries ?? []) {
      if (
        entry.type === "file" &&
        entry.path.endsWith(".tokens.json") &&
        !writtenPaths.has(entry.path)
      ) {
        stalePaths.push(entry.path);
      }
    }
  }

  return stalePaths;
}

/**
 * 토큰 파일을 커밋 하나로 올리고 동기화 PR을 만들거나 갱신합니다.
 *
 * @remarks
 * 동기화 브랜치에 열린 PR이 있으면 그 브랜치에 커밋을 더합니다. 없으면 브랜치를 base에서 새로 시작하고 PR을 엽니다.
 * 저장소의 내용과 같으면 커밋하지 않고 `unchanged`를 돌려줍니다.
 * @param onProgress 단계가 바뀔 때마다 사용자에게 보여 줄 문구로 호출됩니다.
 * @throws GitHub 요청이 실패한 경우 {@link GitHubRequestError}
 */
export async function syncTokenFiles(
  target: SyncTarget,
  files: TokenFile[],
  onProgress: (message: string) => void,
): Promise<SyncResult> {
  onProgress("저장소 상태를 확인하고 있습니다.");

  const baseSha = await getBranchSha(target, target.baseBranch);

  if (!baseSha) {
    throw new Error(`base 브랜치를 찾을 수 없습니다: ${target.baseBranch}`);
  }

  const [syncSha, openPullRequest] = await Promise.all([
    getBranchSha(target, target.syncBranch),
    findOpenPullRequest(target),
  ]);
  const parentSha = openPullRequest && syncSha ? syncSha : baseSha;
  const parentCommit = await request<GitCommit>(target, "GET", `/git/commits/${parentSha}`);

  const filesWithPath = files.map(file => ({
    path: joinPath(target.directory, file.path),
    content: file.content,
  }));
  const stalePaths = await findStaleTokenFiles(
    target,
    parentSha,
    filesWithPath.map(({ path }) => path),
  );

  onProgress("변경 사항을 비교하고 있습니다.");

  const treeEntries: TreeEntry[] = [
    ...filesWithPath.map(({ path, content }) => ({
      path,
      mode: "100644" as const,
      type: "blob" as const,
      content,
    })),
    ...stalePaths.map(path => ({
      path,
      mode: "100644" as const,
      type: "blob" as const,
      sha: null,
    })),
  ];
  const tree = await request<GitTree>(target, "POST", "/git/trees", {
    base_tree: parentCommit.tree.sha,
    tree: treeEntries,
  });

  if (tree.sha === parentCommit.tree.sha) {
    return { status: "unchanged", pullRequestUrl: openPullRequest?.html_url };
  }

  onProgress("커밋을 만들고 있습니다.");

  const commit = await request<GitCommit>(target, "POST", "/git/commits", {
    message: target.commitMessage,
    tree: tree.sha,
    parents: [parentSha],
  });

  if (syncSha) {
    await request(target, "PATCH", `/git/refs/heads/${encodePath(target.syncBranch)}`, {
      sha: commit.sha,
      force: !openPullRequest,
    });
  } else {
    await request(target, "POST", "/git/refs", {
      ref: `refs/heads/${target.syncBranch}`,
      sha: commit.sha,
    });
  }

  if (openPullRequest) {
    return { status: "updated", pullRequestUrl: openPullRequest.html_url, fileCount: files.length };
  }

  onProgress("Pull Request를 만들고 있습니다.");

  const pullRequest = await request<PullRequest>(target, "POST", "/pulls", {
    title: target.commitMessage,
    head: target.syncBranch,
    base: target.baseBranch,
    body: target.pullRequestBody,
  });

  return { status: "created", pullRequestUrl: pullRequest.html_url, fileCount: files.length };
}
