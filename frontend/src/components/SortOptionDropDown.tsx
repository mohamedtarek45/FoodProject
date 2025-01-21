import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { Check } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};
const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];
const SortOptionDropDown = ({ onChange, sortOption }: Props) => {
  const index = SORT_OPTIONS.findIndex((option) => option.value === sortOption);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline">
          {sortOption ? `Sort by: ${SORT_OPTIONS[index].label}` : "Sort by: "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-40 ">
        {SORT_OPTIONS.map((option, index) => (
          <DropdownMenuItem key={index} className="hover:outline-none" onClick={() => onChange(option.value)}>
            <div className="cursor-pointer text-sm p-1 flex gap-2 bg-slate-100  px-12 py-3 lg:py-2 ">
              {option.label}
              {sortOption === option.value && <Check />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SortOptionDropDown;
