import { Hierarchy, labelStyle, Weight } from '@/styles/labelStyle';

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
      className={`${labelStyle.weight[weight].hierarchy[hierarchy].typo} ${labelStyle.weight[weight].hierarchy[hierarchy].lineHeight} gap-5xs flex`}
    >
      <span className={`${textColor} whitespace-nowrap`}>{text}</span>
      {isRequired && <span className='text-feedback-notification-dark'>*</span>}
    </div>
  );
}

export default Label;
