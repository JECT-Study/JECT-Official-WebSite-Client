import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// backstop은 Docker에서 실행되므로 호스트 서버 접근에 host.docker.internal을 사용한다.
const BASE_URL = process.env.VRT_BASE_URL ?? "http://host.docker.internal:6007";
const INDEX_PATH = resolve(root, "storybook-static/index.json");

const MOBILE_VIEWPORT = { label: "mobile", width: 375, height: 812 };
const DESKTOP_VIEWPORT = { label: "desktop", width: 1280, height: 800 };

const viewports = [DESKTOP_VIEWPORT];

// 스토리 tags로 시나리오 옵션을 분기한다. index.json에는 parameters가 실리지 않고 tags만 들어온다.
const TAG = {
  skip: "skip-vrt",
  mobile: "vrt-mobile",
  viewport: "vrt-viewport",
};

const captureDelay = Number(process.env.VRT_CAPTURE_DELAY) || (process.env.CI ? 1000 : 300);
const asyncCaptureLimit = Number(process.env.VRT_CAPTURE_LIMIT) || (process.env.CI ? 2 : 5);

function loadStories() {
  let index;
  try {
    index = JSON.parse(readFileSync(INDEX_PATH, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(
        `Storybook 인덱스를 찾을 수 없습니다: ${INDEX_PATH}\n먼저 "npm run sb:build" 를 실행하세요.`,
      );
    }
    throw new Error(
      `Storybook 인덱스를 파싱할 수 없습니다: ${INDEX_PATH}\n파일이 손상되었거나 불완전합니다. "npm run sb:build" 로 다시 생성하세요.`,
    );
  }

  return Object.values(index.entries ?? {}).filter(
    entry => entry.type === "story" && !(entry.tags ?? []).includes(TAG.skip),
  );
}

function toScenario(story) {
  const tags = new Set(story.tags ?? []);

  return {
    label: story.id,
    url: `${BASE_URL}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`,
    // 포털로 body에 붙는 오버레이는 컴포넌트 루트 바깥이라 뷰포트 전체를 잡아야 캡처된다.
    selectors: tags.has(TAG.viewport) ? ["viewport"] : ["#storybook-root"],
    readySelector: "#storybook-root",
    delay: captureDelay,
    misMatchThreshold: 0.1,
    ...(tags.has(TAG.mobile) ? { viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT] } : {}),
  };
}

const scenarios = loadStories().map(toScenario);

const config = {
  id: "jds-vrt",
  viewports,
  scenarios,
  paths: {
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report",
  },
  // HTML 리포트는 항상 생성되므로 로컬에선 직접 열고, CI에선 jUnit 리포트를 결과로 쓴다.
  report: ["CI"],
  engine: "puppeteer",
  engineOptions: { args: ["--no-sandbox"] },
  // 캡처 직전 애니메이션, 트랜지션, 커서 깜빡임 등을 제거해 오탐을 막는다.
  onReadyScript: "puppet/onReady.cjs",
  asyncCaptureLimit,
  asyncCompareLimit: 50,
};

writeFileSync(resolve(root, "backstop.json"), `${JSON.stringify(config, null, 2)}\n`);

const snapshotCount = scenarios.reduce(
  (total, scenario) => total + (scenario.viewports ?? viewports).length,
  0,
);
const mobileCount = scenarios.filter(scenario => scenario.viewports).length;
console.log(
  `Generated ${scenarios.length} scenarios (${mobileCount} with mobile) = ${snapshotCount} snapshots.`,
);
