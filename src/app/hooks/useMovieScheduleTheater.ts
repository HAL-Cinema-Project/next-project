export async function fetchCinemaSchedules(cinema_id: number) {
	const response = await fetch(
		`../server/route/movie_schedule/theater/${cinema_id}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch schedules');
	}
	return response.json();
}
