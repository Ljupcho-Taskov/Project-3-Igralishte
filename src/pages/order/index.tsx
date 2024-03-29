import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useCart } from "../../context/CartContext";
import Footer from "../../components/Footer";
import { GetServerSideProps } from "next";
import { CardsPriceType, ProductsType } from "../../types/types";
import Pagination from "../../components/Pagination";
import ProductItem from "../../components/ProductItem";
import FourAccordions from "../../components/FourAccordions";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

interface ProductsPageProps {
  productsData: ProductsType[];
  brandData: ProductsType[];
  dataCardsPrice: CardsPriceType[];
  currentPage: number;
  totalPages: number;
}

const OrderPage: React.FC<ProductsPageProps> = ({ productsData }) => {
  const router = useRouter();
  const { cart, favorites, priceCard, clearCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewingFavorites, setIsViewingFavorites] = useState(false);
  const [isViewingCart, setIsViewingCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productInfo, setProductInfo] = useState<
    { name: string; price: number; discountProcent: number }[]
  >([]);
  const deliveryCost = 150;

  const productsPerPage = 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalProductPages = Math.ceil(productsData.length / productsPerPage);

  const calculateDiscountedAmount = (
    originalPrice: number,
    discountProcent: number
  ): number => {
    const discountAmount = (discountProcent / 100) * originalPrice;
    return discountAmount;
  };

  useEffect(() => {
    const { favorites: isViewingFavoritesParam } = router.query;
    setIsViewingFavorites(Boolean(isViewingFavoritesParam));
  }, [router.query]);

  useEffect(() => {
    const { cart: isViewingCartParam } = router.query;
    setIsViewingCart(Boolean(isViewingCartParam));
  }, [router.query]);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const totalGiftCard = priceCard.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    const totalPriceWithDelivery = total + deliveryCost + totalGiftCard;
    setTotalPrice(totalPriceWithDelivery);

    const products = cart.map((item) => ({
      name: item.title,
      price: parseFloat(item.price),
      discountProcent: item.discountProcent || 0,
    }));

    const giftCardProducts = priceCard.map((giftCard) => ({
      name: giftCard.title,
      price: parseFloat(giftCard.price),
      discountProcent: 0,
    }));

    setProductInfo([...products, ...giftCardProducts]);
  }, [cart, priceCard]);

  useEffect(() => {
    if (!localStorage.getItem("cart") && !localStorage.getItem("priceCard")) {
      router.reload();
    }
  }, [router]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalProductPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewCart = () => {
    setIsViewingFavorites(false);
  };

  const handleViewFavorites = () => {
    setIsViewingFavorites(true);
  };

  return (
    <>
      <Head>
        <title>Igralishte</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container pt-4">
        <div className="row py-4">
          <div className="col-12 d-flex justify-content-between">
            <Link href="/order?cart=true">
              <div
                onClick={handleViewCart}
                className={
                  isViewingCart
                    ? "order-button colorDark pointer"
                    : "order-button darkGrey pointer"
                }
              >
                <img
                  style={{ width: "30px", height: "28px" }}
                  className="mr-2"
                  src="../../logo/cart.png"
                  alt=""
                />
                <span>
                  Кошничка ({cart.length > 0 ? `${cart.length}` : "0"})
                </span>
              </div>
            </Link>
            <Link href="/order?favorites=true">
              <div
                className={
                  isViewingFavorites
                    ? "favorites-button colorDark pointer"
                    : "favorites-button darkGrey pointer"
                }
                onClick={handleViewFavorites}
              >
                <img
                  style={{ width: "30px", height: "28px" }}
                  className="mr-2"
                  src="../../logo/ph_heart-straight-thin.png"
                  alt=""
                />
                <span>
                  Favorites (
                  {favorites.length > 0 ? `${favorites.length}` : "0"})
                </span>
              </div>
            </Link>
          </div>
          <div className="col-12">
            <hr className="hr-order " />
          </div>
        </div>
      </div>

      {cart.length === 0 && priceCard.length === 0 && !isViewingFavorites ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <p>Вашата кошничка е празна</p>
              </div>
            </div>
          </div>
        </>
      ) : favorites.length === 0 && isViewingFavorites ? (
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>Немате омилени парчиња</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          {isViewingFavorites ? (
            <div className="row">
              {favorites.map((item, index) => (
                <ProductItem index={index} {...item} key={item.id} />
              ))}
            </div>
          ) : (
            <>
              <div className="row">
                {cart.map((item, index) => (
                  <ProductItem index={index} {...item} key={item.id} />
                ))}
              </div>
              <div className="row">
                <div className="col-12">
                  {productInfo.map((product, index) => (
                    <div
                      className="mb-3 d-flex justify-content-between"
                      key={index}
                    >
                      <p className="productName">{product.name}</p>
                      <p className="productName">{product.price} ден.</p>
                    </div>
                  ))}
                  {productInfo
                    .filter((product) => product.discountProcent > 0)
                    .map((product) => (
                      <div
                        className="mb-3 d-flex justify-content-between"
                        key={product.name}
                      >
                        <p className="productName red-alert ">{`1 x -${product.discountProcent}% попуст!`}</p>
                        <p className="productName red-alert ">
                          -
                          {calculateDiscountedAmount(
                            product.price,
                            product.discountProcent
                          )}
                          ден.
                        </p>
                      </div>
                    ))}

                  {productInfo.some(
                    (product) => product.discountProcent > 0
                  ) && (
                    <div className=" mb-3 d-flex justify-content-between">
                      <p className="productName">Total Discount</p>
                      <p>
                        -
                        {productInfo
                          .filter((product) => product.discountProcent > 0)
                          .map((product) =>
                            calculateDiscountedAmount(
                              product.price,
                              product.discountProcent
                            )
                          )
                          .reduce((sum, discount) => sum + discount, 0)}{" "}
                        ден.
                      </p>
                    </div>
                  )}

                  <div className=" mb-5 d-flex justify-content-between">
                    <p className="productName olive">+ достава до адреса</p>
                    <p className="productName olive">{deliveryCost} ден.</p>
                  </div>
                  <hr className="hr-order" />
                  <div className="d-flex justify-content-between">
                    <p className="total">Вкупно:</p>
                    <p className="total">
                      {totalPrice -
                        productInfo
                          .filter((product) => product.discountProcent > 0)
                          .map((product) =>
                            calculateDiscountedAmount(
                              product.price,
                              product.discountProcent
                            )
                          )
                          .reduce(
                            (sum, discountProcent) => sum + discountProcent,
                            0
                          )}
                      ден.
                    </p>
                  </div>
                  <hr className="mb-5 hr-order" />
                </div>
              </div>
            </>
          )}

          <div className="row mb-5">
            <div className="col-12 d-flex align-items-center">
              {!isViewingFavorites ? (
                <>
                  <Link href="/formToOrder">
                    <button className="continue-button">Продолжи</button>
                  </Link>
                  <button onClick={clearCart} className="delete-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 4.2H7.2V4V2.7H16.8V4V4.2H17H21.8V5.8H20H19.8V6V21C19.8 21.2122 19.7157 21.4157 19.5657 21.5657C19.4157 21.7157 19.2122 21.8 19 21.8H5C4.78783 21.8 4.58434 21.7157 4.43431 21.5657C4.28429 21.4157 4.2 21.2122 4.2 21V6V5.8H4H2.2V4.2H7ZM6 5.8H5.8V6V20V20.2H6H18H18.2V20V6V5.8H18H6ZM9.2 9.2H10.8V16.8H9.2V9.2ZM13.2 9.2H14.8V16.8H13.2V9.2Z"
                        fill="#232221"
                        stroke="#FDFDFD"
                        strokeWidth="0.4"
                      />
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
      <div className="container mt-5">
        <FourAccordions />
        <div className="row">
          <div className="col-12">
            <h3 className=" mb-4">Други парчиња:</h3>
          </div>
          {currentProducts.map((item, index) => (
            <ProductItem index={index} {...item} key={item.id} />
          ))}
        </div>

        <div className="row">
          <Pagination
            currentPage={currentPage}
            totalPages={totalProductPages}
            handlePageChange={handlePageChange}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let productsRes: Response;
  let brandRes: Response;

  const priceRes = await fetch(
    "https://backend-igralishte.onrender.com/priceCards"
  );
  const dataCardsPrice: CardsPriceType[] = await priceRes.json();

  if (query.category) {
    productsRes = await fetch(
      `https://backend-igralishte.onrender.com/products?q=${query.category}`
    );
    brandRes = await fetch(
      `https://backend-igralishte.onrender.com/brands?q=${query.category}`
    );
  } else {
    productsRes = await fetch(
      "https://backend-igralishte.onrender.com/products"
    );
    brandRes = await fetch("https://backend-igralishte.onrender.com/brands");
  }

  const productsData: ProductsType[] = await productsRes.json();
  const brandData: ProductsType[] = await brandRes.json();

  return {
    props: { productsData, brandData, dataCardsPrice },
  };
};
