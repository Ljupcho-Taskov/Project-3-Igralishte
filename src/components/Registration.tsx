import React from "react";
import Link from "next/link";

interface RegistrationProps {
  onShowRegistrationForm: () => void;
}

const Registration: React.FC<RegistrationProps> = ({
  onShowRegistrationForm,
}) => {
  return (
    <section className="registration-bg-pink" style={{ height: "100vh" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col py-5">
            <div className="logo-image"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center">
            <button
              className="socials-button mb-3 pointer"
              onClick={() => onShowRegistrationForm()}
            >
              <span>Регистрирај се со емаил адреса</span>
            </button>

            <p className="text-center mb-3">или</p>
            <button className="socials-button mb-3 pointer">
              <span>
                <i className="fa-solid fa-g"></i>
              </span>
              <span>Најави се преку Google</span>
            </button>
            <button className="socials-button mb-3 pointer">
              <span>
                <i className="fa-brands fa-facebook"></i>
              </span>
              <span> Најави се преку Facebook</span>
            </button>
            <p className="npr text-center">
              Немаш профил?
              <Link href="/register">Регистрирај се</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
