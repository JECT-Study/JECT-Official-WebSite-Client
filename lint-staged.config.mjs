export default {
  "*.{ts,tsx,js,css,md,json}": stagedFiles => `prettier --write ${stagedFiles.join(" ")}`,
};
1;
