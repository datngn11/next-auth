import { Suspense } from "react";
import EmailVerificationForm from "components/Auth/EmailVerificationForm";

const EmailVerificationPage = () => {
  return (
    <Suspense>
      <EmailVerificationForm />
    </Suspense>
  );
};

export default EmailVerificationPage;
