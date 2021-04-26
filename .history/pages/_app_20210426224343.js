import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { ProvideAuth } from "@/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </ProvideAuth>
  );
}

export default MyApp;
