import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
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
        Create account
      </h1>

      <div className="space-y-4 mt-7">

        <input
          className="w-full rounded-xl border p-3"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleSignup}
          className="w-full rounded-xl bg-cyan-600 text-white p-3 font-bold hover:bg-cyan-700"
        >
          Create Account
        </button>

      </div>

      <p className="text-sm text-slate-500 mt-6">
        Already registered?{" "}
        <Link
          className="text-cyan-600 font-bold"
          to="/login"
        >
          Sign In
        </Link>
      </p>

    </div>
  );
}