const express = require('express');
const router = express.Router();
const { Character, validateCharacter } = require('../models/character');
const auth = require('../middleware/auth');


// GET all character likes.
router.get('/', async (req, res) => {
    const characterData = [["Character Name", "likes", "id"]];

    try {
        let characters = await Character.find();
        if (!characters)
            return res
                .status(400)
                .send('No characters in this collection.');

        characters.map(like => {
            characterData.push([
                like.marvelName,
                like.likes,
                like.marvelID
            ]);
        });

        return res
            .status(200)
            .send(characterData);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// POST to create a new character with like counter, or update an exist character's like count.
router.post("/characterLike/:marvelID", [auth], async (req, res) => {
    try {
        const { error } = validateCharacter(req.body);
        if (error)
            return res
                .status(400)
                .send(`Body for character not valid! ${error}`);

        let character = await Character.find({ marvelID: { $in: req.params.marvelID } });

        console.log('req.params.marvelID: ', req.params.marvelID);
        console.log('character found: ', character);
        if (character.length == 0) {
            character = new Character(req.body);
            await character.save();
        } else if (character.length == 1) {
            console.log('should add 1 to likes.', character[0].likes);
            character[0].likes = character[0].likes + 1;
            await character[0].save();
        }

        return res
            .status(200)
            .send(character);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});


module.exports = router;
