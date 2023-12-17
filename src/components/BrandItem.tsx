import React from "react";
import { ProductsType } from "../types/types";
import Link from "next/link";
import { useRouter } from "next/router";

const BrandItem: React.FC<ProductsType> = (brand) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <Link href={`/brands?category=${brand.category}&brand=${brand.brand}`}>
      <div className="col-12" key={brand.id}>
        <img className="mb-3" src={brand.img} alt="IMG-PRODUCT" />

        {category !== `${brand.category}` ? (
          <div>
            <p style={{ position: "absolute", top: "0px" }}>{brand.category}</p>
          </div>
        ) : (
          <>
            <p>{brand.desc1}</p>
            <ul className="py-3">
              <li style={{ listStyleType: "disc" }}>{brand.desc2}</li>
              <li style={{ listStyleType: "disc" }}>{brand.desc3}</li>
              <li style={{ listStyleType: "disc" }}>{brand.desc4}</li>
              <li style={{ listStyleType: "disc" }}>{brand.desc5}</li>
            </ul>
            <p className="mb-3">{brand.desc6}</p>
            <p className="mb-3">{brand.desc7}</p>
          </>
        )}
      </div>
    </Link>
  );
};

export default BrandItem;
