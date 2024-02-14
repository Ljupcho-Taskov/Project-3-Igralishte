import React from "react";
import { useRouter } from "next/router";

const Breadcrumps = () => {
  const router = useRouter();
  const { category, brand, size, color, price } = router.query;
  const headerCategory = category;
  const headerBrand = brand ? (Array.isArray(brand) ? brand : [brand]) : [];
  const headerSize = size ? (Array.isArray(size) ? size : [size]) : [];
  const headerColor = color ? (Array.isArray(color) ? color : [color]) : [];
  const headerPrice = price ? (Array.isArray(price) ? price : [price]) : [];

  return (
    <div className="col-12 my-3">
      <p className="d-flex flex-wrap">
        <span
          className="pointer"
          onClick={() => {
            router.push({
              pathname: "/",
            });
          }}
        >
          Почетна
        </span>
        {!brand && !category && !size && !color && !price && (
          <span className="d-flex align-items-center">
            <i className="fa-solid fa-angle-right mx-1"></i>
            Сите
          </span>
        )}
        {headerCategory ? (
          <>
            {Array.isArray(headerCategory) ? (
              headerCategory.map((category, index) => (
                <span className="d-flex align-items-center" key={index}>
                  <i className="fa-solid fa-angle-right mx-1"></i>
                  {category}
                </span>
              ))
            ) : (
              <span className="d-flex align-items-center">
                <i className="fa-solid fa-angle-right mx-1"></i>
                {headerCategory}
              </span>
            )}
          </>
        ) : null}
        {headerBrand.length > 0 && (
          <>
            {headerBrand.map((brand, index) => (
              <span className="d-flex align-items-center" key={index}>
                <i className="fa-solid fa-angle-right mx-1"></i>
                {brand}
              </span>
            ))}
          </>
        )}
        {headerSize.length > 0 && (
          <>
            {headerSize.map((size, index) => (
              <span className="d-flex align-items-center" key={index}>
                <i className="fa-solid fa-angle-right mx-1"></i>
                {size}
              </span>
            ))}
          </>
        )}
        {headerColor.length > 0 && (
          <>
            {headerColor.map((color, index) => (
              <span className="d-flex align-items-center" key={index}>
                <i className="fa-solid fa-angle-right mx-1"></i>
                {color}
              </span>
            ))}
          </>
        )}
        {headerPrice.length > 0 && (
          <>
            {headerPrice.map((price, index) => (
              <span className="d-flex align-items-center" key={index}>
                <i className="fa-solid fa-angle-right mx-1"></i>
                {price}
              </span>
            ))}
          </>
        )}
      </p>
    </div>
  );
};

export default Breadcrumps;
