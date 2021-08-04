
const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
	tagName : {
		type     : String,
		required : true,
		trim     : true
	}
});

const Tag = mongoose.model('Genre', tagSchema);

module.exports = Tag;