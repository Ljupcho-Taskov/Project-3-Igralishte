export interface ProductsType {
  id: string;
  price: string;
  priceR: string;
  title: string;
  material: string;
  category: string;
  maintenance: string;
  chlotes: string;
  discount: number;
  img: string;
  brand: string;
  description: string;
  accessories: string;
  color: string;
  size: string;
  amount: string;
  sizeDesc: string;
  date: Date;
  formattedDate: string;
  images: {
    id: string;
    img: string;
  }[];
  desc1: string;
  desc2: string;
  desc3: string;
  desc4: string;
  desc5: string;
  desc6: string;
  desc7: string;
}
export interface BrandType {
  id: string;
  categoryName: string;
}
export interface AccessoriesType {
  id: string;
  name: string;
}
export interface ColorsType {
  id: string;
  value: string;
}

export interface GiftCardsType {
  id: string;
  img: string;
  title: string;
}
export interface CardsPriceType {
  id: string;
  price: string;
  title: string;
}

export interface FaqType {
  id: string;
  title: string;
  desc: string;
}
export interface ProductCardType {
  id: string;
  img: string;
  priceR: string;
  title: string;
}
