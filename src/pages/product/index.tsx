import type { GetServerSideProps, NextPage } from "next";
import { ProductsType } from "../../types/types";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import Head from "next/head";

interface ProductsPageProps {
  data: ProductsType[];
  currentPage: number;
  totalPages: number;
  noResultsProducts: boolean;
}

const ProductsPage: NextPage<ProductsPageProps> = ({
  data,
  noResultsProducts,
}) => {
  const router = useRouter();
  const { category } = router.query;

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<
    "newest" | "oldest"
  >("newest");
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([]);
  const productsPerPage = 10;

  useEffect(() => {
    const filtered = data
      .filter(
        (product) =>
          (selectedCategories.length === 0 ||
            selectedCategories.includes(product.category)) &&
          (selectedBrands.length === 0 ||
            selectedBrands.includes(product.brand))
      )
      .filter((product) => {
        const productPrice = parseInt(product.price);

        return (
          selectedPrices.length === 0 ||
          selectedPrices.some((range) => {
            const [min, max] = range.split("-").map(Number);
            return productPrice >= min && productPrice <= max;
          })
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (selectedSortOption === "newest") {
          return dateB > dateA ? 1 : -1;
        } else {
          return dateA > dateB ? 1 : -1;
        }
      });

    setFilteredProducts(filtered);
  }, [
    selectedCategories,
    selectedBrands,
    selectedSortOption,
    selectedPrices,
    selectedSizes,
    selectedColors,
    data,
  ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(data.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
      const selected = Array.isArray(category)
        ? category.filter(Boolean)
        : [category];

      const categories: string[] = [];
      const brands: string[] = [];

      selected.forEach((item) => {
        if (typeof item === "string") {
          if (item.startsWith("brand:")) {
            brands.push(item.replace("brand:", ""));
          } else {
            categories.push(item);
          }
        }
      });

      setSelectedCategories(categories);
      setSelectedBrands(brands);
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [isModalOpen, category]);

  return (
    <>
      <Head>
        <title>Igralishte</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 my-3">
            <p>{`Почетна  > ${category || "Сите"}`}</p>
          </div>
          <div className="col-12 mb-3 d-flex justify-content-between">
            <Link href="/filterPage">
              <button className="searchFilter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_400_3720)">
                    <path
                      d="M12.178 3.2002C9.42881 3.2002 7.2002 5.42881 7.2002 8.17795C7.2002 10.9271 9.42881 13.1557 12.178 13.1557C13.3449 13.1575 14.475 12.7476 15.3694 11.998L19.2414 15.87C19.2827 15.9113 19.3317 15.944 19.3856 15.9664C19.4395 15.9887 19.4973 16.0002 19.5557 16.0002C19.6141 16.0002 19.6719 15.9887 19.7258 15.9664C19.7797 15.944 19.8287 15.9113 19.87 15.87C19.9113 15.8287 19.944 15.7797 19.9664 15.7258C19.9887 15.6719 20.0002 15.6141 20.0002 15.5557C20.0002 15.4973 19.9887 15.4395 19.9664 15.3856C19.944 15.3317 19.9113 15.2827 19.87 15.2414L15.998 11.3694C16.7475 10.475 17.1574 9.34486 17.1557 8.17795C17.1557 5.42881 14.9271 3.2002 12.178 3.2002ZM8.08908 8.17795C8.08908 5.91983 9.91983 4.08908 12.178 4.08908C14.4361 4.08908 16.2668 5.91983 16.2668 8.17795C16.2668 10.4361 14.4361 12.2668 12.178 12.2668C9.91983 12.2668 8.08908 10.4361 8.08908 8.17795Z"
                      fill="#232221"
                    />
                    <line
                      x1="5.59961"
                      y1="6.72039"
                      x2="1.59961"
                      y2="6.72039"
                      stroke="black"
                      strokeWidth="0.64"
                    />
                    <line
                      x1="5.59961"
                      y1="9.1198"
                      x2="-0.00039053"
                      y2="9.1198"
                      stroke="black"
                      strokeWidth="0.64"
                    />
                    <line
                      x1="5.59961"
                      y1="11.5202"
                      x2="0.799609"
                      y2="11.5202"
                      stroke="black"
                      strokeWidth="0.64"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_400_3720">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </Link>
            <div>
              <span className="sort-span">Подреди според</span>
              <select
                value={selectedSortOption}
                onChange={(e) =>
                  setSelectedSortOption(e.target.value as "newest" | "oldest")
                }
              >
                <option value="newest">Најново</option>
                <option value="oldest">Најcтаро</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {noResultsProducts ? (
            <div>There are no results</div>
          ) : (
            currentProducts.map((item, index) => (
              <Card index={index} key={item.id} {...item} />
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>

      <Footer />
    </>
  );
};

export default ProductsPage;

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
  if (data.length === 0) {
    noResultsProducts = true;
  }

  return {
    props: { data, noResultsProducts },
  };
};
