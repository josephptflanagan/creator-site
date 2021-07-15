
const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    game: {
        type: String,
        required: true,
        trim: true
    },
    recorded: {
        type: String,
        required: true,
        trim: true
    },

    thumbnailUrl: {
        type: String,
        required: true,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true
    },
    genre: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Genre'
        }
    ]
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;