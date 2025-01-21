import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Restaurant, ResturantSearchResponse } from "../types";
import { searchState } from "@/pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: searchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<ResturantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("seacrhQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sort);
    console.log(params.toString());
    const ressponse = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    data: results,
    isError,

    isPending,

    // error,
  } = useQuery({
    queryKey: [searchState, city],
    queryFn: createSearchRequest,
    enabled: !!city,
  });
  if (isError) {
    toast.error("there is error");
  }
  return {
    results,
    isError,
    isPending,
  };
};

export const useGetRestaurantDetails = (restaurantId?: string) => {
  const GetRestaurantDetails = async (): Promise<Restaurant> => {
    const ressponse = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );
    if (!ressponse.ok) {
      throw new Error("Failed To get Restaurant");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    data: restaurantDetails,
    isError,
    isPending,
    // error,
  } = useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: GetRestaurantDetails,
    enabled: !!restaurantId,
  });

  if (isError) {
    toast.error("there is error");
  }
  return {
    restaurantDetails,
    isError,
    isPending,
  };
};
