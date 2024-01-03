import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    

    try {
        const currentUser = req.user._id;
        // console.log(`currentUser: ${currentUser}`);
        const {title,  description, image}= req.body; 
        const post = new Post({
            title: title,
            description: description,
            image: image,
            author: currentUser,
        });
        await post.save();
        
        return res.status(201).json(post);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

// update post
export const updatePost = async (req, res) => {
    const id = req.params.id;
    const {title,  description, image}= req.body;

    try {
        const post = await Post.findByIdAndUpdate(id, {
            title: title,
            description: description,
            image: image
        }, { new: true })
        if (!post) return res.status(404).send('Post not found');

       await post.save();

        return res.status(200).json(post);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
        
    }
    
}


// delete post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
      const post =  await Post.findByIdAndDelete(id)
        if (!post) return res.status(400).send("Not Found post");
        return res.status(200).json({message: "Post deleted"});
    } catch (error) {
     console.log(error.message);
     return res.status(400).json({message: error.message});
        
    }
}


// get post

export const getPost = async (req, res) => {
    try {
        const posts = await Post.find({author: req.user._id}).populate({
            path: "author",
            model: "User",
            select: "name email"
        }).sort({createdAt: -1});
      return  res.status(200).json(posts);

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message:error.message});
    }
}