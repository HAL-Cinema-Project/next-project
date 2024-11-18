export const fetchMovieSchedule = async () => {
	try {
		const response = await fetch('../server/route/movie_schedule');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch movie_schedule', error);
		return [];
	}
};
