
import { combineReducers } from 'redux';

import gamesReducer from './gamesReducer';
import currentGameReducer from './currentGameReducer';
import tagsReducer from './tagsReducer';
import currentTagReducer from './currentTagReducer';
import genresReducer from './genresReducer';
import currentGenreReducer from './currentGenreReducer';
import usersReducer from './usersReducer';
import videosReducer from './videosReducer';

const allReducer = combineReducers({
	games        : gamesReducer,
	currentGame  : currentGameReducer,
	tags         : tagsReducer,
	currentTag   : currentTagReducer,
	genres       : genresReducer,
	currentGenre : currentGenreReducer,
	users        : usersReducer,
	videos       : videosReducer
});

export default allReducer;