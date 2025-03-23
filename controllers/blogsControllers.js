import mongoose from "mongoose";
import { Blogs } from "../services/blogsServices.js";
import { v4 as uuidv4 } from 'uuid';

export async function getBlogs(req, res) {
    try {
        const blogs = await Blogs.find();
        return res.json(blogs)
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}

export async function createBlogs(req, res) {
    try {
       const { name, description, image, category} = req.body;
       const createBlogs = await Blogs.create({
        id: uuidv4(),
        name,
        description,
        image,
        category,
       })
       return res.status(201).json(createBlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}

export async function getBlog(req, res) {
    try {
        const { Types } = mongoose;
        const { id } = req.params;

        const valid = Types.ObjectId.isValid(id);
        if (!valid) {
            return res.status(404).json({ success: false, message: "Invalid ID format" });
        }

        const getBlog = await Blogs.findOne({_id: id});

        if (!getBlog) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        return res.status(200).json({ success: true, message: "Blog find successfully", data: getBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}

export async function deleteBlog(req, res) {
    try {
        const { Types } = mongoose;
        const { id } = req.params;

        const valid = Types.ObjectId.isValid(id);
        if (!valid) {
            return res.status(404).json({ success: false, message: "Invalid ID format" });
        }

        const deleteBlog = await Blogs.findOneAndDelete({_id: id});

        if (!deleteBlog) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        return res.status(200).json({ success: true, message: "Blog delet successfully", data: deleteBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}

export async function updateBlog(req, res) {
    try {
        const { Types } = mongoose;
        const { id } = req.params;

        const valid = Types.ObjectId.isValid(id);
        if (!valid) {
            return res.status(404).json({ success: false, message: "Invalid ID format" });
        }

        const updateBlog = await Blogs.findOneAndUpdate({_id: id}, req.body, {new: true});

        if (!updateBlog) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        return res.status(200).json({ success: true, message: "Blog updateBlog successfully", data: updateBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}