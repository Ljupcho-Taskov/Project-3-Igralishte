import { useState } from "react";
import { ProductsType } from "../types/types";
import ProductItem from "./ProductItem";

interface Props {
  products: ProductsType[];
}

const ImageCarousel: React.FC<Props> = ({ products }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < products.length - 1 ? prevIndex + 1 : 0
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : products.length - 1
    );
  };

  return (
    <section>
      <div className="container py-5">
        <div className="row mb-3">
          <div className="col-12">
            <div className="image-carousel">
              <ProductItem
                index={currentImageIndex}
                {...products[currentImageIndex]}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-around">
            <p className="pointer" onClick={previousImage}>
              <i className="fa-solid fa-angle-left fa-2xl"></i>
            </p>
            <p className="pointer" onClick={nextImage}>
              <i className="fa-solid fa-angle-right fa-2xl"></i>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
