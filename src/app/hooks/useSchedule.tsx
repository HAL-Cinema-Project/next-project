'use client';
import { useState, useEffect } from 'react';

export type Schedule = {
	schedule_id: number;
	availableSeats: number; // 残り座席数
	totalcapacity: number;
	totalReservations: number; // 総予約数
};

export type Screen = {
	screen_id: number;
	screen_capacity: number;
};

// movie_idとtime_idに基づいた予約データを取得
export const fetchReservationData = async (
	movie_id: number,
	time_id: number
) => {
	try {
		const response = await fetch(
			`/server/route/schedule/movie?movie_id=${movie_id}&time_id=${time_id}`
		);
		if (!response.ok) {
			throw new Error('Failed to fetch reservation data');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching reservation data:', error);
		return null;
	}
};

// screen_idに基づいたスクリーンの容量情報を取得
export const fetchScreenData = async (
	screen_id: number
): Promise<Screen | null> => {
	try {
		const response = await fetch(`/server/route/screen/${screen_id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch screen data');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching screen data:', error);
		return null;
	}
};

// スケジュールデータの取得と残席数の計算
export const fetchSchedule = async (
	movie_id: number,
	time_id: number,
	screen_id: number
): Promise<Schedule | null> => {
	try {
		// 予約データとスクリーンの容量データを並行して取得
		const [reservationData, screenData] = await Promise.all([
			fetchReservationData(movie_id, time_id),
			fetchScreenData(screen_id),
		]);

		// データが取得できているか確認
		if (!reservationData || !screenData) {
			console.error('One or more data fetches failed');
			return null;
		}

		// 総容量と予約済みの座席数を確認し、残席数を計算
		const totalcapacity = screenData.screen_capacity;
		const totalReservations = reservationData.length; // 総予約数は予約データの配列の長さと仮定

		console.log(totalReservations);
		const availableSeats = totalcapacity - totalReservations;

		// 残り座席数の計算結果が NaN になっていないか確認
		if (isNaN(totalReservations)) {
			console.error('Calculated available seats is NaN');
			return null;
		}

		// スケジュール情報を返す
		return {
			schedule_id: time_id, // スケジュールIDとしてtime_idを使用
			availableSeats,
			totalcapacity,
			totalReservations,
		};
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
	console.log(schedule.totalReservations);

	return (
		<div>
			{schedule.availableSeats > 0 ? (
				<p>残り {schedule.availableSeats} 席</p>
			) : (
				<p>満席</p>
			)}
		</div>
	);
};

export default SeatAvailability;
