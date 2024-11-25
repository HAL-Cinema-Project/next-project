'use client';

import { useEffect, useState } from 'react';
import { Schedule } from '../interfaces/scheduleDataInterface';
import { fetchSchedules } from '../hooks/useFetchMovieSchedules';

const useFetchSchedules = () => {
	const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const schedulesData = await fetchSchedules();

			// 必要に応じてデータを整形
			const formattedData: Schedule[] = schedulesData.map(
				(schedule: Schedule) => ({
					schedule_id: schedule.schedule_id,
					screen_id: schedule.screen_id,
					movie_id: schedule.movie_id,
					seat_id: schedule.seat_id,
					time_id: schedule.time_id,
					movie: schedule.movie,
					movie_time: schedule.movie_time,
					seat: schedule.seat,
				})
			);

			setScheduleData(formattedData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return { scheduleData, loading };
};

export default useFetchSchedules;
