import { HYDRATE_GENRES } from '../types';

const genresReducer = (state = [], action) => {
	switch (action.type) {
		case HYDRATE_GENRES:
			// return array
			return [ ...action.genres ];

		default:
			return state;
	}
};

export default genresReducer;