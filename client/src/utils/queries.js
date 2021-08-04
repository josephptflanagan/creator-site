import gql from 'graphql-tag';

export const QUERY_VIDEO_GAMES = gql`
	{
		game {
			_id
			gameTitle
			gameImgUrl
		}
	}
`;

export const QUERY_VIDEO_GENRES = gql`
	{
		genres {
			_id
			genreName
		}
	}
`;

export const QUERY_VIDEO_TAGS = gql`
	{
		tags {
			_id
			tagName
		}
	}
`;

export const QUERY_VIDEOS = gql`
	{
		videos {
			_id
			videoTitle
			description
			recorded
			videoThumbnailUrl
            videoUrl
			game {
				_id
				gameTitle
				imgUrl
			}
			genres {
				_id
				genreName
			}
			tags {
				_id
				tagName
			}
		}
	}
`;

export const QUERY_USERS = gql`
	{
		users {
			_id
			username
			email
			profilePicUrl
			location
			bio
		}
	}
`;