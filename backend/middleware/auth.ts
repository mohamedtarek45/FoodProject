import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import User from "../src/models/user";
dotenv.config({ path: "./.env" });

declare global{
  namespace Express{
    interface Request {
      userId:string;
      auth0Id:string
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_issuerBaseURL,
  tokenSigningAlg: "RS256",
});
export const jwtParse= async(req:Request,res:Response,next:NextFunction)=>{
  const{authorization}=req.headers;
  if(!authorization||!authorization.startsWith('Bearer ')){
    res.status(400).json({message:"ERROR"})
    return;
  }
  const token=authorization.split(" ")[1];
  try{
    const decdoe= jwt.decode(token) as jwt.JwtPayload
    const auth0Id= decdoe.sub as string
    const user=await User.findOne({auth0Id})
    if(!user){
      res.status(400).json({message:"ERROR"})
      return;
    }
    req.userId=user._id.toString();
    req.auth0Id=auth0Id ;
    next();
    
  }catch(err){
    console.log(err);
    res.status(400).json({message:"ERRrrrrrrOR"})
    return;
  }

}