import React from "react";
import { ProductsType } from "../types/types";
import Link from "next/link";

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

  return (
    <Link href={`/product/${id}`}>
      <div className={`col-${isFullWidth ? "12" : "6"}`} key={id}>
        <img src={img} alt="IMG-PRODUCT" />
        <p>{title}</p>
        <p>{priceR} den</p>
      </div>
    </Link>
  );
};

export default Card;
