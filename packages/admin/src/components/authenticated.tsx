import { PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

type Props = {
  loading?: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
} & PropsWithChildren;

/**
 * This component is used to wrap routes that require authentication.
 * If the user is authenticated, it will render the children.
 * If the user is not authenticated, it will render the `fallback` prop if it's provided, otherwise it will redirect to the `redirectTo` prop.
 * @default loading: A loading spinner
 * @default redirectTo: "/login"
 */
export const Authenticated = ({
  fallback,
  loading = (
    <div>
      <div className="flex h-screen items-center justify-center space-x-2 bg-white dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black"></div>
      </div>
    </div>
  ),
  redirectTo = "/login",
  children,
}: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!session) {
    if (typeof fallback !== "undefined") {
      return <>{fallback}</>;
    } else {
      return <Navigate to={redirectTo} />;
    }
  }

  return children;
};
