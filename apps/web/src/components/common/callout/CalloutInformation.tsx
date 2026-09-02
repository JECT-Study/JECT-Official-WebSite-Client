import Label from "@/components/common/label/Label";

interface CalloutProps {
  title: string;
  labels?: string[];
}

function CalloutInformation({ title, labels = [] }: CalloutProps) {
  return (
    <div className='gap-xs radius-xs flex w-full items-center border border-border-assistive-dark bg-surface-deep-dark px-(--gap-lg) py-(--gap-xs)'>
      <Label hierarchy='stronger' weight='bold' textColor='text-object-hero-dark'>
        {title}
      </Label>
      {labels.map(label => (
        <Label key={label} hierarchy='normal' weight='normal' textColor='text-object-neutral-dark'>
          {label}
        </Label>
      ))}
    </div>
  );
}

export default CalloutInformation;
