import { useLocation, useNavigate } from "react-router-dom";

import { PATH } from "@/constants/path";
import { useDialogActions } from "@/stores/dialogStore";
import type { PathValues } from "@/types/ui/path";

interface NavigationItemProps {
  children: string;
  pathName: PathValues;
  disabled?: boolean;
}

function NavigationItem({ children, pathName, disabled = false }: NavigationItemProps) {
  const navigate = useNavigate();
  const { pathname: currentPathname } = useLocation();
  const { openDialog } = useDialogActions();

  const className = disabled
    ? "text-object-disabled-dark radius-2xs label-bold-lg px-(--gap-xs) py-(--gap-4xs) pointer-events-none"
    : (currentPathname === pathName
        ? "text-accent-hero-dark interaction-brand-subtle"
        : "text-object-hero-dark interaction-default-subtle") +
      " radius-2xs label-bold-lg cursor-pointer px-(--gap-xs) py-(--gap-4xs)";

  const handleClick = () => {
    if (
      currentPathname.startsWith(PATH.applyFunnel) ||
      currentPathname.startsWith(PATH.applyContinue)
    ) {
      return openDialog({
        type: "dirtyCheck",
        onPrimaryBtnClick: () => void navigate(pathName),
      });
    }

    void navigate(pathName);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

export default NavigationItem;
