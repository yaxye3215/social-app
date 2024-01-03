import mongoose from "mongoose";
const postScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
        validate:[  value =>value.length < 500, "Content should less than 500 character"]
    },
    image: {
        type: String,
        default: null
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
}
)

const Post = mongoose.model("Post", postScheme);

export default Post