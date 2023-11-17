import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  allCategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

// router object
const router = express.Router();

// routes
// create category || @ POST /api/v1/category/create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category || @ PUT /api/v1/category/update-category/:id
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all categories || @ GET /api/v1/category/all-categories
router.get("/all-categories", allCategoryController);

// get single category || @ GET /api/v1/category/single-category/:slug
router.get("/single-category/:slug", singleCategoryController);

// delete single category || @ DELETE /api/v1/category/delete-category/:id
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
