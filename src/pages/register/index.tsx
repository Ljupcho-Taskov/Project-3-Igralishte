import { useEffect, useState } from "react";
import { NextPage } from "next";
import React from "react";
import Registration from "../../components/Registration";
import RegistrationForm from "../../components/RegistrationForm";
import Head from "next/head";

const Register: NextPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    const registrationData = localStorage.getItem("registrationData");
    if (registrationData) {
      setShowRegistrationForm(true);
    }
  }, []);

  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  return (
    <>
      <Head>
        <title>Igralishte</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!showRegistrationForm ? (
        <Registration onShowRegistrationForm={handleShowRegistrationForm} />
      ) : (
        <RegistrationForm />
      )}
    </>
  );
};

export default Register;
