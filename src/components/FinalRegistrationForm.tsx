import React, { useRef, useState } from "react";
import Home from "../pages";
import { GetServerSideProps } from "next";
import { ProductsType } from "../types/types";

interface Props {
  data: ProductsType[];
}

const FinalRegistrationForm: React.FC<Props> = ({ data }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [biography, setBiography] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFinalRegistrationForm, setShowFinalRegistrationForm] =
    useState(false);

  const handleAdressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdress(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleBiographyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBiography(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem(
      "registrationData2",
      JSON.stringify({ adress, phone, biography })
    );

    setShowFinalRegistrationForm(true);
  };

  if (showFinalRegistrationForm) {
    return <Home dataProducts={data} />;
  }

  return (
    <section className="registration-section registration-bg-pink">
      <div className="container py-5">
        <div className="row">
          <div className="col py-5">
            <div className="logo-image"></div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <div className="circle-image d-flex justify-content-center align-items-center">
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </div>

            <div
              style={{
                position: "relative",
                overflow: "hidden",
                display: "inline-block",
              }}
            >
              <button
                type="button"
                className="custom-file-button"
                onClick={() => inputRef.current?.click()}
              >
                Одбери слика
              </button>
              <input
                className="file-input"
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
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <form className="d-flex flex-column mb-3" onSubmit={handleSubmit}>
              <label htmlFor="adress">
                Aдреса
                <input
                  className="mb-3"
                  type="text"
                  id="adress"
                  name="adress"
                  value={adress}
                  onChange={handleAdressChange}
                />
              </label>

              <label htmlFor="number">
                Телефонски број
                <input
                  className="mb-3"
                  type="number"
                  id="number"
                  name="number"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </label>

              <label htmlFor="biography">
                Биограгија
                <textarea
                  name="biography"
                  id="biography"
                  cols={30}
                  rows={10}
                  value={biography}
                  onChange={handleBiographyChange}
                ></textarea>
              </label>
              <button type="submit">Заврши</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalRegistrationForm;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5001/products/?_limit=3");
  const data: ProductsType[] = await res.json();

  return {
    props: { data },
  };
};
