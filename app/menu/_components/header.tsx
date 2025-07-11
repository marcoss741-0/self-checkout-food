"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ArrowLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "../cart";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl" | "slug">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const { toggleCart } = useContext(CartContext);
  const handleBackClick = () => {
    router.back();
  };
  const handleOrdersClick = () => {
    toggleCart();
    console.log("Orders button clicked");
  };
  return (
    <>
      <div className="relative h-[250px] w-full">
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 rounded-full z-10"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon size={50} />
        </Button>
        <Image
          src={restaurant.coverImageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4 rounded-full z-10"
          onClick={handleOrdersClick}
        >
          <ScrollTextIcon size={50} />
        </Button>
      </div>
    </>
  );
};

export default RestaurantHeader;
