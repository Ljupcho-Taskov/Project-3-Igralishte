import React from "react";
import ProductItem from "./ProductItem";
import { ProductsType } from "../types/types";
import BrandItem from "./BrandItem";

interface Props {
  relatedData: ProductsType[];
}

const RelatedProducts: React.FC<Props> = ({ relatedData }) => {
  return (
    <div className="container">
      <div className="p-b-45">
        <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
      </div>

      <div className="wrap-slick2">
        <div className="d-flex">
          {relatedData.map((brand) => (
            <BrandItem key={`relateProduct-${brand.id}`} {...brand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
