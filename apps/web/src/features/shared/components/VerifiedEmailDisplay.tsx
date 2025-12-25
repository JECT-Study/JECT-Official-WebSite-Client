import { BlockButton, TextField } from "@ject/jds";

interface VerifiedEmailDisplayProps {
  email: string;
  authCode: string;
}

export function VerifiedEmailDisplay({ email, authCode }: VerifiedEmailDisplayProps) {
  return (
    <div className='gap-7xl flex flex-col'>
      <TextField.Button
        type='email'
        label='이메일'
        readOnly
        value={email}
        onChange={() => {}}
        button={
          <BlockButton.Basic size='md' variant='solid' hierarchy='primary' disabled>
            인증번호 받기
          </BlockButton.Basic>
        }
      />
      <TextField.Button
        label='인증번호'
        validation='success'
        helperText='인증이 성공했습니다.'
        readOnly
        value={authCode}
        onChange={() => {}}
        button={
          <BlockButton.Basic size='md' variant='solid' hierarchy='primary' disabled>
            인증하기
          </BlockButton.Basic>
        }
      />
    </div>
  );
}
