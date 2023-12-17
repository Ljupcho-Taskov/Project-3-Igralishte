import { GetStaticProps, NextPage } from "next";
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FaqType } from "../../types/types";
import Head from "next/head";

interface Props {
  data: FaqType[];
}

const FAQ: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Igralishte</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="faq-section">
        <Header />
        <div className="container">
          <div className="row mb-3 pt-3">
            <div className="col-12">
              <p>
                <span className="mr-1">Почетна</span>

                <i className="fa-solid fa-angle-right"></i>

                <span className="ml-1">Често поставувани прашања</span>
              </p>
            </div>
          </div>
          <div className="row py-4">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <h2 className="faq-header">FAQ</h2>
              <div className="faq-sparks"></div>
            </div>
          </div>
          <div
            style={{ borderRadius: "4px", border: "1px solid gray" }}
            className="row"
          >
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`col-12 p-4 ${
                  index % 2 === 1 ? "pink-background" : ""
                }`}
              >
                <p className="text-olive p-2">{item.title}</p>
                <p className="text-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default FAQ;

export const getStaticProps: GetStaticProps = async () => {
  const dataRes = await fetch("http://localhost:5001/faq");
  const data: FaqType[] = await dataRes.json();

  return {
    props: {
      data,
    },
  };
};
