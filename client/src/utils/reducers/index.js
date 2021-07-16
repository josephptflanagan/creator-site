
import { combineReducers } from 'redux';

import genresReducer from './genresReducer';
import currentGenreReducer from './currentGenreReducer';
import usersReducer from './usersReducer';

const allReducer = combineReducers({
	genres       : genresReducer,
	currentGenre : currentGenreReducer,
	users    : usersReducer,
});

export default allReducer;