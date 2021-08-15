import Profile from "../models/Profile.js";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";

// @route   GET api/profile/me
// @desc    Get user profile
// @access  Private
export const getProfileByMe = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   GET api/profile/:userId
// @desc    Get user profile
// @access  Public
export const getUserProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    })
      .populate("user", ["name", "avatar"])
      .populate("posts");

    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
export const createProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });

    const { status, bio, website, facebook, twitter, linkedin, github } =
      req.body;

    // Build profile object
    const profileField = {};

    profileField.user = req.user.id;
    if (status) profileField.status = status;
    if (bio) profileField.bio = bio;
    if (website) profileField.website = website;

    // if (req.file)
    //   profileField.user.avatar = {
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   };
    profileField.posts = [];
    profileField.bookmarks = [];

    // Build social object
    profileField.social = {};
    profileField.socia = {};
    if (facebook) profileField.social.facebook = facebook;
    if (twitter) profileField.social.twitter = twitter;
    if (linkedin) profileField.social.linkedin = linkedin;
    if (github) profileField.social.github = github;

    // update profile
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileField },
        { new: true }
      ).populate("user", ["name", "avatar"]);
      return res.json(profile);
    }

    // Create profile
    profile = new Profile(profileField);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
};
