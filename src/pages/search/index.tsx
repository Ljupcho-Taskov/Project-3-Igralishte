import type { GetServerSideProps, NextPage } from "next";
import { ProductsType } from "../../types/types";
import ProductItem from "../../components/ProductItem";
import { useEffect, useRef, useState } from "react";
import router from "next/router";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import Head from "next/head";

interface SearchPageProps {
  dataProduct: ProductsType[];
  brandData: ProductsType[];
  noResultsProducts: boolean;
}

const SearchPage: NextPage<SearchPageProps> = ({
  dataProduct,
  noResultsProducts,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const productsPerPage = 4;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: {
        category: inputValue,
      },
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = dataProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(dataProduct.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  return (
    <>
      <Head>
        <title>Igralishte</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container py-2">
        <div className="d-flex align-items-center">
          <Link href="/">
            <span className="arrow-sliders prev"></span>
          </Link>
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
                  <g clip-path="url(#clip0_1059_1431)">
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
        <div className="row py-3">
          {noResultsProducts ? (
            <div className="col pb-5">
              <p>There are no product results</p>
            </div>
          ) : (
            <>
              {currentProducts.map((item, index) => (
                <div className="col-6 mb-3" key={item.id}>
                  <ProductItem index={index} {...item} />
                </div>
              ))}
            </>
          )}
        </div>
        <div className="row">
          {currentProducts.length === 0 ? null : (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res: Response;
  let resBrand: Response;
  let dataProduct: ProductsType[] = [];
  let brandData: ProductsType[] = [];
  let noResultsProducts = false;

  if (query.category) {
    res = await fetch(`http://localhost:5001/products?q=${query.category}`);
    dataProduct = await res.json();

    resBrand = await fetch(`http://localhost:5001/brands?q=${query.category}`);
    brandData = await resBrand.json();

    if (dataProduct.length === 0 && brandData.length === 0) {
      noResultsProducts = true;
    }
  }

  return {
    props: {
      dataProduct,
      noResultsProducts,
      brandData,
    },
  };
};
