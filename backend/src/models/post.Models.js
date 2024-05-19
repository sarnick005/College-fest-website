import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    content: {
      type: String,
      required: true, // cloudinary url
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    day: {
      type: Number,
      enum: [0, 1, 2],
      required: true,
    },
    year: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
