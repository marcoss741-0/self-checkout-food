"use client";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/_components/ui/sheet";

const CartContent = () => {
  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-start">Sacola</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </>
  );
};

export default CartContent;
