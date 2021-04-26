import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Compxonent {...pageProps} />
    </>
  );
}

export default MyApp;
