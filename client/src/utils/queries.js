import gql from 'graphql-tag';

export const QUERY_VIDEO_GAMES = gql`
	{
		game {
			_id
			name
			imgUrl
		}
	}
`;

export const QUERY_VIDEO_GENRES = gql`
	{
		genres {
			_id
			name
		}
	}
`;

export const QUERY_VIDEO_TAGS = gql`
	{
		tags {
			_id
			name
		}
	}
`;

export const QUERY_VIDEOS = gql`
	{
		videos {
			_id
			title
			description
			recorded
			thumbnailUrl
            videoUrl
			game {
				_id
				name
				imgUrl
			}
			genres {
				_id
				name
			}
			tags {
				_id
				name
			}
		}
	}
`;