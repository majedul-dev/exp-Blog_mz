import User from "../models/User.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserDetailsById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const signupUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    const avatar = `/uploads/no-image.JPG`;

    if (user) {
      return res.status(400).json({ errors: [{ msg: "Email already exist" }] });
    }
    const newUser = new User({ name, email, password, avatar });

    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ errors: [{ msg: "Invalid credential" }] });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      user.name = req.body.name;
      user.email = req.body.email;
    }

    const updateUser = await user.save();

    res.json({
      id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      user.avatar = req.file && `/uploads/${req.file.filename}`;
    }

    const updateProfilePic = await user.save();
    res.json({ avatar: updateProfilePic.avatar });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { allUsers, signupUser, loginUser, getUserDetailsById, updateUserInfo };
