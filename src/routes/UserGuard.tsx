import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetMeQuery } from "@/redux/features/authApi";

const UserGuard = () => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useGetMeQuery(undefined);
  const [authCheckExpired, setAuthCheckExpired] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setAuthCheckExpired(true), 4000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (user && !isError) {
    return <Outlet />;
  }

  if (isLoading && !authCheckExpired) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-(--market-leaf)" />
      </div>
    );
  }

  if (isError || authCheckExpired || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }
  return null;
};

export default UserGuard;
