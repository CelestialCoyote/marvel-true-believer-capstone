const mongoose = require("mongoose");
const Joi = require("joi");


const postSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    },
    //date: {
    //    type: Date,
    //    default: Date.now
    //},
    likes: {
        type: Number, default: 0
    }
}, {timestamps: true});

function validatePost(post) {
    const schema = Joi.object({
        userID: Joi.string().required(),
        text: Joi.string().min(2).max(1024).required(),
        likes: Joi.number()
    });
    return schema.validate(post);
}

const Post = mongoose.model("Post", postSchema);


exports.postSchema = postSchema;
exports.Post = Post;
exports.validatePost = validatePost;
