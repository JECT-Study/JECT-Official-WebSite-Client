import pkg from "./package.json" with { type: "json" };

export const entry = {
  index: "src/index.ts",
  theme: "src/theme/index.tsx",
  hooks: "src/hooks/index.ts",
  utils: "src/utils/index.ts",
  tokens: "src/tokens/index.ts",
};

export const externalPackages = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];
