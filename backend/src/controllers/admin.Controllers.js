import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.Models.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// GENERATE ACCESS AND REFRESH TOKEN

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    // console.log(admin);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

// REGISTER ADMIN

const registerAdmin = asyncHandler(async (req, res) => {
  const { adminName, email, password } = req.body;

  if ([adminName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedAdmin = await Admin.findOne({
    $or: [{ adminName }, { email }],
  });
  if (existedAdmin) {
    throw new ApiError(409, "Admin with email or adminName already exists");
  }

 const profilePicLocalPath = req.files?.profilePicture[0]?.path;


  if (!profilePicLocalPath) {
    throw new ApiError(400, "Profile Picture Local Path not found");
  }
const profilePicture = await uploadOnCloudinary(profilePicLocalPath);
  const admin = await Admin.create({
    profilePicture: profilePicture.url,
    email,
    password,
    adminName,
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );
  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering the admin");
  }

  console.log(`ADMIN ${createdAdmin.adminName} REGISTERED`);

  return res
    .status(201)
    .json(new ApiResponse(200, createdAdmin, "Admin registered successfully"));
});

// LOGIN ADMIN

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, adminName, password } = req.body;

  // console.log(email);
  // console.log("Login Details");
  // console.log(req.body);

  if (!adminName && !email) {
    throw new ApiError(400, "AdminName or email is required");
  }

  const admin = await Admin.findOne({
    $or: [{ adminName }, { email }],
  });
  if (!admin) {
    throw new ApiError(404, "Admin does not exist");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  console.log(`ADMIN ${loggedInAdmin.adminName} LOGGED IN`);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Admin logged in successfully"
      )
    );
});

// LOGOUT ADMIN

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  console.log("ADMIN LOGGED OUT");
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
// REFRESH ACCESS TOKEN

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiErrors(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiErrors(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiErrors(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiErrors(401, error?.message || "Invalid refresh token");
  }
});
// GET CURRENT ADMIN
const getCurrentAdmin = asyncHandler(async (req, res) => {
  try {

    const adminId = req.admin._id;
    const admin = await Admin.findOne({ _id: adminId }).select(
      "-password -createdAt -updatedAt -__v"
    );

    if (!admin) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Admin not found"));
    }

   
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          admin,
          "Admin fetched successfully (excluding sensitive fields)"
        )
      );
  } catch (error) {
    console.error("Error fetching admin:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

// GET PROFILE PIC


export {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  getCurrentAdmin,
};
