import Label from './Label';

interface BadgeProps {
  text: string;
  backgroundColor: string;
  textColor: string;
}

function Badge({ text, backgroundColor, textColor }: BadgeProps) {
  return (
    <div className={`radius-2xs ${backgroundColor} inline-block px-(--gap-xs) py-(--gap-5xs)`}>
      <Label hierarchy='stronger' weight='normal' textColor={textColor}>
        {text}
      </Label>
    </div>
  );
}

export default Badge;
