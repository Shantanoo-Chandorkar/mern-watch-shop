import brandModel from "../models/brandModel.js";
import slugify from "slugify";

// create brand controller
export const createBrandController = async (req, res) => {
  try {
    const { name } = req.body;

    // input validaion
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is required",
      });
    }

    // check
    const existingBrand = await brandModel.findOne({ name });
    if (existingBrand) {
      return res.status(409).send({
        success: false,
        message: "Brand already exist",
      });
    }

    const brand = await new brandModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New brand created successfully",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating the brand",
      error,
    });
  }
};

// update brand controller
export const updateBrandController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // check
    const brandExist = await brandModel.findOne({ name });
    if (brandExist) {
      return res.status(409).send({
        success: false,
        message: "Brand already exist",
      });
    }

    // update
    const brand = await brandModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Brand updated successfully",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating category",
      error,
    });
  }
};

// get-all brand controller
export const allBrandsController = async (req, res) => {
  try {
    const brand = await brandModel.find({});
    res.status(200).send({
      success: true,
      message: "All brands listed successfully",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting all brands",
      error,
    });
  }
};

// get-single brand controller
export const singleBrandController = async (req, res) => {
  try {
    const { slug } = req.params;
    const brand = await brandModel.findOne({ slug: slug });

    if (!brand) {
      return res.status(404).send({
        success: false,
        message: "Brand not found",
        error,
      });
    }

    res.status(200).send({
      success: true,
      message: "Single brand found successfully.",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting requested brand",
      error,
    });
  }
};

// delete brand controller
export const deleteBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    await brandModel.findByIdAndDelete({ _id: id });

    // const brand = await brandModel.find({});
    res.status(200).send({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting requested brand",
      error,
    });
  }
};
