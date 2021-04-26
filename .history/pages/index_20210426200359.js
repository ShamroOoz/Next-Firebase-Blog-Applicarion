import Loader from "@/components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <div>Next firebase Blog</div>
      <Loader show />
      <button onClick={toast}>Make me a toast</button>
    </main>
  );
}
