import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/users.controllers.js";
import {
  createProduct
} from "../controllers/product.controllers.js";

const router = express.Router();

// register user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refreshtoken", refreshToken);
router.post("/products", createProduct);

export default router;
