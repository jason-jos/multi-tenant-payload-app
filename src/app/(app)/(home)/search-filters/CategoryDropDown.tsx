"use client";
import { useRef, useState } from "react";
import { Category } from "@/payload-types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./SubcategoryMenu";
import Link from "next/link";

interface Props {
  category: Category;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}
const CategoryDropDown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropDownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setOpen(true);
    }
  };
  const onMouseLeave = () => {
    setOpen(false);
  };

  const dropdownPosition = getDropdownPosition();
  return (
    <div
      className="relative"
      ref={dropDownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen &&"bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]" 
            //Focused button remain elevated 
          )}
        >
          <Link href={`/${category.slug=== "all" ? "" : category.slug}`}>
          {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          //The arrow above the dropdown menu  @t=10359
          //TS to infer types @t=13096
          <div
            className={cn(
              "opacity-0 absolute w-0 h-0 -bottom-3 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2 ", 
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
};

export default CategoryDropDown;
