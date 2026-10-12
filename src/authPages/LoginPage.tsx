import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Swal from "sweetalert2"; // SweetAlert2 Import
import { useLoginMutation } from "@/redux/features/authApi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();

      // Success SweetAlert
      Swal.fire({
        title: "Success!",
        text: `Welcome back, ${user.name}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        iconColor: "#d71920",
        didOpen: (modal) => {
          modal.style.borderRadius = "2rem";
        },
      });

      navigate("/");
    } catch (err: any) {
      // Error SweetAlert
      Swal.fire({
        title: "Login Failed",
        text:
          err?.data?.message || "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonColor: "#d71920",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="notranslate min-h-screen bg-white font-sans lg:grid lg:grid-cols-2">
      <section className="relative flex min-h-[230px] items-end overflow-hidden bg-slate-900 px-6 py-7 sm:min-h-[280px] lg:min-h-screen lg:px-12 lg:py-14">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
        <Link
          to="/"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 text-sm font-black text-white sm:left-8 sm:top-8"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-lg text-[var(--market-leaf)]">
            ✦
          </span>
          MainichiHalal Shop
        </Link>
        <div className="relative z-10 max-w-xl text-white">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
            Your everyday halal grocery
          </p>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Good food, ready for your table.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Sign in to pick up where you left off and keep your basket close.
          </p>
        </div>
      </section>

      <main className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
              <LogIn className="text-[var(--market-leaf)]" size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue your halal shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-[var(--market-leaf)] focus:bg-white focus:ring-4 focus:ring-red-100"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-[var(--market-leaf)] focus:bg-white focus:ring-4 focus:ring-red-100"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--market-leaf)] py-4 font-bold text-white shadow-sm transition-colors hover:bg-[var(--market-leaf-deep)] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            New here?{" "}
            <Link
              to="/register"
              className="font-bold text-[var(--market-leaf)] hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
