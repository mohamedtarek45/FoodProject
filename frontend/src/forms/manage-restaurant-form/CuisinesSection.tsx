import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import CuisineCheckBox from "./CuisineCheckBox";

export const cuisineList = [
  "American",
  "BBQ",
  "Breakfast",
  "Burgers",
  "Cafe",
  "Chinese",
  "Desserts",
  "French",
  "Greek",
  "Healthy",
  "Indian",
  "Italian",
  "Japanese",
  "Mexican",
  "Noodles",
  "Organic",
  "Pasta",
  "Pizza",
  "Salads",
  "Seafood",
  "Spanish",
  "Steak",
  "Sushi",
  "Tacos",
  "Tapas",
  "Vegan",
];

const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h1>
          <FormDescription className="text-lg">
            Select the cuisines that your restaurant serves
          </FormDescription>
        </h1>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((item,index) => (
                <CuisineCheckBox key={index} cuisine={item} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default CuisinesSection;
