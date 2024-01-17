import React, { createContext, useContext, useEffect, useState } from "react";
import { CardsPriceType, ProductsType } from "../types/types";

interface CartContextProps {
  cart: ProductsType[];
  favorites: ProductsType[];
  priceCard: CardsPriceType[];
  addToCart: (product: ProductsType) => void;
  removeFromCart: (product: ProductsType) => void;
  addPriceToCart: (price: CardsPriceType) => void;
  addToFavorites: (product: Partial<ProductsType>) => void;
  removeFromFavorites: (product: Partial<ProductsType>) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<ProductsType[]>([]);
  const [favorites, setFavorites] = useState<ProductsType[]>([]);
  const [priceCard, setPriceCard] = useState<CardsPriceType[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedPriceCard = localStorage.getItem("priceCard");
    if (savedPriceCard) {
      setPriceCard(JSON.parse(savedPriceCard));
    }
  }, []);

  const clearCart = () => {
    setCart([]);
    setPriceCard([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("priceCart");
  };

  const addToCart = (product: ProductsType) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (product: ProductsType) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    setPriceCard((prevPriceCard) =>
      prevPriceCard.filter((item) => item.id !== product.id)
    );
    localStorage.setItem(
      "priceCard",
      JSON.stringify(priceCard.filter((item) => item.id !== product.id))
    );
  };

  const addPriceToCart = (price: CardsPriceType) => {
    setPriceCard((prevCart) => [...prevCart, price]);
  };

  const addToFavorites = (product: Partial<ProductsType>) => {
    const isProductInFavorites = favorites.some(
      (favoriteItem) => favoriteItem.id === product.id
    );

    if (!isProductInFavorites) {
      setFavorites((prevFavorites) => [
        ...prevFavorites,
        product as ProductsType,
      ]);
    }
  };
  const removeFromFavorites = (product: Partial<ProductsType>) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== product.id)
    );
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites.filter((item) => item.id !== product.id))
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("priceCard", JSON.stringify(priceCard));
  }, [priceCard]);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        priceCard,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
        addPriceToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
