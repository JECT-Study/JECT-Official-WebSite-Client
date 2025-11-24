import atom from "@/assets/images/atom.png";
import clipboard from "@/assets/images/clipboard.png";
import cursor from "@/assets/images/cursor.png";
import mobius from "@/assets/images/mobius.png";
import stack from "@/assets/images/stack.png";
import type { RoleVariant } from "@/types/ui/role";

const variantMap: Record<
  RoleVariant,
  {
    text: string;
    icon: string;
    style: string;
  }
> = {
  fe: {
    text: "프론트엔드 개발자",
    icon: atom,
    style: "bg-role-fe-trans-neutral-dark text-role-fe-normal-dark",
  },
  be: {
    text: "백엔드 개발자",
    icon: stack,
    style: "bg-role-be-trans-neutral-dark text-role-be-normal-dark",
  },
  do: {
    text: "데브옵스 엔지니어",
    icon: mobius,
    style: "bg-role-do-trans-neutral-dark text-role-do-normal-dark",
  },
  pm: {
    text: "프로덕트 매니저",
    icon: clipboard,
    style: "bg-role-pm-trans-neutral-dark text-role-pm-normal-dark",
  },
  pd: {
    text: "프로덕트 디자이너",
    icon: cursor,
    style: "bg-role-pd-trans-neutral-dark text-role-pd-normal-dark",
  },
};

interface BadgeProps {
  variant: RoleVariant;
}

export const RoleBadge = ({ variant }: BadgeProps) => {
  const { text, icon, style } = variantMap[variant];

  return (
    <div
      className={`${style} gap-md radius-sm display-04 inline-flex flex-row items-center px-(--gap-2xl) py-(--gap-6xs)`}
    >
      <span>{text}</span>
      <img src={icon} alt={`${text} 아이콘`} className="h-[4.5rem] w-[4.5rem] object-contain" />
    </div>
  );
};

export default RoleBadge;
