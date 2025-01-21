import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckOutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckOutSessionRequest = async (
    CheckOutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    const ressponse = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CheckOutSessionRequest),
      }
    );
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    mutateAsync: createCheckOutSession,
    isError,
    isPending,
    isSuccess,
    reset,
    // error,
  } = useMutation({ mutationFn: createCheckOutSessionRequest });
  if (isError) {
    toast.error("hhh");
    reset();
  }
  return {
    createCheckOutSession,
    isError,
    isPending,
    isSuccess,
  };
};

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyOrders = async ():Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const ressponse = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    data: orders,
    isError,
    isPending,
    error,
  } = useQuery({ queryKey: [`orders`], queryFn: getMyOrders ,refetchInterval:3000});
  if (isError) {
    toast.error(error.toString());
  }
  return { orders, isPending };
};
