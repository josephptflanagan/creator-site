import { HYDRATE_GAMES } from '../types';

const gamesReducer = (state = [], action) => {
	switch (action.type) {
		case HYDRATE_GAMES:
			// return array
			return [ ...action.games ];

		default:
			return state;
	}
};

export default gamesReducer;