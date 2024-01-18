import { CartProvider } from "../context/CartContext";
import "../styles/bootstrap.min.css";
import "../styles/footer.css";
import "../styles/header.css";
import "../styles/main.css";
import "../styles/faq.css";
import "../styles/about.css";
import "../styles/contact.css";
import "../styles/login.css";
import "../styles/giftCard.css";
import "../styles/search.css";
import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Script
        src="https://kit.fontawesome.com/a71c664b5b.js"
        crossOrigin="anonymous"
      ></Script>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
