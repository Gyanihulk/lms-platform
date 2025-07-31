"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Loader2 } from "lucide-react";



export const VerifyCard = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isVerifying, setIsVerifying] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleVerification = async () => {
      if (!token) {
        setError("Invalid verification link");
        setIsVerifying(false);
        return;
      }

      // const result = await verifyEmailToken(token);

      // if (result.success) {
      //   setSuccess(result.message);
      // } else {
      //   setError(result.message);
      // }

      setIsVerifying(false);
    };

    handleVerification();
  }, [token]);

  return (
    <CardWrapper
      headerLabel="Email Verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="space-y-4 text-center">
        {isVerifying ? (
          <div className="flex justify-center items-center space-x-2">
            <Loader2 className="animate-spin" />
            <p>Verifying your email...</p>
          </div>
        ) : (
          <>
            {success && <FormSuccess message={success} />}
            {error && <FormError message={error} />}
          </>
        )}
      </div>
    </CardWrapper>
  );
};
