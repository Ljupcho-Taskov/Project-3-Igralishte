import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UpdateLoginStatus } from "../types/types";

const LogInAndOut = () => {
  let isLoggedIn = false;
  if (typeof window !== "undefined") {
    const registrationData = JSON.parse(
      localStorage.getItem("registrationData") || "{}"
    );
    isLoggedIn = registrationData.isLoggedIn;
  }
  return (
    <>
      {isLoggedIn ? (
        <>
          <Link href="/myProfile">Мој Профил</Link>
          <span style={{ fontSize: "22px" }} className="mx-1">
            /
          </span>
          <Link href="/login">
            <span onClick={UpdateLoginStatus}>Одјави се</span>
          </Link>
        </>
      ) : (
        <>
          <Link href="/register">Регистрирај се</Link>
          <span className="mx-1">/</span>
          <Link href="/login">Логирај се</Link>
        </>
      )}
    </>
  );
};

export default LogInAndOut;
