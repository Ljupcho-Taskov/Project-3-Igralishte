import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import { useRouter } from "next/router";
import { AccessoryType, ProductsType } from "../types/types";

interface DropdownStates {
  vintage: boolean;
  brands: boolean;
  accessories: boolean;
}

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [brands, setBrands] = useState<ProductsType[]>([]);
  const [accessories, setAccessories] = useState<AccessoryType[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    vintage: false,
    brands: false,
    accessories: false,
  });
  const [clickedCategory, setClickedCategory] = useState<string | null>(null);
  const [clickedBrand, setClickedBrand] = useState<string>();
  const [clickedAccessory, setClickedAccessory] = useState<string>();
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [brandCategories, setBrandCategories] = useState<string[]>([]);
  const [accessoriesCategories, setAccessoriesCategories] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      return window.localStorage.getItem("registrationData");
    };

    if (typeof window !== "undefined") {
      setUser(getUserFromLocalStorage());
    }
  }, []);

  useEffect(() => {
    fetch("https://backend-igralishte.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const categories: string[] = Array.from(
          new Set(data.map((product: ProductsType) => product.category))
        );
        setProductCategories(categories);
        setLoading(false);
      });

    fetch("https://backend-igralishte.onrender.com/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
        const categories: string[] = Array.from(
          new Set(data.map((brand: ProductsType) => brand.category))
        );
        setBrandCategories(categories);
        setLoading(false);
      });

    fetch("https://backend-igralishte.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAccessories(data);
        const accessories: string[] = Array.from(
          new Set(
            data.map((accessories: AccessoryType) => accessories.accessories)
          )
        );
        setAccessoriesCategories(accessories);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const categoryFromQuery = router.query.category as string;
    setClickedCategory(categoryFromQuery || "Види ги сите");
  }, [router.query.category]);
  useEffect(() => {
    const brandCategoryFromQuery = router.query.category as string;
    setClickedBrand(brandCategoryFromQuery);
  }, [router.query.category]);
  useEffect(() => {
    const accessoryCategoryFromQuery = router.query.accessories as string;
    setClickedAccessory(accessoryCategoryFromQuery);
  }, [router.query.accessories]);

  const productCategory: string[] = [];
  const brandCategory: string[] = [];
  const accessoryCategory: string[] = [];

  brands.forEach((brand) => {
    if (!brandCategory.includes(brand.category)) {
      brandCategory.push(brand.category);
    }
  });

  products.forEach((product) => {
    if (!productCategory.includes(product.category)) {
      productCategory.push(product.category);
    }
  });
  accessories.forEach((accessory) => {
    if (!accessoryCategory.includes(accessory.accessories)) {
      accessoryCategory.push(accessory.accessories);
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmitProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/products",
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

  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen);
    setIsSearchModalOpen(false);
  };
  const handleClickedCategory = (category: string) => {
    setClickedCategory(category);
    router.push({
      pathname: "/product",
      query: { category: category },
    });
  };
  const handleClickedBrand = (brand: string) => {
    setClickedBrand(brand);
    router.push({
      pathname: "/brands",
      query: { category: brand },
    });
  };
  const handleClickedAccessory = (accessory: string) => {
    setClickedAccessory(accessory);
    router.push({
      pathname: "/product",
      query: { accessories: accessory },
    });
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
                <div className="pointer" onClick={handleModalClick}>
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                </div>
              ) : (
                <div className="pointer" onClick={handleModalClick}>
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
                      onClick={() => {
                        router.push({ pathname: "/product" }),
                          setIsModalOpen(false);
                      }}
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
                        <li
                          onClick={() => {
                            handleModalClick();
                          }}
                        >
                          <div
                            onClick={() => {
                              router.push("/product");
                            }}
                            className="d-flex align-items-center"
                          >
                            {clickedCategory === "Види ги сите" ? (
                              <img
                                className="sparksSmallAll"
                                src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                alt=""
                              />
                            ) : null}
                            <span
                              className={
                                clickedCategory === "Види ги сите"
                                  ? "li-olive"
                                  : ""
                              }
                            >
                              Види ги сите
                            </span>
                          </div>
                        </li>
                        {loading ? (
                          <div>Loading Data</div>
                        ) : (
                          productCategory.map((category, index) => (
                            <li
                              onClick={() => {
                                handleClickedCategory(category);
                                handleModalClick();
                              }}
                              key={index}
                            >
                              <div className="d-flex align-items-center">
                                {clickedCategory === category && (
                                  <img
                                    className="sparksSmallAll"
                                    src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                    alt=""
                                  />
                                )}
                                <span
                                  className={
                                    clickedCategory === category
                                      ? "li-olive"
                                      : ""
                                  }
                                >
                                  {category}
                                </span>
                              </div>
                            </li>
                          ))
                        )}
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
                        {loading ? (
                          <div>Loading Data</div>
                        ) : (
                          brandCategory.map((brand, index) => (
                            <li
                              onClick={() => {
                                handleClickedBrand(brand);
                                handleModalClick();
                              }}
                              key={index}
                            >
                              <div className="d-flex align-items-center">
                                {clickedBrand === brand && (
                                  <img
                                    className="sparksSmallAll"
                                    src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                    alt=""
                                  />
                                )}
                                <span
                                  className={
                                    clickedBrand === brand ? "li-olive" : ""
                                  }
                                >
                                  {brand}
                                </span>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    </li>

                    <li onClick={() => handleDropDown("accessories")}>
                      <div className="d-flex justify-content-between">
                        <span>Aксесоари</span>
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
                        {loading ? (
                          <div>Loading Data</div>
                        ) : (
                          accessoryCategory.map((accessory, index) => {
                            if (!accessory) {
                              return null;
                            }
                            return (
                              <li
                                onClick={() => {
                                  handleClickedAccessory(accessory);
                                  handleModalClick();
                                }}
                                key={index}
                              >
                                <div className="d-flex align-items-center">
                                  {clickedAccessory === accessory && (
                                    <img
                                      className="sparksSmallAll"
                                      src="../../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                                      alt=""
                                    />
                                  )}
                                  <span
                                    className={
                                      clickedAccessory === accessory
                                        ? "li-olive"
                                        : ""
                                    }
                                  >
                                    {accessory}
                                  </span>
                                </div>
                              </li>
                            );
                          })
                        )}
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
