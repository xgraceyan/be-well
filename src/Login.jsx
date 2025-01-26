import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { AccountStore } from './store/AccountStore';

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export default function Login({ onSessionChange }) {
  const [session, setSession] = useState(null);
  const setAccount = AccountStore((state) => state.setAccount);

  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (onSessionChange) onSessionChange(session);
    });

    // Listen for auth state changes
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      // Set Zustand account store
      if (session && session.user) {
        console.log("CLEARING ACCOUNT STORE");
        setAccount({
          account_name: session.user.user_metadata.display_name || "",
          account_email: session.user.email || "",
          account_uuid: session.user.id || "",
        });

        console.log("account_uuid stored", session.user.id);

        setPetInfo({
            pet_id: session.user.id || "",
            pet_mood: session.Pet.mood || "",
            username: session.Pet.username || "",
        });
      }

      if (onSessionChange) onSessionChange(session);
    });

    // Cleanup subscription on component unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [onSessionChange]);

  return (
    <>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
      ) : (
        <div>Logged in!</div>
      )}
    </>
  );
}
