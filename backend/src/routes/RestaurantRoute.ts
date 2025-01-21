import express from 'express';
import { ValidataionOfGetRestaurant, ValidataionOfSearch } from '../../middleware/validation';
import { searchRestaurant,gethRestaurant } from '../Controllers/RestaurantController';

const router=express.Router();
router.route("/search/:city").get(ValidataionOfSearch,searchRestaurant);
router.route("/:restaurantId").get(ValidataionOfGetRestaurant,gethRestaurant);
export default router