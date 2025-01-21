import { Order } from "@/types";
import { Progress } from "@/components/ui/progress";

import { OrderState } from "@/types";
import { CircleCheck } from 'lucide-react';

type OrderStatusInfo = {
  label: string;
  value: OrderState;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Placed", value: "placed", progressValue: 0 },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
  { label: "Delivered", value: "deliverd", progressValue: 100 },
];

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
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
  const getOrderInfo = () => {
    return ORDER_STATUS.find((o) => o.value === order.status);
  };
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between ">
        <span>Order status : {getOrderInfo()?.label}</span>
        <div className="flex items-center space-x-3">
          <span>
            {getOrderInfo()?.value !== "placed"
              ? `Expected by : ${getExpectedDelivery()}`
              : "Expected by : --:--"}
          </span>
          {getOrderInfo()?.value === "deliverd"&&<CircleCheck className="text-green-400 text-7xl" size={32} />}
        </div>
      </h1>
      <Progress
        className={`${
          getOrderInfo()?.value === "deliverd" ? "" : "animate-pulse"
        }`}
        classNameI={`${
          getOrderInfo()?.value === "deliverd" ? "bg-green-400" : ""
        }`}
        value={getOrderInfo()?.progressValue}
      />
    </>
  );
};
export default OrderStatusHeader;
