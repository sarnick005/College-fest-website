import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/post.Models.js";
import { Admin } from "../models/admin.Models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteImageFromCloudinary } from "../utils/deleteImageFromCloudinary.js";

// GET ALL POSTS

const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find({});
  if (!allPosts.length) {
    return res.status(404).json(new ApiResponse(404, null, "No posts found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { allPosts }, "Posts retrieved successfully"));
});

// PUBLISH  A POST

const publishAPost = asyncHandler(async (req, res) => {
  const { title, description, category, year,day } = req.body;
  if (
    ![title, description, category, year, day].some((field) => field?.trim())
  ) {
    throw new ApiError(
      400,
      "All fields (title, description, category, year) are required"
    );
  }

  const contentFilePath = req.files?.content[0]?.path;
  console.log(contentFilePath);
  if (!contentFilePath) {
    throw new ApiError(400, "Content file is required");
  }

  const contentURL = await uploadOnCloudinary(contentFilePath);
  console.log(contentURL);
  try {
    const post = await Post.create({
      adminId: req.admin._id,
      content: contentURL.url,
      title,
      description,
      category,
      year,
      day,
    });

    const createdPost = await Post.findById(post._id).select("-__v");
    if (!createdPost) {
      throw new ApiError(500, "Something went wrong while creating the post");
    }

    console.log(`POST CREATED`);

    return res
      .status(201)
      .json(new ApiResponse(200, createdPost, "Post created successfully"));
  } catch (error) {
    console.error("Error creating post:", error);
    throw new ApiError(500, "Something went wrong while creating the post");
  }
});

// EDIT A POST

// DELETE A POST
const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json(ApiResponse("No post found with this ID"));
  }
  deleteImageFromCloudinary(post.content);
  const deletedPost = await Post.findByIdAndDelete(postId);
  console.log("Details of a deleted post");
  console.log(deletedPost);
  if (!deletedPost) {
    return res.status(404).json(ApiResponse("No post found with this ID"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedPost, "Details of Deleted Post"));
});

export { getAllPosts, publishAPost, deletePost };
