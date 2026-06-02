import { loginAction } from "@/actions/login-action";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded p-6">
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <form action={loginAction}>
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
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">
          No account?{" "}
          <Link
            href="/signup"
            className="text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}