const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Genre {
		_id: ID
		name: String
	}

    type Game {
		_id: ID
		name: String
		gameImgUrl: String
	}

	type Tag {
		_id: ID
		name: String
	}

	type Video {
		_id: ID
		title: String
		description: String
		game: Game
		recorded: String
		thumbnailUrl: String
		videoUrl: String
		genres: [Genre]
		tags: [Tag]
	}

    type User {
        _id: ID
        username: String
        email: String
        profilePicUrl: String
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

		addGenre(name: String!): Genre
		removeGenre(name: String!): Genre

		addGame(name: String!): Game
		removeGame(name: String!): Game

		addTag(name: String!): Tag
		removeTag(name: String!): Tag

		updateUserUsername(username: String!): User
		updateUserEmail(email: String!): User
		updateUserBio(bio: String!): User
        updateUserLocation(location: String!): User
		updateUserSubscription(subscription: Boolean!): User
		updateUserAuthority(authority: String!): User

		updateVideoTitle(title:String!): Video
		updateVideoDescription(description:String!): Video
		updateVideoRecorded(recorded:String!): Video
		updateVideoGame(game:ID!): Video
		updateVideoGenres(genres:[ID]!): Video
		updateVideoTags(tags:[ID]!): Video

        uploadProfilePic(file: Upload!): User

		uploadGameImg(file: Upload!): Game

		uploadVideoThumbnail(file: Upload!): Video
        uploadVideo(file: Upload!): Video
  }
`;

module.exports = typeDefs;