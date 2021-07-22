import { UPDATE_VIDEOS } from '../types';

const videosReducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_VIDEOS:
			// return array
			return action.videos;


		default:
			return state;
	}
};

export default videosReducer;