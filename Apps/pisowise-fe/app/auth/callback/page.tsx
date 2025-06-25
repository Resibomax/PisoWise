import { Suspense } from "react";
import AuthCallback from "./ClientComponent";

export const dynamic = "force-dynamic";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading callback...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
