import React, { useState } from "react";
import FinalRegistrationForm from "./FinalRegistrationForm";
import { ProductsType } from "../types/types";
import { GetServerSideProps } from "next";

interface Props {
  data: ProductsType[];
}

const RegistrationForm: React.FC<Props> = ({ data }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showFinalRegistrationForm, setShowFinalRegistrationForm] =
    useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setPasswordsMatch(false);
      return;
    }

    localStorage.setItem(
      "registrationData",
      JSON.stringify({ name, surname, email, password, repeatPassword })
    );

    setShowFinalRegistrationForm(true);
  };
  if (showFinalRegistrationForm) {
    return <FinalRegistrationForm data={data} />;
  }
  return (
    <section className="registration-section registration-bg-pink">
      <div className="container py-3">
        <div className="row">
          <div className="col py-5">
            <div className="logo-image"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center">
            <form className="d-flex flex-column mb-3" onSubmit={handleSubmit}>
              <label htmlFor="name">Име</label>
              <input
                className="mb-3"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
              />

              <label htmlFor="surname">Презиме</label>
              <input
                className="mb-3"
                type="text"
                id="surname"
                name="surname"
                value={surname}
                onChange={handleSurnameChange}
              />

              <label htmlFor="email">Емаил адреса</label>
              <input
                className="mb-3"
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
                value={email}
                onChange={handleEmailChange}
              />

              <label htmlFor="password">Лозинка</label>
              <input
                className="mb-3"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />

              <label htmlFor="repeatPassword">Повтори лозинка</label>
              <input
                className="mb-3"
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                required
              />

              {!passwordsMatch && (
                <p className="error-message">Лозинките не се совпаѓаат.</p>
              )}

              <p className="d-flex mb-5">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_512_5828)">
                      <path
                        d="M6.66602 10.417L9.16602 12.917L13.3327 7.91699"
                        stroke="#413535"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.99935 18.3337C14.6017 18.3337 18.3327 14.6027 18.3327 10.0003C18.3327 5.39795 14.6017 1.66699 9.99935 1.66699C5.39698 1.66699 1.66602 5.39795 1.66602 10.0003C1.66602 14.6027 5.39698 18.3337 9.99935 18.3337Z"
                        stroke="#413535"
                        strokeWidth="1.66667"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_512_5828">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <small>
                  Испраќај ми известувања за нови зделки и промоции.
                </small>
              </p>

              <button type="submit">Регистрирај се</button>
            </form>
            <p className="registration-terms">
              Со вашата регистрација, се согласувате со
              <span>
                <a href=""> Правилата и Условите </a>
              </span>
              за кориснички сајтови.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5001/products/?_limit=3");
  const data: ProductsType[] = await res.json();

  return {
    props: { data },
  };
};
