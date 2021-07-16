import gql from 'graphql-tag';

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const UPDATE_USER_USERNAME = gql`
	mutation updateUserUsername($username: String!) {
		updateUserUsername(username: $username) {
			_id
			username
			email
			imgUrl
			location
			bio
		}
	}
`;

export const UPDATE_USER_EMAIL = gql`
	mutation updateUserEmail($email: String!) {
		updateUserEmail(email: $email) {
			_id
			username
			email
			imgUrl
			location
			bio
		}
	}
`;

export const UPDATE_USER_BIO = gql`
	mutation updateUserBio($bio: String!) {
		updateUserBio(bio: $bio) {
			_id
			username
			email
			imgUrl
			location
			bio
		}
	}
`;

export const UPDATE_USER_LOCATION = gql`
	mutation updateUserLocation($location: String!) {
		updateUserLocation(location: $location) {
			_id
			username
			email
			imgUrl
			location
			bio
		}
	}
`;



export const UPLOAD_VIDEO = gql`
	mutation uploadVideo($file: Upload!) {
		uploadVideo(file: $file) {
            _id
			title
			description
            game
			recording
			thumbnailUrl
            VideoUrl
			genres {
				_id
				name
			}
		}
	}
`;

export const UPDATE_VIDEO_GENRES = gql`
	mutation updateVideoGenres($genres: [ID]!) {
		updateVideoGenres(genres: $genres) {
			_id
			title
			description
            game
			recording
			thumbnailUrl
            VideoUrl
			genres {
				_id
				name
			}
		}
	}
`;

export const UPDATE_VIDEO_THUMBNAIL = gql`
	mutation updateVideoThumbnail($file: Upload!) {
		updateVideoThumbnail(file: $file) {
			_id
			title
			description
            game
			recording
			thumbnailUrl
            VideoUrl
			genres {
				_id
				name
			}
		}
	}
`;