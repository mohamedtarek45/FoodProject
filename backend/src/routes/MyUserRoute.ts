import express from "express";
import {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser
} from "../Controllers/MyUserControllers";
import { jwtCheck, jwtParse } from "../../middleware/auth";
import {  ValidataionOfUpdate } from "../../middleware/validation";
const router = express.Router();
router
  .route("/")
  .get(jwtCheck,jwtParse,getCurrentUser)
  .post(jwtCheck, createCurrentUser)
  .put(
    jwtCheck,
    jwtParse,
    ValidataionOfUpdate,
    updateCurrentUser
  );
export default router;
