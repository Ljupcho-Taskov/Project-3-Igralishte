import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductsType } from "../types/types";
import ProductItem from "./ProductItem";

interface Props {
  products: ProductsType[];
}

const SlickCarousel: React.FC<Props> = ({ products }) => {
  let sliderRef = useRef<Slider>(null);
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const settings = {
    // className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="my-5">
      <div className="slider-container">
        <Slider
          ref={sliderRef}
          {...settings}
          className=" d-flex justify-content-center"
        >
          {products.map((item, index) => (
            <ProductItem key={index} {...item} index={index} />
          ))}
        </Slider>
        <div className="my-3 d-flex justify-content-around">
          <p className="pointer" onClick={previous}>
            <i className="fa-solid fa-angle-left fa-2xl"></i>
          </p>
          <p className="pointer" onClick={next}>
            <i className="fa-solid fa-angle-right fa-2xl"></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlickCarousel;
