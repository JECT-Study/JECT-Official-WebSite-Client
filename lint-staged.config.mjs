export default {
  "*.{ts,tsx,js,css,md,json}": {
    title: "staging된 파일에 대해 prettier를 적용합니다",
    task: files => {
      `prettier --write ${files.join(" ")}`;
    },
  },
};
1;
