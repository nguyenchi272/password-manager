import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { client } from "../../api/client";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = params.get("token");
    if (!token) return;

    client
      .get(`/auth/verify-email?token=${token}`)
      .then(() => setStatus("Email verified successfully!"))
      .catch(() => setStatus("Invalid or expired verification link"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">{status}</h1>
    </div>
  );
}
