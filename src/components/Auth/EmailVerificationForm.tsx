"use client";
import { CardWrapper } from "components/Auth/CardWrapper";
import { FormError } from "components/FormError";
import { FormSuccess } from "components/FormSuccess";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { emailVerification } from "src/actions/email-verification";

const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      return setError("Missing token");
    }

    emailVerification(token)
      .then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Verify your email"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!error && !success && <BeatLoader color="#2563EB" />}

        <FormSuccess message={success} />

        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default EmailVerificationForm;
