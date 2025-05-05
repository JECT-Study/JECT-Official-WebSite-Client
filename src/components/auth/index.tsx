import { AuthFlowProvider } from './context';
import { EmailStep } from './EmailStep';
import { HelpLink } from './HelpLink';
import { PinLoginStep } from './PinLoginStep';
import { PinStep } from './PinStep';
import { ResetPinLink } from './ResetPinLink';
import { SubmitButton } from './SubmitButton';
import { AuthFlowProps } from './types';
import { VerificationStep } from './VerificationStep';

export const AuthFlow = ({ children, ...authFlowProps }: AuthFlowProps) => {
  return <AuthFlowProvider {...authFlowProps}>{children}</AuthFlowProvider>;
};

AuthFlow.Email = EmailStep;
AuthFlow.Verification = VerificationStep;
AuthFlow.Pin = PinStep;
AuthFlow.SubmitButton = SubmitButton;
AuthFlow.HelpLink = HelpLink;
AuthFlow.PinLogin = PinLoginStep;
AuthFlow.ResetPinLink = ResetPinLink;
