const mongoose = require("mongoose");
const Joi = require("joi");


const characterSchema = new mongoose.Schema({
    marvelID: {
        type: Number,
        required: true
    },
    marvelName: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

function validateCharacter(character) {
    const schema = Joi.object({
        marvelID: Joi.number().required(),
        marvelName: Joi.string().required(),
        likes: Joi.number()
    });
    return schema.validate(character);
}

const Character = mongoose.model("Character", characterSchema);


exports.characterSchema = characterSchema;
exports.Character = Character;
exports.validateCharacter = validateCharacter;
