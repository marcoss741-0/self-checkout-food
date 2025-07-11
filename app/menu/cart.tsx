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
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  toggleCart: () => {},
  products: [],
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProducts[]>([]);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        toggleCart,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
