
import { UPDATE_CURRENT_GAME } from '../types';

const currentGameReducer = (state = '', action) => {
	switch (action.type) {
		case UPDATE_CURRENT_GAME:
			return action.gameId;

		default:
			return state;
	}
};

export default currentGameReducer;