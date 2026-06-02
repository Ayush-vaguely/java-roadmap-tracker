import { signupAction } from "@/actions/signup-action";
export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded p-6">
        <h1 className="text-2xl font-bold mb-4">
          Sign Up
        </h1>

        <form action={signupAction}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}