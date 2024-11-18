type MovieSchedule = {
	movie_schedule_id: number;
	movie_id: number;
	screen_id: number;
	cinema_id: number;
	start_time: Date;
	end_time: Date;
};

const fetchMovieScheduleId = async (
	id: number
): Promise<MovieSchedule | null> => {
	try {
		const response = await fetch(`../server/route/movie_schedule/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch movie_schedule');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed fetching movie_schedule data');
		return null;
	}
};
