import React, { useEffect, useState } from "react";
import { ProductsType } from "../../types/types";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Header from "../../components/Header";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";
import ProductItem from "../../components/ProductItem";
import Pagination from "../../components/Pagination";
import FourAccordions from "../../components/FourAccordions";
import Footer from "../../components/Footer";

interface Props {
  product: ProductsType;
  allProductsData: ProductsType[];
}

const ProductDetailsPage: React.FC<Props> = ({ product, allProductsData }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>(product.img);
  const {
    cart,
    favorites,
    removeFromCart,
    removeFromFavorites,
    addToCart,
    addToFavorites,
  } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<ProductsType[]>([]);

  const productsPerPage = 6;

  const relatedTotalPages = Math.ceil(relatedProducts.length / productsPerPage);

  const indexOfLastRelatedProduct = currentPage * productsPerPage;
  const indexOfFirstRelatedProduct =
    indexOfLastRelatedProduct - productsPerPage;
  const currentRelatedProducts = relatedProducts.slice(
    indexOfFirstRelatedProduct,
    indexOfLastRelatedProduct
  );

  useEffect(() => {
    setSelectedImage(product.img);
  }, [product.img]);

  useEffect(() => {
    setIsAddedToCart(cart.some((cartItem) => cartItem.id === product.id));
    setIsAddedToFavorites(
      favorites.some((favItem) => favItem.id === product.id)
    );
  }, [cart, favorites, product.id]);

  useEffect(() => {
    const related = allProductsData.filter(
      (relatedProduct) => relatedProduct.brand === product.brand
    );

    const filteredRelated = related.filter(
      (relatedProduct) => relatedProduct.id !== product.id
    );

    setRelatedProducts(filteredRelated);
  }, [product.brand, product.id, allProductsData]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      addToCart(product);
      setIsAddedToCart(true);
      setIsAddedToFavorites(false);
    }
  };

  const handleAddToFavorites = () => {
    if (!isAddedToFavorites) {
      addToFavorites(product);
      setIsAddedToFavorites(true);
      setIsAddedToCart(false);
    }
  };

  const handleGoToCart = () => {
    router.push({
      pathname: "/order",
      query: { cart: true },
    });
  };

  const handleGoToFavorites = () => {
    router.push({
      pathname: "/order",
      query: { favorites: true },
    });
  };
  const handleRemoveFromCart = () => {
    removeFromCart(product);
    setIsAddedToCart(false);
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(product);
    setIsAddedToFavorites(false);
  };

  const headerChlotes = product.chlotes ? product.chlotes : "";
  const headerCategory = product.category || "Сите";

  return (
    <>
      <Head>
        <title>Store - Product Detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="col-12 d-flex flex-column py-3">
        <p className="d-flex mb-4">
          <span
            className="pointer"
            onClick={() => {
              router.push({ pathname: "/" });
            }}
          >
            Почетна
          </span>
          {headerChlotes ? (
            <span className="d-flex align-items-center">
              <i className="fa-solid fa-angle-right mx-1"></i>
              {headerChlotes}
            </span>
          ) : null}
          {headerCategory ? (
            <span className="d-flex align-items-center">
              <i className="fa-solid fa-angle-right mx-1"></i>
              {headerCategory}
            </span>
          ) : null}
        </p>
        <h4 className="mb-4">{product.title}</h4>
        <div className="pointer">
          <img src={selectedImage} alt="IMG-PRODUCT" />
        </div>

        <div className="image-slider">
          {product.images?.map((imageData, index) => {
            const imgKey = `img${index + 1}` as keyof typeof imageData;
            return (
              <img
                key={imageData.id}
                src={imageData[imgKey]}
                alt={`Thumbnail ${imageData.id}`}
                onClick={() =>
                  handleThumbnailClick(imageData[imgKey] as string)
                }
              />
            );
          })}
        </div>
        <div className="d-flex justify-content-between">
          <p className="pPrice my-3">{product.priceR} ден.</p>
          <p className="d-flex flex-column align-items-end p-fixed">
            {!isAddedToCart ? (
              <span onClick={handleAddToCart} className="spanCart pointer mb-2">
                <img src="../../logo/cart.png" alt="" />
              </span>
            ) : (
              <span
                onClick={handleRemoveFromCart}
                className="spanCart pointer mb-2 pointer"
              >
                <span className="rotate-star">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M14.1058 8.56982C10.6694 7.89852 7.90356 3.79455 8.56701 0.356593L8.56938 0.344461C8.56902 0.346327 8.56847 0.348434 8.56811 0.350301C8.56852 0.348167 8.56875 0.346275 8.56917 0.344142L8.56683 0.356141C7.88732 3.79132 3.78061 6.55273 0.344191 5.88143C3.78471 6.55353 6.55312 10.6662 5.88102 14.1067C6.55312 10.6662 10.6657 7.89774 14.1063 8.56985L14.1058 8.56982Z"
                      fill="url(#paint0_linear_400_4342)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_400_4342"
                        x1="-0.744791"
                        y1="-1.47534"
                        x2="16.6546"
                        y2="5.01385"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.0389507" stopColor="#FFF0BF" />
                        <stop offset="0.289254" stopColor="#EFC990" />
                        <stop offset="0.512668" stopColor="#FDD292" />
                        <stop
                          offset="0.836534"
                          stopColor="#F0C749"
                          stopOpacity="0.42"
                        />
                        <stop offset="1" stopColor="#D4AF37" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="rotate-star2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M14.1058 8.56982C10.6694 7.89852 7.90356 3.79455 8.56701 0.356593L8.56938 0.344461C8.56902 0.346327 8.56847 0.348434 8.56811 0.350301C8.56852 0.348167 8.56875 0.346275 8.56917 0.344142L8.56683 0.356141C7.88732 3.79132 3.78061 6.55273 0.344191 5.88143C3.78471 6.55353 6.55312 10.6662 5.88102 14.1067C6.55312 10.6662 10.6657 7.89774 14.1063 8.56985L14.1058 8.56982Z"
                      fill="url(#paint0_linear_400_4342)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_400_4342"
                        x1="-0.744791"
                        y1="-1.47534"
                        x2="16.6546"
                        y2="5.01385"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.0389507" stopColor="#FFF0BF" />
                        <stop offset="0.289254" stopColor="#EFC990" />
                        <stop offset="0.512668" stopColor="#FDD292" />
                        <stop
                          offset="0.836534"
                          stopColor="#F0C749"
                          stopOpacity="0.42"
                        />
                        <stop offset="1" stopColor="#D4AF37" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.92944 16.2405L9.00011 16.3112L9.07082 16.2406L18.9508 6.37058L18.9509 6.37054C19.1191 6.20232 19.3472 6.10781 19.5851 6.10781C19.823 6.10781 20.0512 6.20232 20.2194 6.37054C20.3877 6.53877 20.4822 6.76693 20.4822 7.00483C20.4822 7.24274 20.3877 7.4709 20.2194 7.63912L9.63944 18.2191C9.28849 18.5701 8.7218 18.5701 8.37086 18.2191L4.19086 14.0391C4.10756 13.9558 4.04149 13.8569 3.99641 13.7481C3.95133 13.6393 3.92813 13.5226 3.92813 13.4048C3.92813 13.1669 4.02263 12.9388 4.19086 12.7705C4.35908 12.6023 4.58724 12.5078 4.82515 12.5078C5.06305 12.5078 5.29121 12.6023 5.45944 12.7705L8.92944 16.2405Z"
                    fill="#232221"
                    stroke="#FFF7F7"
                    strokeWidth="0.2"
                  />
                </svg>
              </span>
            )}
            {!isAddedToFavorites ? (
              <span
                onClick={handleAddToFavorites}
                className="spanHeart pointer"
              >
                <img src="../../logo/ph_heart-straight-thin.png" alt="" />
              </span>
            ) : (
              <span
                onClick={handleRemoveFromFavorites}
                className="spanHeart pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 27 27"
                  fill="none"
                >
                  <path
                    d="M2.97295 5.19498L2.97332 5.19464L2.97332 5.19464C3.5586 4.6737 4.24306 4.27632 4.98564 4.02632C5.72791 3.77643 6.51298 3.67894 7.29382 3.7397C8.87678 3.83979 10.3681 4.51675 11.4855 5.64245C11.4856 5.64247 11.4856 5.64249 11.4856 5.64251L12.4743 6.63119L13.6844 5.42111C14.2638 4.84141 14.9552 4.38591 15.7166 4.08243C16.4779 3.77895 17.2932 3.63386 18.1125 3.65603C18.9318 3.6782 19.738 3.86716 20.4818 4.21137C21.2256 4.55558 21.8915 5.04782 22.4387 5.65801L22.439 5.65838C22.9599 6.24366 23.3573 6.92812 23.6073 7.6707C23.8572 8.413 23.9547 9.1981 23.8939 9.97897C23.7938 11.5619 23.1168 13.0533 21.9911 14.1707L13.4644 22.6974L13.4636 22.6982C13.1999 22.9575 12.8454 23.1035 12.4756 23.1053C12.4754 23.1053 12.4751 23.1053 12.4749 23.1053L12.4743 22.9706C12.3079 22.9734 12.1427 22.9421 11.9888 22.8788C11.8349 22.8154 11.6956 22.7213 11.5795 22.6021L2.97295 5.19498ZM2.97295 5.19498C2.36276 5.74217 1.87053 6.40802 1.52632 7.15184C1.18211 7.89566 0.993144 8.70185 0.970973 9.52116C0.948803 10.3405 1.09389 11.1557 1.39737 11.917C1.70085 12.6784 2.15635 13.3699 2.73605 13.9493L11.483 22.6962C11.4832 22.6964 11.4834 22.6966 11.4836 22.6968L2.97295 5.19498ZM14.402 6.34993C14.3829 6.34672 14.3639 6.34371 14.345 6.3409L14.3851 6.30104C14.3905 6.31578 14.3962 6.33207 14.402 6.34993ZM14.4752 6.21148C14.4751 6.21165 14.4749 6.21183 14.4747 6.21202L14.4752 6.21148ZM12.5682 17.4663L12.7539 14.1385L12.6849 18.6791C12.6746 18.5093 12.6642 18.3499 12.6539 18.2062C12.6386 17.9913 12.6232 17.8098 12.6081 17.6812C12.6006 17.6175 12.5927 17.5632 12.5842 17.5233C12.5804 17.5056 12.5754 17.485 12.5682 17.4663Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="0.269498"
                  />
                </svg>
              </span>
            )}
          </p>
        </div>
        <p className="mb-3">{product.description}</p>
        <p className="mb-3">Количина: {product.amount}</p>
        <div className="d-flex align-items-center mb-3">
          {!isAddedToCart ? (
            <>
              <button
                className="buttonPrice pointer m-0 mr-2"
                onClick={handleAddToCart}
              >
                <span className="buttonPriceSpan">Додај во кошничка</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="buttonPriceClick pointer m-0 mr-2"
                onClick={handleGoToCart}
              >
                <span className="btnSpanStars">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="122"
                    height="29"
                    viewBox="0 0 122 29"
                    fill="none"
                  >
                    <path
                      d="M26.3138 16.6686C20.3278 15.4992 15.5099 8.35033 16.6656 2.36163L16.6697 2.3405C16.6691 2.34375 16.6681 2.34742 16.6675 2.35067C16.6682 2.34696 16.6686 2.34366 16.6693 2.33994L16.6652 2.36085C15.4816 8.3447 8.32796 13.1549 2.34194 11.9855C8.3351 13.1563 13.1575 20.3202 11.9867 26.3134C13.1575 20.3202 20.3214 15.4978 26.3146 16.6686L26.3138 16.6686Z"
                      fill="url(#paint0_linear_1035_1596)"
                    />
                    <path
                      d="M117.659 6.26676C114.53 8.32799 109.342 7.26339 107.273 4.13885L107.266 4.1278C107.267 4.1295 107.268 4.13152 107.269 4.13322C107.268 4.13128 107.267 4.12966 107.266 4.12772L107.273 4.13865C109.327 7.27308 108.257 12.46 105.128 14.5212C108.261 12.4575 113.457 13.5268 115.521 16.6598C113.457 13.5268 114.527 8.33014 117.66 6.26646L117.659 6.26676Z"
                      fill="url(#paint1_linear_1035_1596)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1035_1596"
                        x1="0.444998"
                        y1="-0.829473"
                        x2="30.7536"
                        y2="10.4743"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.0389507" stopColor="#FFF0BF" />
                        <stop offset="0.289254" stopColor="#EFC990" />
                        <stop offset="0.512668" stopColor="#FDD292" />
                        <stop
                          offset="0.836534"
                          stopColor="#F0C749"
                          stopOpacity="0.42"
                        />
                        <stop offset="1" stopColor="#D4AF37" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1035_1596"
                        x1="98.7842"
                        y1="9.7144"
                        x2="116.943"
                        y2="1.63971"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.0389507" stopColor="#FFF0BF" />
                        <stop offset="0.289254" stopColor="#EFC990" />
                        <stop offset="0.512668" stopColor="#FDD292" />
                        <stop
                          offset="0.836534"
                          stopColor="#F0C749"
                          stopOpacity="0.42"
                        />
                        <stop offset="1" stopColor="#D4AF37" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="added">Додадено</span>
                <span className="goToCart">кон кошничката →</span>
              </button>
            </>
          )}

          {!isAddedToFavorites ? (
            <span
              onClick={handleAddToFavorites}
              className="spanHeart pointer border-0 boxShadowNone"
            >
              <img src="../../logo/ph_heart-straight-thin.png" alt="" />
            </span>
          ) : (
            <span
              onClick={handleGoToFavorites}
              className="spanHeart pointer  border-0 boxShadowNone"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 27 27"
                fill="none"
              >
                <path
                  d="M2.97295 5.19498L2.97332 5.19464L2.97332 5.19464C3.5586 4.6737 4.24306 4.27632 4.98564 4.02632C5.72791 3.77643 6.51298 3.67894 7.29382 3.7397C8.87678 3.83979 10.3681 4.51675 11.4855 5.64245C11.4856 5.64247 11.4856 5.64249 11.4856 5.64251L12.4743 6.63119L13.6844 5.42111C14.2638 4.84141 14.9552 4.38591 15.7166 4.08243C16.4779 3.77895 17.2932 3.63386 18.1125 3.65603C18.9318 3.6782 19.738 3.86716 20.4818 4.21137C21.2256 4.55558 21.8915 5.04782 22.4387 5.65801L22.439 5.65838C22.9599 6.24366 23.3573 6.92812 23.6073 7.6707C23.8572 8.413 23.9547 9.1981 23.8939 9.97897C23.7938 11.5619 23.1168 13.0533 21.9911 14.1707L13.4644 22.6974L13.4636 22.6982C13.1999 22.9575 12.8454 23.1035 12.4756 23.1053C12.4754 23.1053 12.4751 23.1053 12.4749 23.1053L12.4743 22.9706C12.3079 22.9734 12.1427 22.9421 11.9888 22.8788C11.8349 22.8154 11.6956 22.7213 11.5795 22.6021L2.97295 5.19498ZM2.97295 5.19498C2.36276 5.74217 1.87053 6.40802 1.52632 7.15184C1.18211 7.89566 0.993144 8.70185 0.970973 9.52116C0.948803 10.3405 1.09389 11.1557 1.39737 11.917C1.70085 12.6784 2.15635 13.3699 2.73605 13.9493L11.483 22.6962C11.4832 22.6964 11.4834 22.6966 11.4836 22.6968L2.97295 5.19498ZM14.402 6.34993C14.3829 6.34672 14.3639 6.34371 14.345 6.3409L14.3851 6.30104C14.3905 6.31578 14.3962 6.33207 14.402 6.34993ZM14.4752 6.21148C14.4751 6.21165 14.4749 6.21183 14.4747 6.21202L14.4752 6.21148ZM12.5682 17.4663L12.7539 14.1385L12.6849 18.6791C12.6746 18.5093 12.6642 18.3499 12.6539 18.2062C12.6386 17.9913 12.6232 17.8098 12.6081 17.6812C12.6006 17.6175 12.5927 17.5632 12.5842 17.5233C12.5804 17.5056 12.5754 17.485 12.5682 17.4663Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="0.269498"
                />
              </svg>
            </span>
          )}
        </div>
        <hr className="hrYellow" />

        <p className="mb-3">
          <span>Величина: </span>
          <span> {product.size}</span>
        </p>
        <p className="mb-3">
          Совет за величина: ова парче е направено од материјал кој не се
          растегнува. Одговара на наведената величина.
        </p>
        <hr className="hrYellow" />
        <div className="row mb-3 align-items-center">
          <div className="col-1 mr-1">
            <p>Боја: </p>
          </div>
          <div className="col-3">
            <p
              className="colorSquare"
              style={{ backgroundColor: `${product.color}` }}
            ></p>
          </div>
        </div>
        <p>Материјал:</p>
        <p className="mb-3">{product.material}</p>
        <p className="mb-3">Постава: {product.material}</p>
        <p className="mb-3">Состојба: 10/10</p>
        <p className="mb-3">Насоки за одржување: {product.maintenance}</p>
        <hr className="hrYellow" />
      </div>
      <div className="container d-flex flex-column">
        <FourAccordions />
        {currentRelatedProducts.length > 0 ? (
          <>
            <div className="row my-3">
              <div className="col-12 d-flex align-items-start">
                <h3>Парчиња од брендот:</h3>
              </div>
            </div>

            <div className="row">
              {currentRelatedProducts.map((item, index) => (
                <ProductItem index={index} {...item} key={item.id} />
              ))}
            </div>
          </>
        ) : null}
      </div>
      <Footer />
    </>
  );
};
export default ProductDetailsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const ProductsRes = await fetch("https://igralishte.onrender.com/products");
  const ProductsData: ProductsType[] = await ProductsRes.json();

  const paths = ProductsData.map((product) => {
    return {
      params: {
        id: product.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allProductsRes = await fetch(
    "https://igralishte.onrender.com/products"
  );
  const allProductsData: ProductsType[] = await allProductsRes.json();

  let product: ProductsType | undefined = undefined;

  if (params?.id) {
    const featuredProductRes = await fetch(
      `https://igralishte.onrender.com/products/${params.id}`
    );
    product = await featuredProductRes.json();
  }

  return {
    props: {
      product,
      allProductsData,
    },
  };
};
