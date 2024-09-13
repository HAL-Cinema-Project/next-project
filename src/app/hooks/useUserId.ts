'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type User = {
	user_id: string;
	first_name: string;
	last_name: string;
	schedule_id: number | null;
	e_mail: string;
	password: string;
	birthday: string;
	gender: string;
};

type Schedule = {
	schedule_id: number;
	screen_id: number;
	movie_id: number;
	seat_id: number;
	time_id: number;
	movie: Movie;
	movie_time: MovieTime;
	seat: Seat;
};

type MovieTime = {
	time_id: number;
	movie_start: string;
};

type Seat = {
	seat_id: number;
	seat_point: string;
};

type Movie = {
	movie_id: number;
	movie_name: string;
	movie_image: string;
};

const fetchUserId = async (
	id: String
): Promise<{ user: User; schedules: Schedule[] | null } | null> => {
	try {
		const response = await fetch(`../server/route/user/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch user data');
		}
		const user = await response.json();
		if (user) {
			const scheduleResponse = await fetch('../server/route/schedule');
			if (!scheduleResponse.ok) {
				throw new Error('Failed to fetch schedule data');
			}
			const schedules = await scheduleResponse.json();

			// movie_idからmovieデータを取得
			const movieResponse = await fetch('../server/route/movie');
			if (!movieResponse.ok) {
				throw new Error('Failed to fetch movie data');
			}
			const movie = await movieResponse.json();

			// seat_idからseatデータを取得
			const seatResponse = await fetch('../server/route/seat');
			if (!seatResponse.ok) {
				throw new Error('Failed to fetch seat data');
			}
			const seat = await seatResponse.json();

			// movie_time_idからmovie_timeデータを取得
			const movieTimeResponse = await fetch('../server/route/time');
			if (!movieTimeResponse.ok) {
				throw new Error('Failed to fetch movie time data');
			}
			const movieTime = await movieTimeResponse.json();

			// 各スケジュールに関連するデータを追加
			schedules.forEach((schedule: Schedule) => {
				schedule.movie =
					movie.find((m: Movie) => m.movie_id === schedule.movie_id) || null;
				schedule.seat =
					seat.find((s: Seat) => s.seat_id === schedule.seat_id) || null;
				schedule.movie_time =
					movieTime.find((mt: MovieTime) => mt.time_id === schedule.time_id) ||
					null;
			});

			return { user, schedules };
		} else {
			return { user, schedules: null };
		}
	} catch (error) {
		console.error('Error fetching user data', error);
		return null;
	}
};

const useUserId = () => {
	const [user, setUser] = useState<User | null>(null);
	const [schedules, setSchedules] = useState<Schedule[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | null>('');

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			const idToken = Cookies.get('user_id');
			setUserId(idToken ?? '');
			const userData = await fetchUserId(userId ?? '');
			if (userData) {
				setUser(userData.user);
				setSchedules(userData.schedules);
			} else {
				setError('Failed to fetch user data');
			}
			setLoading(false);
		};

		fetchData();
	}, [userId]);

	return { user, schedules, loading, error };
};

export default useUserId;
