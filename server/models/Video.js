
const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoSchema = new Schema({
    videoTitle: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    recorded: {
        type: String,
        required: true,
        trim: true
    },
    videoThumbnailUrl: {
        type: String,
        required: true,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true
    },
    game: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        }
    ],
    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Genre'
        }
    ],
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]

});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;