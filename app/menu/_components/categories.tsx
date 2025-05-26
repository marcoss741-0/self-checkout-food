"use client";

import { Button } from "@/app/_components/ui/button";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: {
          products: true;
        };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true;
  };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);
  const handleCategoryChange = (category: MenuCategoriesWithProducts) => {
    setSelectCategory(category);
  };
  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
      <div className="p-5">
        <div className="flex gap-3 items-center">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>
      <ScrollArea className="w-full h-[calc(100vh-10rem)] border-t">
        <div className="flex items-center w-max space-x-4 p-4 pt-5">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryChange(category)}
              variant={getCategoryButtonVariant(category)}
              className="h-10 px-4 text-xs font-semibold rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default RestaurantCategories;
