const mongoose = require("mongoose");
const Joi = require("joi");


const favoriteCharacterSchema = mongoose.Schema({
    marvelID: {
        type: String,
        unique: true,
        required: true,
    }
});

const validateFavoriteCharacter = (favoriteCharacter) => {
    const schema = Joi.object({
        marvelID: Joi.string().required()
    });

    return schema.validate(favoriteCharacter);
};

const FavoriteCharacter = mongoose.model("FavoriteCharacer", favoriteCharacterSchema);


module.exports.FavoriteCharacter = FavoriteCharacter;
module.exports.favoriteCharacterSchema = favoriteCharacterSchema;
module.exports.validateFavoriteCharacter = validateFavoriteCharacter;
