const express = require('express');
const router = express.Router();

const { User } = require('../models/user');
const { Character, validateCharacter } = require('../models/character');

const auth = require('../middleware/auth');


// GET all character likes.
router.get('/', async (req, res) => {
    try {
        let characters = await Character.find();
        if (!characters)
            return res
                .status(400)
                .send('No characters in this collection.');

        return res
            .status(200)
            .send(characters);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// UPDATE a character like count, including text and likes.
router.post("/characterLike/:marvelID", [auth], async (req, res) => {
    try {
        const { error } = validateCharacter(req.body);
        if (error)
            return res
                .status(400)
                .send(`Body for character not valid! ${error}`);

        let newCharacter = new Character(req.body);
        await newCharacter.save();

        return res
            .status(200)
            .send(newCharacter);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// UPDATE a character like count, including text and likes.
router.post("/:userID/updatePost/:postID", [auth], async (req, res) => {
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
