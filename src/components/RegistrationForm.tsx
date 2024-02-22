import React, { useState } from "react";
import FinalRegistrationForm from "./FinalRegistrationForm";

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showFinalRegistrationForm, setShowFinalRegistrationForm] =
    useState(false);

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "showPassword":
        setShowPassword(!showPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

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

  const validatePassword = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    let errorMessage = "";

    if (password.length < minLength || !hasUpperCase || !hasNumber) {
      errorMessage =
        "Password must be at least 8 characters, must contain at least one uppercase letter and must contain at least one number";
    }

    setPasswordError(errorMessage);
    return !errorMessage;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setPasswordsMatch(false);
      return;
    }

    if (!validatePassword()) {
      return;
    }

    const newUser = {
      name,
      surname,
      email,
      password,
      adress: "",
      phone: "",
      biography: "",
    };

    localStorage.setItem("registrationData", JSON.stringify(newUser));

    setShowFinalRegistrationForm(true);
  };

  if (showFinalRegistrationForm) {
    return <FinalRegistrationForm />;
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
              <div className="password-input-container">
                <input
                  className="mb-3"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}
                <span
                  className="password-toggle-icon"
                  onClick={() => togglePasswordVisibility("showPassword")}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
                </span>
              </div>

              <label htmlFor="repeatPassword">Повтори лозинка</label>
              <div className="password-input-container">
                <input
                  className="mb-3"
                  type={showConfirmPassword ? "text" : "password"}
                  id="repeatPassword"
                  name="repeatPassword"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  required
                />

                {!passwordsMatch && (
                  <p className="error-message">Лозинките не се совпаѓаат.</p>
                )}
                <span
                  className="password-toggle-icon"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showConfirmPassword ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
                </span>
              </div>
              <div className="d-flex mb-5"></div>

              <button className="pointer" type="submit">
                Регистрирај се
              </button>
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
