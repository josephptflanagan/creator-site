
import { UPDATE_USERS } from '../types';

const usersReducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_USERS:
			// return array
			return action.users;

		// POSSIBLY CREATE NEW ACTION TO HANDLE UPDATE OF INDIVIDUAL USER PROPERTIES

		default:
			return state;
	}
};

export default usersReducer;