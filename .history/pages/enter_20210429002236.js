import { useAuth } from "@/context/AuthContext";
import UsernameForm from "@/components/UsernameForm";
import Metatags from "@/components/Metatags";

export default function enter() {
  const { user, username, signOut } = useAuth();
  return (
    <main>
      <Metatags title="Enter" description="Sign up for this amazing app!" />
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
