import "./index.scss";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
 'https://xawsywucexhrzfogqqrx.supabase.co',
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhd3N5d3VjZXhocnpmb2dxcXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxNzg1NjAsImV4cCI6MjAwNzc1NDU2MH0.Da0jmbflAzIiIK50DeQQNeJoeLpWdLnTUQFV-Xew2Wg'
);
export default function App() {
  const [session, setSession] = useState(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Auth 
            supabaseClient={supabase}
            providers={["google", "discord", "github"]}
            appearance={{
              extend: false,
              className: {
                anchor: 'supabase_anchor',
                button: 'supabase_button',
                label: 'supabase_label',
                input: 'supabase_input',
                container: 'supabase_container'
              },
            }}    
          />
          <h2 className="creator_content">Ramazan Azimli</h2>
        </div>

      </div>
    );
  } else {
    return (
      <div>
        <div>You logged in :)</div>
        <button onClick={() => supabase.auth.signOut()} className="sign_out_button">Sign out</button>
      </div>
    );
  }
}