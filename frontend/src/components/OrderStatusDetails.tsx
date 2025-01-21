import { Order } from "@/types";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  order: Order;
};
const OrderStatusDetails = ({ order }: Props) => {
    console.log(order);
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1} {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Oreder</span>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator className="my-4 border-t-[1px] border-l-black" />
      <div className="flex flex-col">
        <span className="font-bold">
            Total
        </span>
        <span>{order.totalAmount}</span>
      </div>
    </div>
  );
};
export default OrderStatusDetails;
