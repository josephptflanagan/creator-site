
const mongoose = require('mongoose');

const { Schema } = mongoose;

const genreSchema = new Schema({
	genreName : {
		type     : String,
		required : true,
		trim     : true
	}
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;