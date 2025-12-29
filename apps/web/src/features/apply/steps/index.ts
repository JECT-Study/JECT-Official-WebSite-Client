// ApplyFunnel (신규 유저)
export { EmailVerificationStep } from "./EmailVerificationStep";
export { PinSetupStep } from "./PinSetupStep";
export {
  ApplicationStatusStep,
  type ApplicationStatusEvents,
} from "./ApplicationStatusStep";

// ContinueWritingFunnel (이어쓰기)
export {
  IdentityVerificationStep,
  type IdentityVerificationEvents,
} from "./IdentityVerificationStep";

// 공통 (두 Funnel에서 공유)
export { ApplicantInfoStep } from "./ApplicantInfoStep";
export { RegistrationStep } from "./registration";
export { CompleteStep } from "./CompleteStep";
