import { Checkbox } from "@ject/jds";

const TERMS = {
  privacy: {
    id: "privacy-checkbox",
    labelPrefix: "[필수] ",
    labelText: "젝트 개인정보 수집 및 이용에 동의합니다.",
    linkText: "개인 정보 수집 및 이용 동의서",
    linkHref:
      "https://cultured-phalange-7de.notion.site/4-2cd62a893ac58049b49add2f2096df57?source=copy_link",
  },
  paymentPolicy: {
    id: "payment-policy-checkbox",
    labelPrefix: "[필수] ",
    labelText: "회비 및 보증금 납입 정책에 동의합니다.",
    linkText: "회비 및 보증금 납입 정책 동의서",
    linkHref:
      "https://cultured-phalange-7de.notion.site/4-2cd62a893ac580a7932eee555dea07a0?source=copy_link",
  },
} as const;

export type TermsAgreement = {
  privacy: boolean;
  paymentPolicy: boolean;
};

interface TermsCheckboxGroupProps {
  value: TermsAgreement;
  onChange: (next: TermsAgreement) => void;
}

export function TermsCheckboxGroup({ value, onChange }: TermsCheckboxGroupProps) {
  const handleChange = (key: keyof TermsAgreement) => (checked: boolean) => {
    onChange({ ...value, [key]: checked });
  };

  return (
    <div className='flex flex-col gap-(--semantic-spacing-24) self-stretch'>
      {(Object.keys(TERMS) as (keyof typeof TERMS)[]).map(key => {
        const term = TERMS[key];
        return (
          <Checkbox.Content
            key={term.id}
            id={term.id}
            checked={value[key]}
            onCheckedChange={checked => handleChange(key)(checked === true)}
            label={
              <>
                <span className='!text-feedback-notification-dark'>{term.labelPrefix}</span>
                {term.labelText}
              </>
            }
            subLabel={
              <a
                href={term.linkHref}
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--semantic-object-alternative)] !underline'
              >
                {term.linkText}
              </a>
            }
            size='md'
          />
        );
      })}
    </div>
  );
}
