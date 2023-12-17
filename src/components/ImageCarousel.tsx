import { useState } from "react";
import { ProductsType } from "../types/types";
import Link from "next/link";

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
  const currentProduct = products[currentImageIndex];
  return (
    <section
      style={{
        background:
          "var(--Pink-gradient, linear-gradient(33deg, #FFDBDB 0.05%, #FDFDFD 93.1%, #FDFDFD 110.6%, #8A8328 152.03%))",
      }}
    >
      <div className="container py-4">
        <div className="row">
          <Link href={`/product/${currentProduct.id}`}>
            <div className="col">
              <div className="image-carousel">
                <img src={products[currentImageIndex].img} alt="Product" />
              </div>
              <div className="col">
                <p>{currentProduct.title}</p>
                <p>{currentProduct.priceR}</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <p className="arrow-sliders prev" onClick={previousImage}></p>
            <p className="arrow-sliders next" onClick={nextImage}></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
