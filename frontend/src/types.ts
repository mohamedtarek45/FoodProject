import Order from '../../backend/src/models/order';

export type User = {
  user: {
    name: string;
    email: string;
    addressLine1: string;
    city: string;
    country: string;
  };
};
export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
  message?: string;
};
export type ResturantSearchResponse={
  data:Restaurant[],
  pagination:{
    total:number,
    page:number,
    pages:number
  }
}
export type OrderState="placed"|"paid"|"inProgress"|"outForDelivery"|"deliverd";
export type Order={
    _id:string;
    restaurant: Restaurant;
    user:User;
    deliveryDetails: { 
      email:string;
      name:string;
      addressLine1:string;
      city:string
     },
     cartItems:{
      menuItemId:string
      name: string
      quantity: number;
     }[];
     totalAmount:number,
     status:OrderState;
     createdAt:string
}