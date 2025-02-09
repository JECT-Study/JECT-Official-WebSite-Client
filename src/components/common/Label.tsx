import { Hierarchy, labelStyle, Weight } from '@/styles/labelStyle';

interface LabelProps {
  hierarchy: Hierarchy;
  weight: Weight;
  text: string;
  textColor: string;
  isRequired?: boolean;
}

function Label({ weight, hierarchy, text, textColor, isRequired }: LabelProps) {
  const typo = labelStyle.weight[weight].hierarchy[hierarchy].typo;

  return (
    <div className={`${typo} gap-5xs flex`}>
      <span className={`${textColor} whitespace-nowrap`}>{text}</span>
      {isRequired && <span className='text-feedback-notification-dark'>*</span>}
    </div>
  );
}

export default Label;
