import type { GetServerSideProps, NextPage } from "next";
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

export const getServerSideProps: GetServerSideProps = async () => {
  const resProducts = await fetch(
    "https://adventurous-jade-duck.cyclic.app/products/"
  );
  const dataProducts: ProductsType[] = await resProducts.json();
  const resBrands = await fetch(
    "https://adventurous-jade-duck.cyclic.app/brands"
  );
  const dataBrands: BrandType[] = await resBrands.json();
  const resAccessories = await fetch(
    "https://adventurous-jade-duck.cyclic.app/accessories"
  );
  const dataAccessories: AccessoriesType[] = await resAccessories.json();
  const resColors = await fetch(
    "https://adventurous-jade-duck.cyclic.app/colors"
  );
  const dataColors: ColorsType[] = await resColors.json();

  return {
    props: { dataProducts, dataBrands, dataAccessories, dataColors },
  };
};
