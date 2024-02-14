import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Valentines from "../components/Valentines";
import {
  AccessoriesType,
  BrandType,
  ColorsType,
  ProductsType,
} from "../types/types";
import ImageCarousel from "../components/ImageCarousel";
import Accessories from "../components/Accessories";
import GiftCard from "../components/GiftCard";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

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
          <Valentines />
          <ImageCarousel products={dataProducts} />
          <Accessories />
          <GiftCard />
          <Footer />
        </div>
      </>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const resProducts = await fetch("https://igralishte.onrender.com/products/");
  const dataProducts: ProductsType[] = await resProducts.json();

  return {
    props: { dataProducts },
  };
};
