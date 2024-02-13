import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ChangePasswordModal from "../../components/ChangePasswordModal";

const MyProfile = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [adress, setAdress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isSavedInfoModalOpen, setIsSaveInfoModalOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const userData = Array.isArray(parsedData) ? parsedData[0] : parsedData;
      const { name, surname, email, password, adress, phone, biography } =
        userData;
      setName(name);
      setSurname(surname);
      setEmail(email);
      setPassword(password);
      setAdress(adress);
      setPhone(phone);
      setBiography(biography);
    }
  }, []);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };
  const handleOpenSavedInfoModal = () => {
    setIsSaveInfoModalOpen(true);
  };
  const handleCloseSavedInfoModal = () => {
    setIsSaveInfoModalOpen(false);
  };
  const handleSavePasswordChanges = (
    oldPassword: string,
    newPassword: string
  ) => {
    updateLocalStorage({ password: newPassword });
    setPassword(newPassword);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
  };
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSurname(value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleAdressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAdress(value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
  };

  const handleBiographyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setBiography(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      saveImageToLocalStorage(selectedFile);
    }
    updateLocalStorage({
      name,
      surname,
      email,
      password,
      adress,
      phone,
      biography,
    });

    // setShowFinalRegistrationForm(true);
  };

  const saveImageToLocalStorage = (file: File) => {
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profileImage", reader.result as string);
        setProfileImage(reader.result as string);
        resolve();
      };
      reader.readAsDataURL(file);
    });
  };

  const updateLocalStorage = (data: {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    adress?: string;
    phone?: string;
    biography?: string;
  }) => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const updatedData = { ...parsedData, ...data };
      localStorage.setItem("registrationData", JSON.stringify(updatedData));
      console.log(updatedData);
    }
  };

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "showPassword":
        setShowPassword(!showPassword);
        break;

      default:
        break;
    }
  };
  return (
    <section className="registration-section registration-bg-pink">
      <div className="container py-3">
        <div className="row">
          <div className="col py-5">
            <Link href="/">
              <div className="logo-image pointer"></div>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <div className="circle-image d-flex justify-content-center align-items-center">
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </div>
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                className="custom-file-button"
                onClick={() => inputRef.current?.click()}
              >
                Change Image
              </button>
              <input
                className="file-input pointer"
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                }}
              />
            </div>
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
                  disabled
                />
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
              <button
                className="mb-4 pointer"
                onClick={handleOpenChangePasswordModal}
              >
                Промени лозинка
              </button>

              <label htmlFor="adress">Aдреса</label>
              <input
                className="mb-3"
                type="text"
                id="adress"
                name="adress"
                value={adress}
                onChange={handleAdressChange}
              />

              <label htmlFor="number">Телефонски број</label>
              <input
                className="mb-3"
                type="number"
                id="number"
                name="number"
                value={phone}
                onChange={handlePhoneChange}
              />

              <label htmlFor="biography">Биограгија</label>
              <textarea
                name="biography"
                id="biography"
                cols={30}
                rows={10}
                value={biography}
                onChange={handleBiographyChange}
              ></textarea>
              <div className="row mt-3 d-flex justify-content-around">
                <Link href="/">
                  <button className="text-center col-5 pointer">
                    Кон Почетна
                  </button>
                </Link>
                <Link href="/login">
                  <button className="text-center col-5 pointer">
                    Одјави се
                  </button>
                </Link>
              </div>
              <div className="text-center mt-3">
                <button className="w-100 pointer" type="submit">
                  Зачувај
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="registration-terms">
        Со вашата регистрација, се согласувате со
        <span>
          <a href=""> Правилата и Условите </a>
        </span>
        за кориснички сајтови.
      </p>
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={handleCloseChangePasswordModal}
          onSaveChanges={handleSavePasswordChanges}
        />
      )}
    </section>
  );
};

export default MyProfile;
