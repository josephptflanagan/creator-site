
import { UPDATE_CURRENT_GENRE } from '../types';

const currentGenreReducer = (state = '', action) => {
	switch (action.type) {
		case UPDATE_CURRENT_GENRE:
			return action.genreId;

		default:
			return state;
	}
};

export default currentGenreReducer;