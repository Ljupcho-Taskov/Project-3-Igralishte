import { NextPage } from "next";
import React, { useState } from "react";

import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import OurStory from "../../components/OurStory";
import OurWork from "../../components/OurWork";
import Head from "next/head";
import router from "next/router";

const About: NextPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("ourStory");

  const handleButtonClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <Head>
        <title>Igralishte</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="about-us-section">
        <Header />
        <div className="container py-3 about">
          <div className="row mb-3">
            <div className="col-12">
              <p>
                <span
                  onClick={() => {
                    router.push({
                      pathname: "/",
                    });
                  }}
                  className="mr-1 pointer"
                >
                  Почетна
                </span>

                <i className="fa-solid fa-angle-right"></i>

                <span className="ml-1">За Нас</span>
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col d-flex align-items-center justify-content-center">
              <img
                className="us-image"
                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                alt=""
              />
              <h2 className="us">За Нас</h2>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col">
              <div className="rounded-corners">
                <button
                  style={{ borderRight: "1px solid black" }}
                  onClick={() => handleButtonClick("ourStory")}
                >
                  Нашата приказна
                </button>
                <button onClick={() => handleButtonClick("ourWork")}>
                  Нашата работа
                </button>
              </div>
            </div>
          </div>
          {selectedComponent === "ourStory" && <OurStory />}
          {selectedComponent === "ourWork" && <OurWork />}
        </div>

        <Footer />
      </section>
    </>
  );
};

export default About;
