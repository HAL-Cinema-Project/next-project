import { useState, useEffect } from 'react';

export type Schedule = {
	schedule_id: number;
	totalcapacity: number;
};

// Function to fetch schedule data based on movie_id
export const fetchMovieData = async (movie_id: number) => {
	try {
		const response = await fetch(`/server/route/schedule/movie/${movie_id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch movie data');
		}
		const data = await response.json();
		console.log('Movie data:', data); // デバッグ用
		return data;
	} catch (error) {
		console.error('Error fetching movie data:', error);
		return null;
	}
};

// Function to fetch screen data based on time_id
export const fetchTimeData = async (time_id: number) => {
	try {
		const response = await fetch(`/server/route/schedule/time/${time_id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch screen data');
		}
		const data = await response.json();
		console.log('Time data:', data); // デバッグ用
		return data;
	} catch (error) {
		console.error('Error fetching screen data:', error);
		return null;
	}
};

export const fetchScreenData = async (screen_id: number) => {
	try {
		const response = await fetch(`/server/route/schedule/screen/${screen_id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch screen data');
		}
		const data = await response.json();
		console.log('Screen data:', data); // デバッグ用
		return data;
	} catch (error) {
		console.error('Error fetching screen data:', error);
		return null;
	}
};

// Function to fetch and combine schedule data
export const fetchSchedule = async (
	movie_id: number,
	time_id: number,
	screen_id: number
): Promise<Schedule | null> => {
	try {
		const movieData = await fetchMovieData(movie_id);
		const timeData = await fetchTimeData(time_id);
		const screenData = await fetchScreenData(screen_id);

		// データが取得できているか確認
		if (!movieData || !timeData || !screenData) {
			console.error('One or more data fetches failed');
			return null;
		}

		// screen_capacity や totalReservations の存在を確認し、NaNを回避
		const totalcapacity = screenData.screen_capacity ?? 0;
		const totalReservations = movieData.totalReservations ?? 0;

		console.log(
			'totalcapacity:',
			totalcapacity,
			'totalReservations:',
			totalReservations
		); // デバッグ用

		const availableSeats = totalcapacity - totalReservations;

		if (isNaN(availableSeats)) {
			console.error('Calculated available seats is NaN');
			return null;
		}

		return { schedule_id: availableSeats, totalcapacity };
	} catch (error) {
		console.error('Error fetching schedule:', error);
		return null;
	}
};

export const SeatAvailability = ({
	movie_id,
	time_id,
	screen_id,
}: {
	movie_id: number;
	time_id: number;
	screen_id: number;
}) => {
	const [schedule, setSchedule] = useState<Schedule | null>(null);

	useEffect(() => {
		const loadSchedule = async () => {
			const fetchedSchedule = await fetchSchedule(movie_id, time_id, screen_id);
			if (fetchedSchedule) {
				setSchedule(fetchedSchedule);
			} else {
				console.error('Failed to fetch schedule data');
				setSchedule(null);
			}
		};
		loadSchedule();
	}, [movie_id, time_id, screen_id]);

	if (!schedule) {
		return <div>座席情報を取得中...</div>;
	}

	return (
		<div>
			{schedule.schedule_id !== null ? (
				schedule.schedule_id === 0 ? (
					<p>満席</p>
				) : (
					<p>残り {schedule.schedule_id} 席</p>
				)
			) : (
				<p>座席情報がありません</p>
			)}
		</div>
	);
};

export default SeatAvailability;
