import { useAuth } from "@/context/AuthContext";

export default function enter() {
  const { user, username, signOut } = useAuth();
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <button onClick={signOut}>Sign Out</button>
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const { signInWithGoogle, username } = useAuth();
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google.png"} /> Sign in with Google
    </button>
  );
}

import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

function UsernameForm() {
  const { username } = useAuth();
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventdefault();
    console.log("data gathered");
  };
  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}
