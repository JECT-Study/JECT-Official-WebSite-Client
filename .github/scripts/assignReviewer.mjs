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

  // 실제 가장 최근 PR 찾기
  let lastReviewerIndex = -1;
  let previousPR = null;

  try {
    console.log('가장 최근 PR 찾는 중...');

    // PR 목록 가져오기 (Issue는 제외됨)
    const { data: recentPRs } = await octokit.rest.pulls.list({
      owner,
      repo,
      state: 'all',
      sort: 'created',
      direction: 'desc',
      per_page: 20,
    });

    // 현재 PR보다 번호가 작은 것 중 가장 큰 번호 찾기
    previousPR = recentPRs
      .filter(pr => pr.number < prNumber)
      .sort((a, b) => b.number - a.number)[0];

    if (previousPR) {
      console.log(`이전 PR #${previousPR.number} 찾음`);

      // 해당 PR의 timeline event
      const { data: timeline } = await octokit.rest.issues.listEventsForTimeline({
        owner,
        repo,
        issue_number: previousPR.number,
      });
      // review_requested이벤트 찾기
      const reviewRequestEvents = timeline.filter(e => e.event === 'review_requested');

      if (reviewRequestEvents.length > 0) {
        const firstAssignedReviewer = reviewRequestEvents[0].requested_reviewer.login; //제일 처음 리뷰어로 할당된 사람
        lastReviewerIndex = eligibleReviewers.indexOf(firstAssignedReviewer);
        console.log(
          `이전 PR에 할당된 리뷰어: ${firstAssignedReviewer}, 인덱스: ${lastReviewerIndex}`,
        );
      }
    } else {
      console.log('이전 PR 없음 (첫 PR)');
    }
  } catch (error) {
    console.log('이전 PR 찾기 실패:', error.message);
  }

  // 다음 리뷰어 할당
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
