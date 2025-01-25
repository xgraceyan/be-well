import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error('Error during sign-up:', error);
    } else {
      console.log('Sign-up successful:', data);
    }
  }  

async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'valid.email@supabase.io',
      password: 'example-password',
    })
  }
  

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<div>Logged in!</div>)
  }
}