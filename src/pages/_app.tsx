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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
