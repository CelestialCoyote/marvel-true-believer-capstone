const mongoose = require("mongoose");
const Joi = require("joi");


const favoriteCharacterSchema = mongoose.Schema({
    marvelID: {
        type: String,
        unique: true,
        required: true,
    },
    marvelName: {
        type: String,
        required: true,
        default: ""
    },
    marvelImage: {
        type: String,
        required: true,
        default: ""
    },
    marvelDescription: {
        type: String,
        required: true,
        default: ""
    }
}, {timestamps: true});

const validateFavoriteCharacter = (favoriteCharacter) => {
    const schema = Joi.object({
        marvelID: Joi.string().required(),
        marvelName: Joi.string().required(),
        marvelImage: Joi.string().required(),
        marvelDescription: Joi.string().required(),
    });

    return schema.validate(favoriteCharacter);
};

//const favoriteCharacterSchema = mongoose.Schema({
//    id: {
//        type: String,
//        unique: true,
//        required: true,
//    }
//}, {timestamps: true});

//const validateFavoriteCharacter = (favoriteCharacter) => {
//    const schema = Joi.object({
//        id: Joi.string().required(),
//    });
//
//    return schema.validate(favoriteCharacter);
//};

const FavoriteCharacter = mongoose.model("FavoriteCharacer", favoriteCharacterSchema);


module.exports.FavoriteCharacter = FavoriteCharacter;
module.exports.favoriteCharacterSchema = favoriteCharacterSchema;
module.exports.validateFavoriteCharacter = validateFavoriteCharacter;
