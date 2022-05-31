const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { favoriteCharacterSchema } = require("./favoriteCharacter");


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: 2,
        maxLength: 128
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 128
    },
    image: {
        type: String,
        default: "../uploads/images/placeholder_avatar.jpg"
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        minLength: 2,
        maxLength: 128,
        default: "Earth"
    },
    posts: [
        { type: mongoose.Types.ObjectId }
    ],
    favoriteCharacters: [
        { type: favoriteCharacterSchema }
    ],
    favoriteComics: [
        {}
    ],
    favoriteCreators: [
        {}
    ]
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            email: this.email,
            image: this.image,
            firstName: this.firstName,
            lastName: this.lastName,
            location: this.location,
            posts: this.posts,
            favoriteCharacters: this.favoriteCharacters
        },
        process.env.JWT_SECRET
    );
};

const validateUser = (user) => {
    const schema = Joi.object({
        userName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(128).required().email(),
        password: Joi.string().min(8).max(128),
        image: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        location: Joi.string(),
        posts: Joi.array(),
        favoriteCharacters: Joi.array()
    });

    return schema.validate(user);
};

const validateLogin = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(2).max(128).required().email(),
        password: Joi.string().min(8).max(128).required(),
    });

    return schema.validate(req);
};

const User = mongoose.model("User", userSchema);


module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
