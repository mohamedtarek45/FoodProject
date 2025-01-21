import { Request, Response, NextFunction } from "express";
import User from "../models/user";

export const createCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("ddddddd");
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      res.status(200).send();
    } else {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "error creating User" });
  }
};
export const updateCurrentUser=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {name,addressLine1,country,city}=req.body;
    const user=await User.findById(req.userId);
    if(!user){
      res.status(404).json({message:"User not found"})
    }else{
      user.name=name;
      user.addressLine1=addressLine1;
      user.city=city;
      user.country=country;
      await user.save();
      res.status(200).json({user})
    }
  }catch(err){
    console.log(err);
    res.status(500).json({message:"Error updating user"})
  }
}
export const getCurrentUser=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const user=await User.findById(req.userId).select("-auth0Id -_id");
    if(!user){
      res.status(404).json({message:"User not found"})
    }else{
      res.status(200).json({user})
    }
  }catch(err){
    console.log(err);
    res.status(500).json({message:"Error updating user"})
  }
}