
const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema({
	gameTitle : {
		type     : String,
		required : true,
		trim     : true
	},
	gameImgUrl : {
		type     : String,
		required : true,
		trim     : true
	}

});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;