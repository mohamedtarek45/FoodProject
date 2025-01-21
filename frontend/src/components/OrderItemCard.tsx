import { Order, OrderState } from "@/types";
import { CardHeader, CardTitle, Card, CardContent } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS } from "./OrderStatusHeader";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";
type Props = {
  order: Order;
};
const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderState>(order.status);
  useEffect(()=>{
    setStatus(order.status)
  },[order.status])
  const { isPending, updateRestaurantStatus } = useUpdateMyRestaurantOrder();
  const handleStatusChange = async (newState: OrderState) => {
    if (order.status !== newState) {
      await updateRestaurantStatus({
        orderId: order._id as string,
        status: newState as string,
      });
      setStatus(newState);
    }
  };
  const getTime = () => {
    const created = new Date(order.createdAt);
    created.setHours(created.getHours() - 2);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    const hour = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hour > 12 ? hour - 12 : hour}:${paddedMinutes} ${
      hour > 12 ? "PM" : "AM"
    }`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1} {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              {order?.totalAmount?.toString()||0}$
            </span>
          </div>
          <div>
            Status :
            <span className="ml-2 font-normal">
              {status}
            </span>
          </div>
        </CardTitle>
        <Separator className="my-4 border-t-[1px] border-l-black" />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((item, index) => (
            <span key={index}>
              <span className="mr-2">{item.quantity}</span>
              {item.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the Status of our Order</Label>
          <Select
            onValueChange={(value) => handleStatusChange(value as OrderState)}
            disabled={isPending}
            value={status}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
export default OrderItemCard;
