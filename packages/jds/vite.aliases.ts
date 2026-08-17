import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

const srcPath = (path: string) => resolve(rootDir, "src", path);

export const srcAliases = {
  components: srcPath("components"),
  hooks: srcPath("hooks"),
  style: srcPath("style"),
  theme: srcPath("theme"),
  tokens: srcPath("tokens"),
  types: srcPath("types"),
  utils: srcPath("utils"),
  "@": srcPath("."),
};
