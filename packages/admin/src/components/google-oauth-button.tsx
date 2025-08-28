import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export function GoogleOAuthButton() {
  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div className="space-y-6">
      <Button className="w-full" onClick={handleClick}>
        Continue with Google
      </Button>
    </div>
  );
}
