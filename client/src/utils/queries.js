import gql from 'graphql-tag';

export const QUERY_GENRES = gql`
	{
		genres {
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