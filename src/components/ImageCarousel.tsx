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
    <section
      style={{
        background:
          "var(--Pink-gradient, linear-gradient(33deg, #FFDBDB 0.05%, #FDFDFD 93.1%, #FDFDFD 110.6%, #8A8328 152.03%))",
      }}
    >
      <div className="container py-4">
        <div className="row">
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
          <div className="col d-flex justify-content-center">
            <i
              className="fa-solid fa-angle-left fa-2xl"
              onClick={previousImage}
            ></i>
            <i
              className="fa-solid fa-angle-right fa-2xl"
              onClick={nextImage}
            ></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
