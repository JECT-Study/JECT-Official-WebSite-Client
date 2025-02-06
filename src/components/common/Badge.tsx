type Variant = 'normal' | 'info';

interface BadgeProps {
  variant: Variant;
  text: string;
}

interface Color {
  normal: {
    bg: string;
    text: string;
  };
  info: {
    bg: string;
    text: string;
  };
}

function Badge({ variant, text }: BadgeProps) {
  const color: Color = {
    normal: {
      bg: 'bg-fill-assistive-dark',
      text: 'text-object-normal-dark',
    },
    info: {
      bg: 'bg-feedback-trans-information-dark',
      text: 'text-feedback-information-dark',
    },
  };

  return (
    <div
      className={`radius-2xs ${variant === 'normal' ? color.normal.bg : color.info.bg} inline-block px-(--gap-xs) py-(--gap-5xs)`}
    >
      <span
        className={`label-lg whitespace-nowrap ${variant === 'normal' ? color.normal.text : color.info.text} leading-[27px]`}
      >
        {text}
      </span>
    </div>
  );
}

export default Badge;
