import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem("ci_logged_in", "true");
    localStorage.setItem("ci_user", email);

    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-slate-100">

      <p className="text-cyan-600 font-bold text-sm">
        COMPINTEL AI
      </p>

      <h1 className="text-3xl font-black mt-2">
        Welcome back
      </h1>

      <p className="text-slate-500 mt-2 text-sm">
        Sign in to your intelligence workspace.
      </p>

      <form onSubmit={handleLogin} className="space-y-4 mt-7">

        <input
          className="w-full rounded-xl border p-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded-xl border p-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-cyan-600 text-white p-3 font-bold hover:bg-cyan-700"
        >
          Sign In
        </button>

      </form>

      <p className="text-sm text-slate-500 mt-6">
        New here?{" "}
        <Link
          className="text-cyan-600 font-bold"
          to="/signup"
        >
          Create account
        </Link>
      </p>

    </div>
  );
}