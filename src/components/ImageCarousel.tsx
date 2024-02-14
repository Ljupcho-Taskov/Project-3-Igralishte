import { useState, useRef } from "react";
import { ProductsType } from "../types/types";
import ProductItem from "./ProductItem";

interface Props {
  products: ProductsType[];
}

const ImageCarousel: React.FC<Props> = ({ products }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;

    if (deltaX > 50) {
      previousImage();
    } else if (deltaX < -50) {
      nextImage();
    }

    touchStartXRef.current = null;
  };

  return (
    <section>
      <div className="container py-5">
        <div
          className="row mb-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
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
