import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useRegisterMutation } from "@/redux/features/authApi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(formData).unwrap();

      // Success Alert
      Swal.fire({
        title: "Account Created!",
        text: "Your registration was successful. Welcome to Finn!",
        icon: "success",
        confirmButtonColor: "#d71920",
        iconColor: "#d71920",
      });

      navigate("/"); // Home-e pathiye deya
    } catch (err: any) {
      // Error Alert
      Swal.fire({
        title: "Registration Failed",
        text: err?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d71920",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="notranslate min-h-screen bg-white font-sans lg:grid lg:grid-cols-2">
      <section className="relative flex min-h-[230px] items-end overflow-hidden bg-slate-900 px-6 py-7 sm:min-h-[280px] lg:min-h-screen lg:px-12 lg:py-14">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/10" />
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
            Shop your everyday essentials
          </p>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            A better basket starts here.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Create your account to make your next grocery run simpler.
          </p>
        </div>
      </section>

      <main className="flex items-center justify-center px-5 py-9 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-7">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-[var(--market-leaf)]">
              <UserPlus size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Join Us
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Create an account to start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition-all focus:border-[var(--market-leaf)] focus:bg-white focus:ring-4 focus:ring-red-100"
                  placeholder="Anisul Haque"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
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
                  name="email"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition-all focus:border-[var(--market-leaf)] focus:bg-white focus:ring-4 focus:ring-red-100"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
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
                  name="password"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition-all focus:border-[var(--market-leaf)] focus:bg-white focus:ring-4 focus:ring-red-100"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Terms (Optional Aesthetic) */}
            <div className="flex items-center gap-2 px-1 pb-2">
              <CheckCircle2 size={14} className="text-[var(--market-leaf)]" />
              <span className="text-[11px] text-gray-500">
                By signing up, you agree to our terms & conditions.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--market-leaf)] py-4 font-bold text-white shadow-sm transition-colors hover:bg-[var(--market-leaf-deep)] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Free Account"
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[var(--market-leaf)] hover:underline"
            >
              Sign In Now
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
