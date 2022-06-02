require('dotenv').config();
const connectDb = require('./db/db');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const charactersRouter = require('./routes/characters');
const express = require('express');
const cors = require('cors');
const app = express();

const fs = require('fs');
const path = require('path');

connectDb();

app.use(cors());
app.use(express.json());
app.use(`/api/users`, usersRouter);
app.use(`/api/posts`, postsRouter);
app.use(`/api/characters`, charactersRouter);

// images endpoint to upload them. Allows frontend to statically display images
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });

        if (res.headerSent) {
            return next(error);
        }
    }
});

const port = process.env.PORT || 3015;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
