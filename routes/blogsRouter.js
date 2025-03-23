import express from "express";
import validateBody from "../helper/validateBody.js";
import { createBlogs, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blogsControllers.js";
import { blogsShema } from "../schemas/BlogsSchemas.js";

const blogsRouter = express.Router();

blogsRouter.post('/', validateBody(blogsShema), createBlogs)
blogsRouter.get('/', getBlogs)
blogsRouter.get('/:id', getBlog)
blogsRouter.delete('/:id', deleteBlog)
blogsRouter.patch('/:id', validateBody(blogsShema), updateBlog)

export default blogsRouter;