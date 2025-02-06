import { Hierarchy, labelType, Weight } from '@/styles/label';

interface LabelProps {
  hierarchy: Hierarchy;
  weight: Weight;
  text: string;
  textColor: string;
  isRequired?: boolean;
}

function Label({ weight, hierarchy, text, textColor, isRequired }: LabelProps) {
  return (
    <div
      className={`${labelType.weight[weight][hierarchy].typo} ${labelType.weight[weight][hierarchy].lineHeight} gap-5xs flex`}
    >
      <span className={`${textColor} whitespace-nowrap`}>{text}</span>
      {isRequired && <span className='text-feedback-notification-dark'>*</span>}
    </div>
  );
}

export default Label;
