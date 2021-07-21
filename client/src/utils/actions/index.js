import {
	HYDRATE_GENRES,
	UPDATE_CURRENT_GENRE,
	UPDATE_VIDEOS
} from '../types';

// ACTION VIDEOS -- functions that return actions.  now can dispatch() from component
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

export const updateVideos = (videos) => {
	return {
		type     : UPDATE_VIDEOS,
		videos
	};
};
