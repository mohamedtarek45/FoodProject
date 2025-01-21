import { NextFunction, Request, Response } from "express";
import Resturant from "../models/restaurant";

export const searchRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const city = req.params.city;
    const SearcyQuery = (req.query.seacrhQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption =
      (req.query.sortOption as string) === ""
        ? "lastUpdated"
        : (req.query.sortOption as string);
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};
    query["city"] = new RegExp(city, "i");
    const cityCheck = await Resturant.countDocuments(query);
    if (cityCheck === 0) {
      res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
      return;
    }
    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisinesArray };
    }
    if (SearcyQuery) {
      const searchRegex = new RegExp(SearcyQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restauants = await Resturant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();
    const total = await Resturant.countDocuments(query);

    const response = {
      data: restauants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const gethRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const restaurant=await Resturant.findById(req.params.restaurantId);
    if(!restaurant){
      res.status(400).json({message:"restaurant not found"})
      return;
    }
    res.status(200).json(restaurant); 
  }catch(err)
  {
   console.log(err);
   res.status(200).json({message:"there is error"}) 
  }
};
