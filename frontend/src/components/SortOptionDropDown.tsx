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
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer text-sm p-1 hover:outline-none flex gap-2"
            onClick={() => onChange(option.value)}
          >
            {sortOption === option.value && <Check />}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SortOptionDropDown;
