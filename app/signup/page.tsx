import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        afterSignUpUrl="/dashboard"
      />
    </main>
  );
}