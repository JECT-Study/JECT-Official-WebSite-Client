import { httpClient } from "./interceptor";

import { API_ENDPOINT } from "@/constants/apiEndpoint";
import { API_BASE_URL } from "@/constants/env";

interface TestResult {
  endpoint: string;
  method: string;
  status: "success" | "error";
  statusCode?: number;
  responseTime: number;
  error?: string;
  requestBody?: unknown;
  responseData?: unknown;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const TestApi = async (
  endpoint: string,
  method: HttpMethod = "GET",
  body?: unknown,
  params?: Record<string, string>,
  headers?: Record<string, string>,
) => {
  const startTime = performance.now();
  const result: TestResult = {
    endpoint,
    method,
    status: "success",
    responseTime: 0,
    requestBody: body,
  };

  let url = endpoint;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url = `${endpoint}?${queryString}`;
  }

  const config = headers ? { headers } : undefined;

  try {
    let response;
    switch (method) {
      case "GET":
        response = await httpClient.get(url, config);
        break;
      case "POST":
        response = await httpClient.post(url, body, config);
        break;
      case "PUT":
        response = await httpClient.put(url, body, config);
        break;
      case "PATCH":
        response = await httpClient.patch(url, body, config);
        break;
      case "DELETE":
        response = await httpClient.delete(url, config);
        break;
    }

    result.statusCode = response.status;
    result.responseTime = performance.now() - startTime;
    result.responseData = response.data;

    console.log(`[${method}] ${url}`);
    console.log(`Status: ${response.status}`);
    console.log(`Time: ${result.responseTime.toFixed(2)}ms`);
    if (body) {
      console.log(`Request Body:`, body);
    }
    console.log(`Response:`, response.data);
  } catch (error) {
    result.status = "error";
    result.responseTime = performance.now() - startTime;

    if (error instanceof Error) {
      result.error = error.message;
    }

    console.error(`[${method}] ${url}`);
    console.error(`Error: ${result.error}`);
    console.error(`Time: ${result.responseTime.toFixed(2)}ms`);
    if (body) {
      console.error(`Request Body:`, body);
    }
  }

  return result;
};

export const TestAllEndpoints = async () => {
  console.log("API 테스트 시작");
  console.log(`Base URL: ${API_BASE_URL}`);
  console.log("─".repeat(50));

  const results: TestResult[] = [];

  const getEndpoints = [
    { path: API_ENDPOINT.miniStudy, name: "Mini Study" },
    { path: API_ENDPOINT.jectalk, name: "Jectalk" },
    { path: API_ENDPOINT.semesters, name: "Semesters" },
  ];

  for (const { path, name } of getEndpoints) {
    console.log(`\nTesting: ${name}`);
    const result = await TestApi(path, "GET");
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log("\n" + "─".repeat(50));
  console.log("테스트 요약");
  console.log("─".repeat(50));

  const successCount = results.filter(r => r.status === "success").length;
  const errorCount = results.filter(r => r.status === "error").length;
  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;

  console.log(`Success: ${successCount}`);
  console.log(`Error: ${errorCount}`);
  console.log(`Avg Response Time: ${avgResponseTime.toFixed(2)}ms`);

  return results;
};

export const testMiniStudy = () => TestApi(API_ENDPOINT.miniStudy, "GET");
export const testJectalk = () => TestApi(API_ENDPOINT.jectalk, "GET");
export const testSemesters = () => TestApi(API_ENDPOINT.semesters, "GET");
export const testProjectReviews = (page: number = 0, size: number = 10) =>
  TestApi(API_ENDPOINT.projectReview, "GET", undefined, {
    page: page.toString(),
    size: size.toString(),
  });

export const testProjectList = (
  category: "MAIN" | "HACKATHON" = "MAIN",
  page: number = 0,
  size: number = 10,
  semesterId?: number,
) => {
  const params: Record<string, string> = {
    category,
    page: page.toString(),
    size: size.toString(),
  };
  if (semesterId !== undefined) {
    params.semesterId = semesterId.toString();
  }
  return TestApi(API_ENDPOINT.projectList, "GET", undefined, params);
};

export const testProjectDetail = (projectId: string = "111") => {
  const url = API_ENDPOINT.projectDetail.replace(":projectId", projectId);
  return TestApi(url, "GET");
};

export const testApplicationStatus = () => TestApi(API_ENDPOINT.applyStatus, "GET");
export const testMemberProfileStatus = () =>
  TestApi(API_ENDPOINT.memberProfileInitialStatus, "GET");
export const testDraft = () => TestApi(API_ENDPOINT.draft, "GET");
export const testCheckEmailExists = (email: string = "test@example.com") =>
  TestApi(API_ENDPOINT.checkEmailExists, "GET", undefined, { email });

export const testSendAuthCode = (
  sendGroupCode: "email_auth" | "pin_reset" = "email_auth",
  email: string = "test@example.com",
) =>
  TestApi(API_ENDPOINT.sendEmailAuthCode, "POST", undefined, {
    sendGroupCode,
    email,
  });

export const testVerifyEmailCode = (
  email: string = "test@example.com",
  authCode: string = "123456",
  template: "AUTH_CODE" | "PIN_RESET" = "AUTH_CODE",
) => TestApi(API_ENDPOINT.verifyEmailCode, "POST", { email, authCode }, { template });

export const testApplyMember = (pin: string = "123456") =>
  TestApi(API_ENDPOINT.applyMember, "POST", { pin });

export const testPinLogin = (email: string = "test@example.com", pin: string = "123456") =>
  TestApi(API_ENDPOINT.pinLogin, "POST", { email, pin });

export const testRegisterMember = (pin: string = "123456") =>
  TestApi(API_ENDPOINT.registerMember, "POST", { pin });

export const testMemberProfileInitial = (
  name: string = "테스트",
  phoneNumber: string = "010-1234-5678",
) => TestApi(API_ENDPOINT.memberProfileInitial, "PUT", { name, phoneNumber });

export const testResetPin = (pin: string = "654321") =>
  TestApi(API_ENDPOINT.resetPin, "PUT", { pin });

export const testRefreshToken = () => TestApi(API_ENDPOINT.refreshToken, "POST");

export const testGetQuestions = (jobFamily: "PM" | "PD" | "FE" | "BE" = "FE") =>
  TestApi(API_ENDPOINT.question, "GET", undefined, { jobFamily });

export const testApplyProfile = (
  name: string = "홍길동",
  phoneNumber: string = "010-1234-5678",
  jobFamily: "PM" | "PD" | "FE" | "BE" = "PM",
  careerDetails: "STUDENT" | "EMPLOYED" | "UNEMPLOYED" = "STUDENT",
  experiencePeriod: "NONE" | "LESS_THAN_1" | "MORE_THAN_1" = "NONE",
  interestedDomains: string[] = ["Web Development"],
) =>
  TestApi(API_ENDPOINT.applyProfile, "POST", {
    name,
    phoneNumber,
    jobFamily,
    careerDetails,
    experiencePeriod,
    interestedDomains,
  });

export const testSaveDraft = (
  jobFamily: "PM" | "PD" | "FE" | "BE" = "FE",
  answers: Record<number, string> = { 1: "답변 1", 2: "답변 2" },
  portfolios: Array<{
    fileUrl: string;
    fileName: string;
    fileSize: string;
    sequence: string;
  }> = [],
) => TestApi(API_ENDPOINT.draft, "POST", { answers, portfolios }, { jobFamily });

export const testDeleteDraft = () => TestApi(API_ENDPOINT.draft, "DELETE");

export const testSubmitAnswer = (
  jobFamily: "PM" | "PD" | "FE" | "BE" = "FE",
  answers: Record<number, string> = { 1: "답변 1", 2: "답변 2" },
  portfolios: Array<{
    fileUrl: string;
    fileName: string;
    fileSize: string;
    sequence: string;
  }> = [],
) => TestApi(API_ENDPOINT.submitAnswer, "POST", { answers, portfolios }, { jobFamily });

export const testUploadPortfolio = (
  files: Array<{ name: string; contentType: string; contentLength: number }> = [
    {
      name: "portfolio.pdf",
      contentType: "application/pdf",
      contentLength: 1024000,
    },
  ],
) => TestApi(API_ENDPOINT.uploadPortfolio, "POST", files);

export const testUploadContent = (
  files: Array<{ name: string; contentType: string; contentLength: number }> = [
    {
      name: "content.pdf",
      contentType: "application/pdf",
      contentLength: 1024000,
    },
  ],
) => TestApi(API_ENDPOINT.uploadContent, "POST", files);

export const sampleData = {
  sendGroupCode: {
    emailAuth: "email_auth" as const,
    pinReset: "pin_reset" as const,
  },
  template: {
    emailAuth: "email_auth" as const,
    pinReset: "pin_reset" as const,
  },
  email: {
    valid: "test@ject.kr",
    invalid: "invalid-email",
  },
  pin: {
    valid: "123456",
    short: "1234",
  },
  authCode: "123456",
  memberProfile: {
    name: "홍길동",
    phoneNumber: "010-1234-5678",
  },
  jobFamily: ["PM", "PD", "FE", "BE"] as const,
  answers: {
    simple: { 1: "답변 1", 2: "답변 2" },
    detailed: {
      1: "JECT에 지원하게 된 동기는...",
      2: "제가 가진 강점은...",
      3: "https://github.com/username",
    },
  },
  portfolios: [
    {
      fileUrl: "https://cdn.example.com/portfolio1.pdf",
      fileName: "portfolio1.pdf",
      fileSize: "1.5MB",
      sequence: "1",
    },
  ],
};

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).apiTest = {
    all: TestAllEndpoints,
    miniStudy: testMiniStudy,
    jectalk: testJectalk,
    semesters: testSemesters,
    projectReviews: testProjectReviews,
    projectList: testProjectList,
    projectDetail: testProjectDetail,
    applicationStatus: testApplicationStatus,
    memberProfileStatus: testMemberProfileStatus,
    draft: testDraft,
    getQuestions: testGetQuestions,
    applyProfile: testApplyProfile,
    checkEmailExists: testCheckEmailExists,
    sendAuthCode: testSendAuthCode,
    verifyEmailCode: testVerifyEmailCode,
    applyMember: testApplyMember,
    pinLogin: testPinLogin,
    registerMember: testRegisterMember,
    memberProfileInitial: testMemberProfileInitial,
    resetPin: testResetPin,
    refreshToken: testRefreshToken,
    saveDraft: testSaveDraft,
    deleteDraft: testDeleteDraft,
    submitAnswer: testSubmitAnswer,
    uploadPortfolio: testUploadPortfolio,
    uploadContent: testUploadContent,
    custom: TestApi,
    samples: sampleData,
  };
  console.log("API 테스트 유틸리티 로드 완료");
  console.log("사용법: apiTest.all() 또는 apiTest.pinLogin() 등");
  console.log("샘플 데이터: apiTest.samples");
}
