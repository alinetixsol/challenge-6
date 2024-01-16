"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="place-items-center flex flex-col gap-10 bg-blue-300 w-full h-full items-center justify-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-black bg-white max-w-[20rem] container">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-black text-white font-bold cursor-pointer px-6 py-2 hover:bg-green-600 duration-200">
            Login
          </button>
          {error && (
            <div className="bg-red-600 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link className="text-md mt-3 text-center" href={"/register"}>
            Do not have an account?{" "}
            <span className="underline text-red-600 font-bold hover:text-green-500 duration-200">
              Register
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
