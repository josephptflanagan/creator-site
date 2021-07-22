
import { UPDATE_CURRENT_TAG } from '../types';

const currentTagReducer = (state = '', action) => {
	switch (action.type) {
		case UPDATE_CURRENT_TAG:
			return action.tagId;

		default:
			return state;
	}
};

export default currentTagReducer;