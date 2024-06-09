import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNavbarFooter = router.pathname !== '/login' && router.pathname !== '/register' && router.pathname!=='/forgotPassword';

  return <>
 {showNavbarFooter && <Navbar />}
      <Component {...pageProps} />
      {showNavbarFooter && <Footer />}
  </> 
}
