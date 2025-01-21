import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Resturant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";
dotenv.config({ path: "./.env" });
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

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

const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  const lintItem = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (menuItem) => menuItem._id.toString() === cartItem.menuItemId.toString()
    );
    if (!menuItem) {
      throw new Error(`can't find ${cartItem.name}`);
    }
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      quantity: parseInt(cartItem.quantity),
      price_data: {
        currency: "usd",
        unit_amount: menuItem.price * 100,
        product_data: {
          name: `${menuItem.name} `,
        },
      },
    };
    return line_item;
  });
  return lintItem;
};

export const CreateCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Resturant.findById(req.body.restaurantId);
    if (!restaurant) {
      throw new Error("No restaurant id");
    }
    const newOrder = new Order({
      restaurant: restaurant._id,
      user: req.userId,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      createdAt: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      status: "placed",
    });
    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery",
            type: "fixed_amount",
            fixed_amount: {
              amount: restaurant.deliveryPrice * 100,
              currency: "usd",
            },
          },
        },
      ],
      mode: "payment",
      metadata: {
        orderId: newOrder._id.toString(),
        restaurantId: restaurant._id.toString(),
      },
      success_url: `${FRONTEND_URL}/order-status?Success=true`,
      cancel_url: `${FRONTEND_URL}/detail/${restaurant._id}?cancelled=true`,
      payment_method_types: ["card"],
      customer_email: checkoutSessionRequest.deliveryDetails.email,
    });
    if (!session.url) {
      res.status(400).json({ message: "there is error in creating session" });
      return;
    }

    await newOrder.save();
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "there is error" });
  }
};

export const RespondOfSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  let event;
  const sig = req.headers["stripe-signature"];
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_ENDPOINT_SECRET as string
    );
  } catch (error: any) {
    console.log(error);
    res.status(400).send(`Webhook error: ${error.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    // console.log("even checkout.session.completed");
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    if (event.data.object.amount_total)
      order.totalAmount = event.data.object.amount_total / 100;
    order.status = "paid";

    await order.save();
  }

  res.status(200).send();
};
export const getMyOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user")
      .sort({ ["createdAt"]: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const getMyRestaurantsOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurant = await Resturant.findOne({ user: req.userId });
    if (!restaurant) {
      res.status(404).json({ message: "restaurant not found" });
      return;
    }
    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "omething went wrong" });
  }
};
