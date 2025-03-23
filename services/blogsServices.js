import { model, Schema } from "mongoose";

const blogsSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Blogs = model('Blogs', blogsSchema)