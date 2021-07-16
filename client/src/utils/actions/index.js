import {
	HYDRATE_GENRES,
	UPDATE_CURRENT_GENRE,
	UPDATE_USERS
} from '../types';

// ACTION USERS -- functions that return actions.  now can dispatch() from component
export const hydrateGenres = (genres) => {
	return {
		type  : HYDRATE_GENRES,
		genres
	};
};

export const updateCurrentGenre = (genreId) => {
	return {
		type   : UPDATE_CURRENT_GENRE,
		genreId
	};
};

export const updateUsers = (users) => {
	return {
		type     : UPDATE_USERS,
		users
	};
};
