import {
	HYDRATE_GENRES,
	UPDATE_CURRENT_GENRE,
	HYDRATE_GAMES,
	UPDATE_CURRENT_GAME,
	HYDRATE_TAGS,
	UPDATE_CURRENT_TAG,
	UPDATE_VIDEOS,
	UPDATE_USERS
} from '../types';

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

export const hydrateGames = (games) => {
	return {
		type  : HYDRATE_GAMES,
		games
	};
};

export const updateCurrentGame = (gameId) => {
	return {
		type   : UPDATE_CURRENT_GAME,
		gameId
	};
};

export const hydrateTags = (tags) => {
	return {
		type  : HYDRATE_TAGS,
		tags
	};
};

export const updateCurrentTag = (tagId) => {
	return {
		type   : UPDATE_CURRENT_TAG,
		tagId
	};
};

export const updateVideos = (videos) => {
	return {
		type     : UPDATE_VIDEOS,
		videos
	};
};

export const updateUsers = (users) => {
	return {
		type   : UPDATE_USERS,
		users
	};
};
