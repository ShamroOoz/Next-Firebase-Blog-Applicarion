import Loader from "@/components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  const notify = () => toast("Here is your toast.");
  return (
    <main>
      <div>Next firebase Blog</div>
      <Loader show />
      <button onClick={notify}>Make me a toast</button>
    </main>
  );
}
