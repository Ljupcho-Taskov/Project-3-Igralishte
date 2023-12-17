import React from "react";
import { ProductsType } from "../types/types";
import Link from "next/link";

interface ProductItemProps extends ProductsType {
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  img,
  title,
  priceR,
  index,
}) => {
  return (
    <Link href={`/product/${id}`}>
      <div className="row mb-5" key={id}>
        <div className="col-12 ">
          <img src={img} alt="IMG-PRODUCT" />

          <div>
            <p className=" my-1 productItemTitle">{title}</p>
            <p className="productItemTitle">{priceR} ден.</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
