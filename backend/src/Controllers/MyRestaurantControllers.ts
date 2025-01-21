import { Request, Response, NextFunction } from "express";
import Resturant from "../models/restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";
import Order from "../models/order";

export const createMyRestaurant=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const existingResturant=await Resturant.findOne({user:req.userId})

        if(existingResturant){
            res.status(409).json({message:"User resturant has already exitst"})
            return;
        }
        const image=req.file as Express.Multer.File;
  
        const base64Image=Buffer.from(image.buffer).toString("base64");
        const dataURI=`data:${image.mimetype};base64,${base64Image}`;
        const uploadResponse=await cloudinary.v2.uploader.upload(dataURI,{
            resource_type: "auto",
            folder: "FoodApp/Resturant",
            allowed_formats: ["jpg", "png", "jpeg"]
        })
        req.body.imageUrl=uploadResponse.secure_url;
        req.body.user= new mongoose.Types.ObjectId(req.userId);
        req.body.lastUpdated=new Date();
   
        const resturant=await Resturant.create(req.body);
        res.status(200).json(resturant)
    }catch(err){
        console.log(err);
        res.status(400).json({messgae:"there is error"})
    }
}
export const getMyRestaurant=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const existingResturant=await Resturant.findOne({user:req.userId})
        if(!existingResturant){
            console.log("Ddddddd");
            res.status(200).json({message:"User doesn't have restaurant"})
            return;
        }
        res.status(200).json(existingResturant)
    }catch(err){
        console.log(err);
        res.status(400).json({messgae:"there is error"})
    }
}
export const updateMyRestaurant=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const resturant=await Resturant.findOne({user:req.userId})
        if(!resturant){
            res.status(409).json({message:"User doesn't have restaurant"})
            return;
        }
        resturant.user=req.userId
        resturant.restaurantName=req.body.restaurantName
        resturant.city=req.body.city
        resturant.country=req.body.country
        resturant.deliveryPrice=req.body.deliveryPrice
        resturant.estimatedDeliveryTime=req.body.estimatedDeliveryTime
        resturant.cuisines=req.body.cuisines
        resturant.menuItems=req.body.menuItems
        resturant.lastUpdated=new Date();
        if(req.file)
        {
            const image=req.file as Express.Multer.File;
            const base64Image=Buffer.from(image.buffer).toString("base64");
            const dataURI=`data:${image.mimetype};base64,${base64Image}`;
            const uploadResponse=await cloudinary.v2.uploader.upload(dataURI,{
                resource_type: "auto",
                folder: "FoodApp/Resturant",
                allowed_formats: ["jpg", "png", "jpeg"]
            })
            resturant.imageUrl=uploadResponse.secure_url;
        }
        await resturant.save();
        res.status(200).json(resturant)
    }catch(err){
        console.log(err);
        res.status(400).json({messgae:"there is error"})
    }
}
export const updateOrdersStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try{
      const{orderId}=req.params;
      const {status}=req.body;
      const order=await Order.findById(orderId);
      if(!order)
      {
        res.status(404).json({message:"order not found"})
        return;
      }

      const restaurant=await Resturant.findById(order.restaurant)

      if(restaurant?.user.toString()!==req.userId.toString()){
        res.status(401).send("error in id");
        return;
      }
      order.status=status;
      await order.save();
      res.status(200).json(order)
    }catch(error){
      console.log(error);
      res.status(500).json({message:"unable to update order status"})
    }
  };
  export const getMyRestaurantsOrders = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const restaurant = await Resturant.findOne({ user: req.userId });
      if (!restaurant) {
        res.status(200).json({ message: "restaurant not found" });
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
  