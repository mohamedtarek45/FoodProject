import { cuisineList } from "@/forms/manage-restaurant-form/CuisinesSection";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisine: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClicked: () => void;
};
const CuisinesFilter = ({
  isExpanded,
  onChange,
  selectedCuisines,
  onExpandedClicked,
}: Props) => {
  const handleCuisinesReset = () => {
    onChange([]);
  };
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;
    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
    onChange(newCuisineList);
  };
  const handleExpandedClicked = async () => {
    if (isExpanded) {
      // الانتقال إلى أول الصفحة عند تقليص القائمة
      await window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setTimeout(() => {
      onExpandedClicked();
    }, 40);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-base font-semibold mb-2">Filter By Cuisine</div>
        <div
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
          onClick={handleCuisinesReset}
        >
          Reset Filter
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine,index) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={index}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={30} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant="link"
          className="mt-4 flex-1 "
          onClick={handleExpandedClicked}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />{" "}
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />{" "}
            </span>
          )}
        </Button>
      </div>
    </>
  );
};
export default CuisinesFilter;
