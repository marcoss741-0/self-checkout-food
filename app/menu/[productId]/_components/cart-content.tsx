"use client";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/app/_components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../cart";

const CartContent = () => {
  const { toggleCart, isOpen, products } = useContext(CartContext);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-start">Sacola</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {products.map((product) => (
            <h1 key={product.id}>
              {product.name} - {product.quantity}
            </h1>
          ))}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartContent;
