import express from "express";
import { createPost, deletePost, getPost, updatePost } from "../controller/postController.js";
import { authenticate } from "../middleware/authMiddle.js";


const postRouter = express.Router();

postRouter.post("/create", authenticate,createPost)
postRouter.get("/user", authenticate,getPost)
postRouter.put("/update/:id", authenticate,updatePost)
postRouter.delete("/delete/:id", authenticate,deletePost)



export default postRouter