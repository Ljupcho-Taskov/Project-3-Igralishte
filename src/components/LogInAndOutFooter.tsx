import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { UpdateLoginStatus } from "../types/types";

const LogInAndOutFooter = () => {
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
            <span className="pointer logout" onClick={UpdateLoginStatus}>
              Одјави се
            </span>
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

export default LogInAndOutFooter;
