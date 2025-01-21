import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order, Restaurant } from "@/types";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCreateMyRestaurant = () => {
  const nav = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const CreateMyRestaurant = async (
    restaurandDataForm: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const ressponse = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurandDataForm,
    });
    if (!ressponse.ok) {
      throw new Error("Failed To create Restaurant");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    mutateAsync: createRestaurant,
    isError,
    isPending,
    reset,
    isSuccess,
    // error,
  } = useMutation({ mutationFn: CreateMyRestaurant });

  if (isSuccess) {
    toast.success("Create Restaurant Succefully");
    nav("/");
  }
  if (isError) {
    toast.error("ddfefef");
    reset(); //to clear state of error
  }
  return {
    createRestaurant,
    isError,
    isPending,
  };
};
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  let key;
  let code;
  const GetMyRestaurant = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    key = accessToken;
    const ressponse = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!ressponse.ok) {
      throw new Error("Failed To get Restaurant");
    }
    code = ressponse.status;
    console.log(code);
    console.log(ressponse);
    const data = await ressponse.json();
    return data;
  };
  const {
    data,
    isError,
    isPending,
    // error,
  } = useQuery({ queryKey: ["Restaurant", key], queryFn: GetMyRestaurant });
  let getRestaurant=data;
  if (data?.message === "User doesn't have restaurant") {
    getRestaurant=undefined;
  } else if (isError) {
    toast.error("qqwe");
  }
  return {
    getRestaurant,
    isError,
    isPending,
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurant = async (
    restaurandDataForm: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const ressponse = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurandDataForm,
    });
    if (!ressponse.ok) {
      throw new Error("Failed To create Restaurant");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    mutateAsync: updateRestaurant,
    isError,
    isPending,
    reset,
    isSuccess,
    // error,
  } = useMutation({ mutationFn: updateMyRestaurant });

  if (isSuccess) {
    toast.success("Update Restaurant Succefully");
  }
  if (isError) {
    toast.error("bnbn");
    reset(); //to clear state of error
  }
  return {
    updateRestaurant,
    isError,
    isPending,
  };
};
export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  let key;

  const getMyRestaurantOrders = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    key = accessToken;
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed To fetch orders");
    }
    const data = await response.json();
    return data;
  };
  const {
    data,
    isError,
    isPending,
    // error,
  } = useQuery({
    queryKey: ["Restaurant-Order", key],
    queryFn: getMyRestaurantOrders,
    refetchInterval: 5000,
  });
  if (isError) {
    toast.error("ooooo");
  }
  let RestaurantOrders:[]|Order[];
  if(!Array.isArray(data)){
    RestaurantOrders=[]
  }else{
    RestaurantOrders=data;
  }
  return {
    RestaurantOrders,
    isPending,
  };
};
type UpdateRequest = {
  orderId: string;
  status: string;
};
export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurantOrder = async (UpdateRequest: UpdateRequest) => {
    const accessToken = await getAccessTokenSilently();
    const ressponse = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${UpdateRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: UpdateRequest.status }),
      }
    );
    if (!ressponse.ok) {
      throw new Error("Failed To fetch orders");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    mutateAsync: updateRestaurantStatus,
    isPending,
    reset,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: updateMyRestaurantOrder });
  if (isSuccess) {
    toast.success("Order updated");
  }
  if (isError) {
    toast.error("unable to update");
    reset();
  }
  return { updateRestaurantStatus, isPending };
};
