"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProducts
  extends Pick<Product, "id" | "name" | "imageUrl" | "price"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  toggleCart: () => void;
  products: CartProducts[];
  addProductToCart: (product: CartProducts) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  toggleCart: () => {},
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProducts[]>([]);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProductToCart = (product: CartProducts) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        toggleCart,
        products,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
