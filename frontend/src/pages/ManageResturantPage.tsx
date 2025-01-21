import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ManageResturantFrom from "../forms/manage-restaurant-form/ManageResturantFrom";

import OrderItemCard from "@/components/OrderItemCard";
const ManageResturantPage = () => {
  const { createRestaurant, isPending: isCreate } = useCreateMyRestaurant();
  const { getRestaurant: restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isPending: isUpdate } = useUpdateMyRestaurant();
  const { RestaurantOrders, isPending: loadingOrders } =
    useGetMyRestaurantOrders();
    console.log(restaurant);
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restuarant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{RestaurantOrders?.length===0? "No orders found":`${RestaurantOrders?.length} Orders`}</h2>
        {loadingOrders ? (
          <p>Loading....</p>
        ) : (
          RestaurantOrders?.map((item, index) => (
            <OrderItemCard order={item} key={index} />
          ))
        )}
        {/* {RestaurantOrders?.map((item, index) => (
          <OrderItemCard order={item} key={index} />
        ))} */}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageResturantFrom
          restaurant={restaurant}
          isLoading={isCreate || isUpdate}
          onSave={restaurant ? updateRestaurant : createRestaurant}
        />
      </TabsContent>
    </Tabs>
  );
};
export default ManageResturantPage;
