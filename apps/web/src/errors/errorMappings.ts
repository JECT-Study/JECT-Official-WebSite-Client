import { PATH } from "@/constants/path";
import router from "@/router";
import type { OpenDialogOption } from "@/stores/dialogStore";

export const internalApiErrorMapping: Record<
  string,
  (handlers: { openDialog: (option: OpenDialogOption) => void }) => void
> = {
  "G-10": () => void router.navigate(PATH.nonSpecificError),
  "G-07": ({ openDialog }) =>
    openDialog({
      type: "expiredSession",
      onPrimaryBtnClick: () => void router.navigate(PATH.apply),
    }),
  NOT_FOUND_MEMBER: () => void router.navigate(PATH.notFoundError),
  PROJECT_NOT_FOUND: () => void router.navigate(PATH.notFoundError),
  QUESTION_NOT_FOUND: () => void router.navigate(PATH.notFoundError),
  RECRUIT_NOT_FOUND: () => void router.navigate(PATH.notFoundError),
};

export const externalApiErrorMapping: Record<number, () => void> = {
  403: () => void router.navigate(PATH.notFoundError),
  404: () => void router.navigate(PATH.notFoundError),
};
