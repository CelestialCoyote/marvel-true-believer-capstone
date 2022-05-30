const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { Post, validatePost } = require("../models/post");

const auth = require("../middleware/auth");


// GET all posts, sort by most recent to oldest.
router.get('/', async (req, res) => {
    try {
        let posts = await Post.find().sort({ createdAt: -1 });
        if (!posts)
            return res
                .status(400)
                .send('No posts in this collection.');

        return res
            .status(200)
            .send(posts);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// GET all posts, sort by most recent to oldest with psot author data.
router.get('/getPostsAndAuthorData', async (req, res) => {
    try {
        let posts = await Post
                            .find()
                            .populate('userID', 'image userName')
                            .sort({ createdAt: -1 });
        if (!posts)
            return res
                .status(400)
                .send('No posts in this collection.');

        return res
            .status(200)
            .send(posts);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// POST add a new Post to User.posts array.
router.post("/:userID/createPost", auth, async (req, res) => {
    try {
        const { error } = validatePost(req.body);
        if (error)
            return res
                .status(400)
                .send(`Body for post not valid! ${error}`);

        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        let newPost = new Post(req.body);
        await newPost.save();

        user.posts.push(newPost);
        await user.save();

        const token = user.generateAuthToken();

        return res
            .status(200)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(newPost);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// GET all posts by user using the userID.
router.get("/:userID/allPosts", auth, async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);

        if (!user)
            return res
                .status(400)
                .send(`User with id ${req.params.userID} does not exist!`);

        return res
            .status(200)
            .send(user.posts);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// UPDATE a user post by postID, including text and likes.
router.put("/:userID/updatePost/:postID", [auth], async (req, res) => {
    try {
        const { error } = validatePost(req.body);
        if (error)
            return res
                .status(400)
                .send(`Body for post not valid! ${error}`);

        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        let post = await Post.findById(req.params.postID);
        if (!post)
            return res
                .status(400)
                .send(`Post with Objectid ${req.params.postID} does not exist.`);

        post.text = req.body.text;
        post.likes = req.body.likes;
        await post.save();

        return res
            .status(200)
            .send(post);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// DELETE a user post by postID.
router.delete("/:userID/deletePost/:postID", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        user.posts.id(req.params.postID).remove();

        await user.save();

        return res
            .status(200)
            .send(user);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});


module.exports = router;
