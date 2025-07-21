"use client";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/app/_components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../context/cart";
import CartItem from "./cart-item";

const CartContent = () => {
  const { toggleCart, isOpen, products } = useContext(CartContext);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[85%]">
          <SheetHeader>
            <SheetTitle className="text-start">Sacola</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="space-y-5">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartContent;
