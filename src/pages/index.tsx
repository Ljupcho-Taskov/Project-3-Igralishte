import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Valentines from "../components/Valentines";
import { ProductsType } from "../types/types";
import Accessories from "../components/Accessories";
import GiftCard from "../components/GiftCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SlickCarousel from "../components/SlickCarousel";
import Reveal from "../components/Reveal";

interface HomeProps {
  dataProducts: ProductsType[];
}

export const Home: NextPage<HomeProps> = ({ dataProducts }) => {
  return (
    <>
      <Head>
        <title>Igralishte</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Header />
        <div className="home-page">
          <Reveal>
            <Valentines />
          </Reveal>
          <SlickCarousel products={dataProducts} />
          <Reveal>
            <Accessories />
          </Reveal>
          <Reveal>
            <GiftCard />
          </Reveal>
          <Reveal>
            <Footer />
          </Reveal>
        </div>
      </>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const resProducts = await fetch(
    "https://backend-igralishte.onrender.com/products"
  );
  const dataProducts: ProductsType[] = await resProducts.json();

  return {
    props: { dataProducts },
  };
};
