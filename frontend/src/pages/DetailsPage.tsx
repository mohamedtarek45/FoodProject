import { useCreateCheckOutSession } from "@/api/OrderApi";
import { useGetRestaurantDetails } from "@/api/RestaurantApi";
import CheckOutButton from "@/components/CheckOutButton";
import Menuitem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/userProfileForm";
import { MenuItem } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};



const DetailsPage = () => {
  const { restaurantId } = useParams();
  const { isPending, restaurantDetails } =
    useGetRestaurantDetails(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const data = sessionStorage.getItem(`restaurantCardItems-${restaurantId}`);
    return data ? JSON.parse(data) : [];
  });
  const { createCheckOutSession, isPending: checkOutLoading } =
    useCreateCheckOutSession();
  const onCheckOut = async (userFormData: UserFormData) => {
    if (!restaurantId) {
      return;
    }
    const checkOutDATA = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      deliveryDetails: {
        email: userFormData.email as string,
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
      },
      restaurantId: restaurantId,
    };
    const data = await createCheckOutSession(checkOutDATA);
    window.location.href=data.url
  };
  const addToCard = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      let updatedCartItems: CartItem[];
      const existingItem = prev.find(
        (cartItem) => menuItem._id === cartItem._id
      );
      if (existingItem) {
        updatedCartItems = prev.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `restaurantCardItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  const removeFromCard = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      // const updatedCartItems:CartItem[]=prev.map((item)=>(item._id===menuItem._id? {...item,quantity:item.quantity-1}:item ))
      const updatedCartItems: CartItem[] = prev.filter(
        (item) => item._id !== menuItem._id
      );
      sessionStorage.setItem(
        `restaurantCardItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  const removeOneItemFromCard = (menuItem: MenuItem) => {
    const existingItem = cartItems.find(
      (cartItem) => menuItem._id === cartItem._id
    );
    if (existingItem?.quantity === 1) {
      removeFromCard(menuItem);
      return;
    }
    setCartItems((prev) => {
      const updatedCartItems: CartItem[] = prev.map((item) =>
        item._id === menuItem._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      sessionStorage.setItem(
        `restaurantCardItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  if (isPending || !restaurantId || !restaurantDetails) {
    return <p>Loading....</p>;
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantDetails?.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurantDetails} />
          <span className="text-2xl font-bold tracking-tight ">Menu</span>
          {restaurantDetails.menuItems.map((menuItem, index) => (
            <Menuitem
              key={index}
              menuItem={menuItem}
              addToCart={() => addToCard(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurantDetails}
              cartItems={cartItems}
              romveFromCard={removeFromCard}
              addToCard={addToCard}
              removeOneItemFromCard={removeOneItemFromCard}
            />
            <CardFooter>
              <CheckOutButton
                disapled={cartItems.length === 0}
                onCheckOut={onCheckOut}
                isLoading={checkOutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DetailsPage;
