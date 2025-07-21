"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProducts
  extends Pick<Product, "id" | "name" | "imageUrl" | "price"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  toggleCart: () => void;
  products: CartProducts[];
  addProductToCart: (product: CartProducts) => void;
  decreaseProductsQuantity: (productId: string) => void;
  increaseProductsQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  toggleCart: () => {},
  products: [],
  addProductToCart: () => {},
  decreaseProductsQuantity: () => {},
  increaseProductsQuantity: () => {},
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

  const decreaseProductsQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  const increaseProductsQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }

        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        toggleCart,
        products,
        addProductToCart,
        decreaseProductsQuantity,
        increaseProductsQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
