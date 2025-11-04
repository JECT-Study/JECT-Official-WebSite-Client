import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function assignReviewer() {
  // GitHub 환경 변수에서 PR 관련 정보 가져오기
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  const [owner, repo] = repository.split('/');
  const prNumber = parseInt(process.env.PR_NUMBER);
  const prAuthor = process.env.PR_AUTHOR;

  // Octokit 초기화
  const octokit = new Octokit({ auth: token });

  // codeowner.json 파일에서 owners 배열 읽기
  const jsonPath = path.join(__dirname, 'codeowner.json');
  if (!fs.existsSync(jsonPath)) {
    console.log('codeowner.json 파일을 찾을 수 없습니다:', jsonPath);
    return;
  }
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const reviewers = Array.isArray(json.owners) ? [...json.owners] : [];

  console.log('codeowner.json에서 불러온 리뷰어:', reviewers);

  if (reviewers.length === 0) {
    console.log('codeowner.json 파일에 리뷰어가 없습니다.');
    return;
  }

  // PR 작성자를 리뷰 후보에서 제외
  const eligibleReviewers = reviewers.filter(r => r !== prAuthor);
  console.log('실제 선택 가능한 리뷰어:', eligibleReviewers);

  if (eligibleReviewers.length === 0) {
    console.log('할당 가능한 리뷰어가 없습니다.');
    return;
  }

  // 바로 이전 PR 번호(PR 번호 - 1)
  const previousPRNumber = prNumber - 1;
  let lastReviewerIndex = -1;
  let previousPR = null;

  if (previousPRNumber > 0) {
    try {
      console.log(`이전 PR #${previousPRNumber} 상태 확인 중`);
      const { data: prData } = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: previousPRNumber,
      });
      previousPR = prData;

      // 이전 PR의 요청된 리뷰어(없으면 리뷰 내역에서 잡음)
      if (previousPR.requested_reviewers && previousPR.requested_reviewers.length > 0) {
        const lastReviewer = previousPR.requested_reviewers[0].login;
        lastReviewerIndex = eligibleReviewers.indexOf(lastReviewer);
        console.log(`이전 리뷰어: ${lastReviewer}, 인덱스: ${lastReviewerIndex}`);
      } else {
        // 완료된 리뷰 내역에서 마지막 리뷰어 확인
        const { data: reviews } = await octokit.rest.pulls.listReviews({
          owner,
          repo,
          pull_number: previousPRNumber,
        });

        if (reviews.length > 0) {
          const lastReviewer = reviews[0].user.login;
          lastReviewerIndex = eligibleReviewers.indexOf(lastReviewer);
          console.log(`(review 내역) 이전 리뷰어: ${lastReviewer}, 인덱스: ${lastReviewerIndex}`);
        }
      }
    } catch (error) {
      console.log(`이전 PR #${previousPRNumber} 정보를 가져올 수 없거나 오류 발생:`, error.message);
    }
  } else {
    console.log('이 PR이 첫 번째 PR 입니다.');
  }

  // round-robin 방식으로 다음 리뷰어 할당 (close만 된 경우 제외)
  let nextReviewerIndex;
  if (lastReviewerIndex === -1) {
    nextReviewerIndex = 0;
    console.log('이전 리뷰어가 없어 0번부터 시작합니다.');
  } else {
    // 이전 PR이 close만 된 경우 (merge 안됨) → 같은 리뷰어
    if (previousPR && previousPR.state === 'closed' && !previousPR.merged) {
      nextReviewerIndex = lastReviewerIndex;
      console.log(`이전 PR이 merge 없이 close됨 → 같은 리뷰어 인덱스: ${nextReviewerIndex}`);
    } else {
      // merged 또는 open → 다음 리뷰어
      nextReviewerIndex = (lastReviewerIndex + 1) % eligibleReviewers.length;
      console.log(`다음 리뷰어 인덱스: ${nextReviewerIndex}`);
    }
  }

  const nextReviewer = eligibleReviewers[nextReviewerIndex];
  console.log(`최종 할당 리뷰어: ${nextReviewer}`);

  // 리뷰어 지정
  await octokit.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number: prNumber,
    reviewers: [nextReviewer],
  });

  console.log(`성공적으로 ${nextReviewer}에게 리뷰를 할당했습니다.`);
}

assignReviewer().catch(error => {
  console.error('실행 중 오류:', error);
  process.exit(1);
});
