import express from "express";
import { jwtCheck, jwtParse } from "../../middleware/auth";
import {
  CreateCheckoutSession,
  RespondOfSession,
  getMyOrders,
} from "../Controllers/OrderController";

const router = express.Router();
router.route("/").get(jwtCheck, jwtParse, getMyOrders);

router
  .route("/checkout/create-checkout-session")
  .post(jwtCheck, jwtParse, CreateCheckoutSession);
router.route("/checkout/webhook").post(RespondOfSession);
// router.route("/checkout/webhook").post(express.raw({ type: "application/json" }),RespondOfSession)
export default router;
