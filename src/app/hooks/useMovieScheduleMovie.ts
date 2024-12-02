export async function fetchMovieSchedules(movieId: number) {
	const response = await fetch(
		`../server/route/movie_schedule/movie?movie_id=${movieId}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch schedules');
	}
	return response.json();
}
