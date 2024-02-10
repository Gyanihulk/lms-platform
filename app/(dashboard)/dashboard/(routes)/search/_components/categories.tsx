
"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./categoryItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";



interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">

    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
          <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
          />
          ))}
    </div>
    <ScrollBar orientation="horizontal" />
          </ScrollArea>
  )
}