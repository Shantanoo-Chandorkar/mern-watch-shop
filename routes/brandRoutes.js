import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  allBrandsController,
  createBrandController,
  deleteBrandController,
  singleBrandController,
  updateBrandController,
} from "../controllers/brandController.js";

// router object
const router = express.Router();

// routes
// create brand || @ POST /api/v1/brand/create-brand
router.post("/create-brand", requireSignIn, isAdmin, createBrandController);

// update brand || @ PUT /api/v1/brand/update-brand/:id
router.put("/update-brand/:id", requireSignIn, isAdmin, updateBrandController);

// get all brands || @ GET /api/v1/brand/all-brands
router.get("/all-brands", allBrandsController);

// get single brand || @ GET /api/v1/brand/single-brand/:slug
router.get("/single-brand/:slug", singleBrandController);

// delete single brand || @ DELETE /api/v1/brand/single-brand/:id
router.delete(
  "/delete-brand/:id",
  requireSignIn,
  isAdmin,
  deleteBrandController
);

export default router;
