import express from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing
// register || @ POST /api/v1/auth/register
router.post("/register", registerController);
// login || @ POST /api/v1/auth/login
router.post("/login", loginController);
// forgot password || @ POST /api/v1/auth/forgot-password
router.post("/forgot-password", forgotPasswordController);

// test
router.get("/test", requireSignIn, isAdmin, testController);

// protected user-auth || @ GET /api/v1/auth/user-auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin-auth || @ GET /api/v1/auth/admin-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOrdersController);

// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// update order status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
