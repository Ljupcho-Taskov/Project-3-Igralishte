import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AnnouncementBar from "../AnnouncementBar";
import router from "next/router";

interface DropdownStates {
  vintage: boolean;
  brands: boolean;
  accessories: boolean;
}

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    vintage: false,
    brands: false,
    accessories: false,
  });
  const [user, setUser] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("registrationData")
      : null
  );
  useEffect(() => {
    const item = localStorage.getItem("registrationData");
    setUser(item);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmitProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/product",
      query: {
        category: inputRef?.current?.value,
      },
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    toggleSearch();
  };

  const toggleSearch = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }

    return () => {
      document.body.style.overflowY = "visible";
    };
  }, [isModalOpen]);

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
    setIsSearchModalOpen(false);
  };
  const handleDropDown = (dropdownKey: keyof DropdownStates) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [dropdownKey]: !prevStates[dropdownKey],
    }));
  };
  const handleSearchClick = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
    setIsModalOpen(false);
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div onClick={handleButtonClick} className="hamburger"></div>
              <Link href="/">
                <div className="logo"></div>
              </Link>
              <Link href="/search">
                <span className="search-icon"></span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <AnnouncementBar
        text={"Нова колекција"}
        textTwo={" Valentines Winter Collection 2023"}
      />
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="container h-100 w-90 py-3 d-flex flex-column justify-content-between">
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="p-0">
                    <li
                      style={{
                        fontWeight: "700",
                        textDecoration: "underline",
                        fontStyle: "italic",
                      }}
                    >
                      Ново
                    </li>
                    <li onClick={() => handleDropDown("vintage")}>
                      <div className="d-flex justify-content-between">
                        <span>Vintage облека</span>
                        <span>
                          <i
                            className={
                              dropdownStates.vintage
                                ? "fa-solid fa-angle-up"
                                : "fa-solid fa-angle-down"
                            }
                          ></i>
                        </span>
                      </div>
                      <ul
                        className={
                          dropdownStates.vintage ? "d-block" : "d-none"
                        }
                      >
                        <img
                          className="sparksSmallAll"
                          src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                          alt=""
                        />
                        <li onClick={handleButtonClick}>
                          <Link href={"/product"}>
                            <span className="li-olive">Види ги сите</span>
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Bluzi"}>Блузи</Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Pantaloni"}>
                            Панталони
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Zdolnishta"}>
                            Здолништа /
                          </Link>
                          <span>
                            <Link href={"/product?category=Shorcevi"}>
                              шорцеви
                            </Link>
                          </span>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Fustani"}>
                            Фустани
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Palta i jakni"}>
                            Палта и јакни
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Dolna obleka"}>
                            Долна облека
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li onClick={() => handleDropDown("brands")}>
                      <div className="d-flex justify-content-between">
                        <span>Брендови</span>
                        <i
                          className={
                            dropdownStates.brands
                              ? "fa-solid fa-angle-up"
                              : "fa-solid fa-angle-down"
                          }
                        ></i>
                      </div>
                      <ul
                        className={dropdownStates.brands ? "d-block" : "d-none"}
                      >
                        <img
                          className="sparksSmallAllBrands"
                          src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                          alt=""
                        />
                        <Link href="/brands">
                          <li onClick={handleButtonClick}>
                            <img src="" alt="" />
                            <span className="li-olive">Види ги сите</span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Pinc Partywear&brand=Stranski Brendovi">
                          <li onClick={handleButtonClick}>Pinc Partywear</li>
                        </Link>
                        <Link href="/brands?category=Factory Girl&brand=Stranski Brendovi">
                          <li onClick={handleButtonClick}>Factory Girl</li>
                        </Link>
                        <Link href="/brands?category=Main Days&brand=Stranski Brendovi">
                          <li onClick={handleButtonClick}>Main Days</li>
                        </Link>
                        <Link href="/brands?category=Nezno&brand=Localni brendovi">
                          <li onClick={handleButtonClick}>Нежно</li>
                        </Link>
                        <Link href="/brands?category=Red&brand=Localni brendovi">
                          <li onClick={handleButtonClick}>Ред</li>
                        </Link>
                        <Link href="/brands?category=Nash&brand=Localni brendovi">
                          <li onClick={handleButtonClick}>Наш</li>
                        </Link>
                        <Link href="/brands?category=Zsh da ne&brand=Localni brendovi">
                          <li onClick={handleButtonClick}>Зш да не</li>
                        </Link>
                        <Link href="/brands?category=Fraeil&brand=Stranski Brendovi">
                          <li onClick={handleButtonClick}>Fraeil</li>
                        </Link>
                        <Link href="/brands?category=Urma&brand=Stranski Brendovi">
                          <li onClick={handleButtonClick}>Urma</li>
                        </Link>
                        <Link href="/brands?category=Candle Nest&brand=Stranski Brendovi">
                          <li onClick={handleButtonClick}>Candle nest</li>
                        </Link>
                        <Link href="/brands?category=Beyond Green&brand=Stranski Brendovi">
                          <li onClick={handleButtonClick}>Beyond green</li>
                        </Link>
                        <Link href="/brands?category=Gatta&brand=Stranski Brendovi">
                          <li onClick={handleButtonClick}>Gatta</li>
                        </Link>
                      </ul>
                    </li>
                    <li onClick={() => handleDropDown("accessories")}>
                      <div className="d-flex justify-content-between">
                        <span>Аксесоари </span>
                        <i
                          className={
                            dropdownStates.accessories
                              ? "fa-solid fa-angle-up"
                              : "fa-solid fa-angle-down"
                          }
                        ></i>
                      </div>
                      <ul
                        className={
                          dropdownStates.accessories ? "d-block" : "d-none"
                        }
                      >
                        <li>Види ги сите</li>
                        <li>Ташни</li>
                        <li>Накит</li>
                      </ul>
                    </li>
                    <li>Lifestyle</li>

                    <Link href="/giftCard">
                      <li>Подари картичка*</li>
                    </Link>

                    <li
                      style={{
                        fontWeight: "700",
                        fontStyle: "italic",
                        color: "#FF5B29",
                      }}
                    >
                      Попуст
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <ul className="p-0">
                    <li className="d-flex align-items-center">
                      <div className="cart mr-1">
                        <img src="/logo/cart.png" alt="" />
                      </div>

                      <Link href="/order">Кошничка</Link>
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="heart mr-1">
                        <img src="/logo/ph_heart-straight-thin.png" alt="" />
                      </div>

                      <Link href="/order?favorites=true">Омилени</Link>
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="ph-user mr-1">
                        <img src="/logo/ph_user-light.png" alt="" />
                      </div>
                      <Link href="/register">Регистрирај се </Link>

                      {!user ? (
                        <Link href="/login">/ Логирај се</Link>
                      ) : (
                        <Link href="/login">/ Одјави се</Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSearchModalOpen && (
        <div className="search-modal-overlay py-3">
          <div className="container">
            <div className="d-flex align-items-center">
              <div
                onClick={handleSearchClick}
                className="arrow-sliders prev"
              ></div>
              <form
                onSubmit={handleOnSubmitProduct}
                className="w-100"
                style={{ position: "relative" }}
              >
                <input type="text" placeholder="Search..." ref={inputRef} />
                <div className="search-icon-modal"></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
