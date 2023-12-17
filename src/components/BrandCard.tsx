import React from "react";
import { ProductsType } from "../types/types";
import Link from "next/link";

interface BrandItemProps extends ProductsType {
  index: number;
}

const BrandCard: React.FC<BrandItemProps> = ({
  id,
  img,
  title,
  priceR,
  category,
  description,
  index,
}) => {
  const isFullWidth = (index + 1) % 5 === 3;

  return (
    <Link href={`/brands/${id}`}>
      <div className="col-6" key={id}>
        <img src={img} alt="IMG-PRODUCT" />

        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l">
            <div className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
              {title}
            </div>
            <div className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
              {category}
            </div>

            <span className="stext-105 cl3">{priceR}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
