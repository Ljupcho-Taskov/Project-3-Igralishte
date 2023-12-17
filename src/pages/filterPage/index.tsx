import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import { ProductsType } from "../../types/types";
import { GetServerSideProps, NextPage } from "next";

import Head from "next/head";

interface ProductsPageProps {
  data: ProductsType[];
  noResultsProducts: boolean;
}

const FilterPage: NextPage<ProductsPageProps> = ({ data }) => {
  const getColorSquareClassName = (color: string): string => {
    const colorMap: Record<string, string> = {
      red: "color-square-red",
      blue: "color-square-blue",
      green: "color-square-green",
      orange: "color-square-orange",
      yellow: "color-square-yellow",
      purple: "color-square-purple",
      black: "color-square-black",
      white: "color-square-white",
      grey: "color-square-grey",
      pink: "color-square-pink",
    };

    return colorMap[color] || "";
  };
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { category, brand, color, size, price, accessories } = router.query;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [filterCounts, setFilterCounts] = useState<Record<string, number>>({});

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/product",
      query: {
        category: inputValue,
      },
    });
  };

  useEffect(() => {
    const getArrayFromQuery = (
      value: string | string[] | undefined
    ): string[] => {
      if (Array.isArray(value)) {
        return value.filter(Boolean) as string[];
      } else if (value) {
        return [value];
      }
      return [];
    };

    setSelectedCategories(getArrayFromQuery(category));
    setSelectedBrands(getArrayFromQuery(brand));
    setSelectedColors(getArrayFromQuery(color));
    setSelectedSizes(getArrayFromQuery(size));
    setSelectedPrices(getArrayFromQuery(price));
    setSelectedAccessories(getArrayFromQuery(accessories));
  }, [category, brand, color, size, price, accessories]);

  const handleCheckboxChange = (type: string, value: string) => {
    const setFunction =
      type === "brand"
        ? setSelectedBrands
        : type === "category"
        ? setSelectedCategories
        : type === "color"
        ? setSelectedColors
        : type === "size"
        ? setSelectedSizes
        : type === "price"
        ? setSelectedPrices
        : type === "accessories"
        ? setSelectedAccessories
        : null;

    if (setFunction) {
      setFunction((prevSelected) => {
        const updatedSelection = prevSelected.includes(value)
          ? prevSelected.filter((selected) => selected !== value)
          : [...prevSelected, value];

        return updatedSelection;
      });
    }
  };

  const handleFilterButtonClick = () => {
    const filtered = data.filter((product) => {
      const productPrice = product.price;

      return (
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 ||
          selectedBrands.includes(product.brand)) &&
        (selectedColors.length === 0 ||
          selectedColors.includes(product.color)) &&
        (selectedSizes.length === 0 || selectedSizes.includes(product.size)) &&
        (selectedAccessories.length === 0 ||
          selectedAccessories.includes(product.accessories)) &&
        (selectedPrices.length === 0 || selectedPrices.includes(product.price))
      );
    });

    router.push({
      pathname: "/product",
      query: {
        category: selectedCategories,
        brand: selectedBrands,
        color: selectedColors,
        size: selectedSizes,
        price: selectedPrices,
        accessories: selectedAccessories,
      },
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const counts: Record<string, number> = {};

    data.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
      counts[product.brand] = (counts[product.brand] || 0) + 1;

      counts[product.accessories] = (counts[product.accessories] || 0) + 1;
    });

    setFilterCounts(counts);
  }, [data]);

  const getCountForFilter = (filterValue: string): number => {
    return filterCounts[filterValue] || 0;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const clearInput = () => {
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleCancelClick = () => {
    router.back();
  };
  return (
    <>
      <Head>
        <title>Igralishte</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container">
        <div className="d-flex align-items-center py-3">
          <form
            onSubmit={handleOnSubmit}
            className="w-100"
            style={{ position: "relative" }}
          >
            <input
              className="search-page-input"
              type="text"
              placeholder="Search..."
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
            />
            {inputValue ? (
              <div
                className="x-search"
                onClick={clearInput}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1059_1431)">
                    <path
                      d="M16.6543 16.7685C16.5567 16.8643 16.425 16.9173 16.2882 16.9159C16.1515 16.9146 16.0209 16.8589 15.9252 16.7613L10.9922 11.729L5.95987 16.662C5.86222 16.7577 5.73053 16.8107 5.59378 16.8093C5.45704 16.808 5.32643 16.7523 5.2307 16.6547C5.13497 16.557 5.08196 16.4253 5.08332 16.2886C5.08468 16.1519 5.14031 16.0213 5.23797 15.9255L10.2703 10.9925L5.33728 5.96023C5.24155 5.86257 5.18853 5.73089 5.1899 5.59414C5.19126 5.4574 5.24689 5.32679 5.34455 5.23106C5.4422 5.13533 5.57389 5.08232 5.71064 5.08368C5.84738 5.08505 5.97798 5.14067 6.07371 5.23833L11.0067 10.2706L16.039 5.33764C16.1367 5.24191 16.2683 5.1889 16.4051 5.19026C16.5418 5.19162 16.6724 5.24725 16.7682 5.34491C16.8639 5.44256 16.9169 5.57425 16.9156 5.711C16.9142 5.84774 16.8586 5.97834 16.7609 6.07407L11.7286 11.0071L16.6616 16.0394C16.7573 16.137 16.8103 16.2687 16.809 16.4055C16.8076 16.5422 16.752 16.6728 16.6543 16.7685Z"
                      fill="#232221"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1059_1431">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            ) : (
              <div className="search-icon-modal"></div>
            )}
          </form>
        </div>
      </div>
      <div className="container d-flex flex-column h-100 justify-content-between">
        {filteredProducts.length === 0 && (
          <div className="row">
            <div className="col-12">
              <h4 className="headersH4 categoryHr">
                Категорија
                <hr className="line-hr mb-3" />
              </h4>

              {Array.from(new Set(data.map((product) => product.category))).map(
                (category, index) => (
                  <label
                    htmlFor={`category-${index}`}
                    className="d-flex align-items-center"
                    key={index}
                  >
                    <input
                      id={`category-${index}`}
                      className="input-check"
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() =>
                        handleCheckboxChange("category", category)
                      }
                    />
                    {category}({getCountForFilter(category)})
                  </label>
                )
              )}

              <h4 className="headersH4 brandsHr">
                Брендови
                <hr className="line-hr mb-3 " />
              </h4>

              {Array.from(new Set(data.map((product) => product.brand))).map(
                (brand, index) => (
                  <label
                    htmlFor={`brand-${index}`}
                    className="d-flex align-items-center"
                    key={index}
                  >
                    <input
                      id={`brand-${index}`}
                      className="input-check"
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleCheckboxChange("brand", brand)}
                    />
                    {brand}({getCountForFilter(brand)})
                  </label>
                )
              )}
              <h4 className="headersH4 accessosiesHr">
                Аксесоари
                <span className="line-hr mb-3" />
              </h4>

              {Array.from(
                new Set(data.map((product) => product.accessories))
              ).map((accessories, index) => (
                <label
                  htmlFor={`accessories-${index}`}
                  className="d-flex align-items-center"
                  key={index}
                >
                  <input
                    id={`accessories-${index}`}
                    className="input-check"
                    type="checkbox"
                    checked={selectedAccessories.includes(accessories)}
                    onChange={() =>
                      handleCheckboxChange("accessories", accessories)
                    }
                  />
                  {accessories}({getCountForFilter(accessories)})
                </label>
              ))}
              <h4 className="headersH4 sizesHr">
                Величина
                <hr className="line-hr mb-3" />
              </h4>

              {Array.from(new Set(data.map((product) => product.size))).map(
                (size, index) => (
                  <label
                    htmlFor={`size-${index}`}
                    className="d-flex align-items-center"
                    key={index}
                  >
                    <input
                      id={`size-${index}`}
                      className="input-check"
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleCheckboxChange("size", size)}
                    />
                    {size}
                  </label>
                )
              )}
              <h4 className="headersH4 colorsHr">
                Боја
                <hr className="line-hr mb-3" />
              </h4>

              <div className="row">
                <div className="col-6 d-flex flex-wrap ">
                  {Array.from(
                    new Set(data.map((product) => product.color))
                  ).map((color, index) => (
                    <div
                      className="mr-1 p-1"
                      style={{ position: "relative" }}
                      key={index}
                    >
                      <input
                        id={`color${index}`}
                        className="input-check"
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => handleCheckboxChange("color", color)}
                      />
                      <span
                        className={`color-square ${getColorSquareClassName(
                          color
                        )}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <h4 className="headersH4 pricesHr">
                Prices
                <hr className="line-hr mb-3" />
              </h4>

              <label htmlFor="price1">
                <input
                  id="price1"
                  type="checkbox"
                  checked={selectedPrices.includes("500-1000")}
                  onChange={() => handleCheckboxChange("price", "500-1000")}
                />
                500 - 1000 den
              </label>
              <label htmlFor="price2">
                <input
                  id="price2"
                  type="checkbox"
                  checked={selectedPrices.includes("1500-2000")}
                  onChange={() => handleCheckboxChange("price", "1500-2000")}
                />
                1500 - 2000 den
              </label>
              <label htmlFor="price3">
                <input
                  id="price3"
                  type="checkbox"
                  checked={selectedPrices.includes("2000-2500")}
                  onChange={() => handleCheckboxChange("price", "2000-2500")}
                />
                2000 - 2500 den
              </label>
              <label htmlFor="price4">
                <input
                  id="price4"
                  type="checkbox"
                  checked={selectedPrices.includes("above-2500")}
                  onChange={() => handleCheckboxChange("price", "above-2500")}
                />
                above 2500den
              </label>

              <div className="d-flex flex-column align-items-center filtering-div">
                <button
                  className="filtering-button"
                  onClick={handleFilterButtonClick}
                >
                  Filter
                </button>
                <button className="decline-button" onClick={handleCancelClick}>
                  откажи
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ height: "130px" }}></div>
    </>
  );
};

export default FilterPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res: Response;
  let data: ProductsType[];
  let noResultsProducts = false;

  const queryParams = Object.entries(query)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      } else {
        return `${key}=${value}`;
      }
    })
    .join("&");

  if (queryParams) {
    res = await fetch(`http://localhost:5001/products?${queryParams}`);
  } else {
    res = await fetch("http://localhost:5001/products");
  }

  data = await res.json();

  return {
    props: { data, noResultsProducts },
  };
};
