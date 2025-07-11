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
  const { toggleCart, isOpen } = useContext(CartContext);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-start">Sacola</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartContent;
