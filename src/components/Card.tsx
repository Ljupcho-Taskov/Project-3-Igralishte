import React from "react";
import { ProductsType } from "../types/types";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Reveal from "./Reveal";

interface ProductItemProps extends ProductsType {
  index: number;
}

const Card: React.FC<ProductItemProps> = ({
  id,
  img,
  title,
  priceR,
  index,
}) => {
  const isFullWidth = (index + 1) % 5 === 3;
  const { addToFavorites, removeFromFavorites, favorites } = useCart();

  const isFavorite = favorites.some((favoriteItem) => favoriteItem.id === id);

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    event.stopPropagation();

    if (isFavorite) {
      removeFromFavorites({ id, img, title, priceR });
    } else {
      addToFavorites({ id, img, title, priceR });
    }
  };
  return (
    <Link href={`/product/${id}`}>
      <div className={`pointer col-${isFullWidth ? "12" : "6"}`} key={id}>
        <Reveal>
          <div>
            <img src={img} alt="IMG-PRODUCT" />
            <p>{title}</p>
            <p>{priceR} den</p>
            <p className="pHeart" onClick={handleToggleFavorite}>
              {isFavorite ? (
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
              ) : (
                <img
                  src="../../logo/ph_heart-straight-thin.png"
                  alt="Empty heart"
                />
              )}
            </p>
          </div>
        </Reveal>
      </div>
    </Link>
  );
};

export default Card;
