import express from "express";
import multer from "multer";
import { jwtCheck, jwtParse } from "../../middleware/auth";
import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
  updateOrdersStatus,
  getMyRestaurantsOrders
} from "../Controllers/MyRestaurantControllers";
import { validateMyRestaurantRequest } from "../../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 12 * 1024 * 1024,
  },
});
router
  .route("/")
  .post(
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    createMyRestaurant
  )
  .get(jwtCheck, jwtParse, getMyRestaurant)
  .put(
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    updateMyRestaurant
  );
router.route("/order").get(jwtCheck, jwtParse, getMyRestaurantsOrders);
router
  .route("/order/:orderId/status")
  .patch(jwtCheck, jwtParse, updateOrdersStatus);
export default router;
