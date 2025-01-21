import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";
const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restuarant name is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
    invalid_type_error: "must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z
    .instanceof(File, { message: "image is required" })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "Image size must be less than 1MB",
    }),
});

type restaurantFormData = z.infer<typeof formSchema>;
type props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

const ManageResturantFrom = ({ onSave, isLoading, restaurant }: props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(
      restaurant
        ? formSchema.extend({
            imageFile: formSchema.shape.imageFile.optional(),
          })
        : formSchema
    ),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  useEffect(() => {
    if (restaurant) {
      console.log("Dddddddddddddddddddddddddddddd");
      form.reset(restaurant);
    }
  }, [form, restaurant]);
  const onsubmit = (jsonData: restaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", jsonData.restaurantName);
    formData.append("city", jsonData.city);
    formData.append("country", jsonData.country);
    formData.append("deliveryPrice", jsonData.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      jsonData.estimatedDeliveryTime.toString()
    );
    jsonData.cuisines.forEach((item, index) => {
      formData.append(`cuisines[${index}]`, item);
    });
    jsonData.menuItems.forEach((item, index) => {
      formData.append(`menuItems[${index}][name]`, item.name);
      formData.append(`menuItems[${index}][price]`, item.price.toString());
    });
    formData.append(`imageFile`, jsonData.imageFile);
    onSave(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator className="my-4 border-t-[1px] border-l-black" />
        <CuisinesSection />
        <Separator className="my-4 border-t-[1px] border-l-black" />
        <MenuSection />
        <Separator className="my-4 border-t-[1px] border-l-black" />
        <ImageSection />
        {isLoading ? (
          <LoadingButton value="please wait" />
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};
export default ManageResturantFrom;
