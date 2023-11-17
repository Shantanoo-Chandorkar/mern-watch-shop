import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePasswords, hashPassword } from "../utils/authHelper.js";
import { passwordSchema } from "../utils/authValidator.js";
import emailValidator from "email-validator";
import jwt from "jsonwebtoken";

// POST REGISTER
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // input validation
    if (!name) {
      return res.send({ success: false, message: "Name is required." });
    }
    if (!email) {
      return res.send({ success: false, message: "Email is required." });
    }
    if (!password) {
      return res.send({ success: false, message: "Password is required." });
    }
    if (!phone) {
      return res.send({ success: false, message: "Phone is required." });
    }
    if (!address) {
      return res.send({ success: false, message: "Address is required." });
    }

    if (!answer) {
      return res.send({ success: false, message: "Answer is required." });
    }

    // ALTERNATIVE FOR ABOVE
    // if (!name || !email || !password || !phone || !address) {
    //   return res.send({ message: "Please fill all the data." });
    // }

    // password validation
    const passDetails = passwordSchema.validate(password, { details: true });
    // console.log(passDetails);
    if (passDetails.length > 0) {
      return res.status(400).json({
        success: false,
        message: passDetails[0].message,
      });
    }

    // email validation
    if (!emailValidator.validate(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    // existing user
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Already registered, Please login.",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User register successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // input validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // compare password
    const matchPassword = await comparePasswords(password, user.password);
    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token
    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// POST FORGOT PASSWORD
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required." });
    }
    if (!answer) {
      return res
        .status(400)
        .send({ success: false, message: "Answer is required." });
    }
    if (!newPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Password is required." });
    }

    // password validation
    const passDetails = passwordSchema.validate(newPassword, { details: true });
    // console.log(passDetails);
    if (passDetails.length > 0) {
      return res.status(400).json({
        success: false,
        message: passDetails[0].message,
      });
    }

    // check
    const user = await userModel.findOne({ email, answer });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    // hash password
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// test controller
export const testController = (req, res) => {
  console.log("protected route");
  res.status(200).send({
    success: true,
    message: "Protected Route",
  });
};

// POST UPDATE PROFILE
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);
    // password validation
    if (password && password.length < 6) {
      return res.status(409).json({
        success: false,
        error: "Password is required and 6 character long.",
      });
    }

    // hash password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "Error while updating profile",
      error,
    });
  }
};

// GET ORDERS
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "Error while updating profile",
      error,
    });
  }
};

// GET ALL ORDERS
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "Error while updating profile",
      error,
    });
  }
};

// UPDATE/PUT ORDER STATUS
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      success: true,
      message: "Order Status Updated Successfully.",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "Error while updating order status",
      error,
    });
  }
};
