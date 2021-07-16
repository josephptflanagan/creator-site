const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Genre {
		_id: ID
		name: String
	}

    type Game {
		_id: ID
		name: String
	}

	type Video {
		_id: ID
		title: String
		description: String
		game: String
		recorded: String
		imgUrl: String
		videoUrl: String
		genres: [Genre]
	}

    type User {
        _id: ID
        username: String
        email: String
        imgUrl: String
        bio: String
        location: String
        subscrition: Boolean
        authority: String        
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

	type Auth {
		token: ID
		user: User
	}

	type Query {
		genres: [Genre]
		videos: [Video]
        games: [Game]
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
        removeUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		updateUserBio(bio: String!): User
		updateUserUsername(username: String!): User
		updateUserEmail(email: String!): Creator
        updateCreatorLocation(location: String!): Creator
        uploadImg(file: Upload!): Creator
        uploadVideo(file: Upload!): Creator
  }
`;

// type Mutation {
//   singleUploadStream(file: Upload!): File!
// }


module.exports = typeDefs;