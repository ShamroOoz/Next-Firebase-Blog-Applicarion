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
  const { signInWithGoogle } = useAuth();
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google.png"} /> Sign in with Google
    </button>
  );
}

function UsernameForm() {
  return null;
}
