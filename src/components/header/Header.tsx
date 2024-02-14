import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AnnouncementBar from "../AnnouncementBar";
import { useRouter } from "next/router";
import { ProductsType } from "../../types/types";

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
  const router = useRouter();
  const { category, brand } = router.query;

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      return window.localStorage.getItem("registrationData");
    };

    if (typeof window !== "undefined") {
      setUser(getUserFromLocalStorage());
    }
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
  const handleViewCart = () => {
    router.push({
      pathname: "/order",
      query: "cart=true",
    }),
      setIsModalOpen(false);
  };

  const handleViewFavorites = () => {
    router.push({
      pathname: "/order",
      query: "favorites=true",
    }),
      setIsModalOpen(false);
  };
  const handleViewDiscountedProducts = () => {
    router.push({
      pathname: "/product",
      query: { discount: true },
    });
    setIsModalOpen(false);
  };
  return (
    <>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              {isModalOpen ? (
                <div className="pointer" onClick={handleButtonClick}>
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                </div>
              ) : (
                <div className="pointer" onClick={handleButtonClick}>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              )}

              <Link href="/">
                <div className="logo pointer"></div>
              </Link>
              <Link href="/search">
                <span className="search-icon pointer"></span>
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
                      onClick={() => router.push({ pathname: "/product" })}
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
                        <li onClick={handleButtonClick}>
                          <Link href={"/product"}>
                            <div className="d-flex align-items-center">
                              {!category ? (
                                <img
                                  className="sparksSmallAll"
                                  src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                  alt=""
                                />
                              ) : null}
                              <span className={!category ? "li-olive" : ""}>
                                Види ги сите
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Bluzi"}>
                            <div className="d-flex align-items-center">
                              {category === "Bluzi" ? (
                                <img
                                  className="sparksSmallAll"
                                  src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                  alt=""
                                />
                              ) : null}
                              <span
                                className={
                                  category === "Bluzi" ? "li-olive" : ""
                                }
                              >
                                Блузи
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Pantaloni"}>
                            <div className="d-flex align-items-center">
                              {category === "Pantaloni" ? (
                                <img
                                  className="sparksSmallAll"
                                  src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                  alt=""
                                />
                              ) : null}
                              <span
                                className={
                                  category === "Pantaloni" ? "li-olive" : ""
                                }
                              >
                                Панталони
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Zdolnishta"}>
                            <div className="d-flex align-items-center">
                              {category === "Zdolnishta" ? (
                                <img
                                  className="sparksSmallAll"
                                  src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                  alt=""
                                />
                              ) : null}
                              <span
                                className={
                                  category === "Zdolnishta" ? "li-olive" : ""
                                }
                              >
                                Здолништа / Шорцеви
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Fustani"}>
                            <div className="d-flex align-items-center">
                              {category === "Fustani" ? (
                                <img
                                  className="sparksSmallAll"
                                  src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                  alt=""
                                />
                              ) : null}
                              <span
                                className={
                                  category === "Fustani" ? "li-olive" : ""
                                }
                              >
                                Фустани
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Palta i jakni"}>
                            <div className="d-flex align-items-center">
                              {category === "Palta i jakni" ? (
                                <img
                                  className="sparksSmallAll"
                                  src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                  alt=""
                                />
                              ) : null}
                              <span
                                className={
                                  category === "Palta i jakni" ? "li-olive" : ""
                                }
                              >
                                Палта и јакни
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li onClick={handleButtonClick}>
                          <Link href={"/product?category=Dolna obleka"}>
                            <div className="d-flex align-items-center">
                              {category === "Dolna obleka" ? (
                                <img
                                  className="sparksSmallAll"
                                  src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                  alt=""
                                />
                              ) : null}
                              <span
                                className={
                                  category === "Dolna obleka" ? "li-olive" : ""
                                }
                              >
                                Долна облека
                              </span>
                            </div>
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
                        <Link href="/brands">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {!category && !brand ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={!category && !brand ? "li-olive" : ""}
                            >
                              Види ги сите
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Pinc Partywear&brand=Stranski Brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Pinc Partywear" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={
                                category === "Pinc Partywear" ? "li-olive" : ""
                              }
                            >
                              Pinc Partywear
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Factory Girl&brand=Stranski Brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Factory Girl" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={
                                category === "Factory Girl" ? "li-olive" : ""
                              }
                            >
                              Factory Girl
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Main Days&brand=Stranski Brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Main Days" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={
                                category === "Main Days" ? "li-olive" : ""
                              }
                            >
                              Main Days
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Nezno&brand=Localni brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Nezno" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={category === "Nezno" ? "li-olive" : ""}
                            >
                              Нежно
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Red&brand=Localni brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Red" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={category === "Red" ? "li-olive" : ""}
                            >
                              Ред
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Nash&brand=Localni brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Nash" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={category === "Nash" ? "li-olive" : ""}
                            >
                              Наш
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Zsh da ne&brand=Localni brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Zsh da ne" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={
                                category === "Zsh da ne" ? "li-olive" : ""
                              }
                            >
                              Зш да не
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Fraeil&brand=Stranski Brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Fraeil" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={
                                category === "Fraeil" ? "li-olive" : ""
                              }
                            >
                              Fraeil
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Urma&brand=Stranski Brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Urma" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={category === "Urma" ? "li-olive" : ""}
                            >
                              Urma
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Candle Nest&brand=Stranski Brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Candle nest" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={
                                category === "Candle nest" ? "li-olive" : ""
                              }
                            >
                              Candle nest
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Beyond Green&brand=Stranski Brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Beyond green" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={
                                category === "Beyond green" ? "li-olive" : ""
                              }
                            >
                              Beyond green
                            </span>
                          </li>
                        </Link>
                        <Link href="/brands?category=Gatta&brand=Stranski Brendovi">
                          <li
                            className="d-flex align-items-center"
                            onClick={handleButtonClick}
                          >
                            {category === "Gatta" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={category === "Gatta" ? "li-olive" : ""}
                            >
                              Gatta
                            </span>
                          </li>
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
                      onClick={handleViewDiscountedProducts}
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
                    <li
                      className="d-flex align-items-center"
                      onClick={handleViewCart}
                    >
                      <span className="cart mr-1">
                        <img src="/logo/cart.png" alt="" />
                      </span>

                      <span>Кошничка</span>
                    </li>
                    <li
                      className="d-flex align-items-center"
                      onClick={handleViewFavorites}
                    >
                      <span className="heart mr-1">
                        <img src="/logo/ph_heart-straight-thin.png" alt="" />
                      </span>

                      <span>Омилени</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="ph-user mr-1">
                        <img src="/logo/ph_user-light.png" alt="" />
                      </div>
                      {!user ? (
                        <Link href="/register">Регистрирај се </Link>
                      ) : (
                        <Link href="/myProfile">Мој Профил </Link>
                      )}
                      <span className="mx-1">/</span>
                      {!user ? (
                        <Link href="/login"> Логирај се</Link>
                      ) : (
                        <Link href="/login"> Одјави се</Link>
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
