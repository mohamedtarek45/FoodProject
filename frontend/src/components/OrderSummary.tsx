import { CartItem } from "@/pages/DetailsPage";
import { MenuItem, Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import { TrashIcon } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { SquareMinus } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  romveFromCard: (menuItem: MenuItem) => void;
  addToCard: (menuItem: MenuItem) => void;
  removeOneItemFromCard: (menuItem: MenuItem) => void;
};

const OrderSummary = ({
  restaurant,
  cartItems,
  romveFromCard,
  removeOneItemFromCard,
  addToCard,
}: Props) => {
  const getTotalCost = (cartItems: CartItem[]): number => {
    const cost = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const totalCost = cost + restaurant.deliveryPrice;
    return totalCost;
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>{getTotalCost(cartItems)} $</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <span>
              {item.quantity} {item.name}
            </span>
            <span className="flex items-center gap-1">
              <SquareMinus
                className="cursor-pointer hover:text-blue-600 hover:scale-110 transition-transform duration-200"
                onClick={() => removeOneItemFromCard(item)}
              />
              <SquarePlus
                className="cursor-pointer hover:text-blue-600 hover:scale-110 transition-transform duration-200"
                onClick={() => addToCard(item)}
              />
              <TrashIcon
                onClick={() => romveFromCard(item)}
                color="red"
                className="cursor-pointer  hover:scale-110 transition-transform duration-200"
              />
              {item.price * item.quantity} $
            </span>
          </div>
        ))}
        <Separator className="my-4 border-t-[1px] border-l-black" />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{restaurant.deliveryPrice} $</span>
        </div>
        <Separator className="my-4 border-t-[1px] border-l-black" />
      </CardContent>
    </>
  );
};
export default OrderSummary;
