import { HYDRATE_TAGS } from '../types';

const tagsReducer = (state = [], action) => {
	switch (action.type) {
		case HYDRATE_TAGS:
			// return array
			return [ ...action.tags ];

		default:
			return state;
	}
};

export default tagsReducer;