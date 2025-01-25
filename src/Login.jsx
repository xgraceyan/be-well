import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export default function Login({ onSessionChange }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (onSessionChange) onSessionChange(session);
    });

    // Listen for auth state changes
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <div>Logged in!</div>
      )}
    </>
  );
}
