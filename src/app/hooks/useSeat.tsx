'use client';

import { Context, SeatInfoProps } from '@/provider/Provider';
import { useContext } from 'react';

export const useSeat = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const { seatInfo, setSeatInfo, reservedSeatInfo, setReservedSeatInfo } =
		context;

	const toggleSeat = (row: keyof SeatInfoProps, index: number) => {
		setSeatInfo((prevSeatInfo) => {
			const updatedRow = [...prevSeatInfo[row]];
			updatedRow[index] = !updatedRow[index];
			return { ...prevSeatInfo, [row]: updatedRow };
		});
	};
	// console.log(reservedSeatInfo)

	const handleReservedSeatInfo = async (movieId: number): Promise<void> => {
		try {
			const response = await fetch(`../server/route/schedule/movie/${movieId}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const reservedSeats = await response.json();

			const updatedReservedSeatInfo = { ...reservedSeatInfo };

			reservedSeats.forEach((seat: any) => {
				const seatId = seat.seat_id;
				const row = getRow(seatId);
				const index = getIndex(seatId);

				if (updatedReservedSeatInfo[row]) {
					updatedReservedSeatInfo[row][index] = true;
				}
			});

			setReservedSeatInfo(updatedReservedSeatInfo);
		} catch (err) {
			console.error(err);
		}
	};

	const handleReserveSeat = async (
		screenId: number,
		movieId: number,
		timeId: number
	): Promise<void> => {
		try {
			const seatIds: number[] = [];

			// 各行の座席を連結
			const allSeats = Object.values(seatInfo).flat();

			// 各座席の選択状態をチェック
			allSeats.forEach((isSelected, index) => {
				if (isSelected) {
					seatIds.push(index + 1); // インデックスは0始まりなので+1
				}
			});

			const seatData = {
				screen_id: screenId,
				movie_id: movieId,
				seat_id: seatIds,
				time_id: timeId,
			};

			// デバッグ用にseatDataをログ出力
			console.log(seatData);

			const response = await fetch(`../server/route/schedule`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(seatData),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log('Response:', data);
		} catch (err) {
			console.error(err);
		}
	};

	const getRow = (seatId: number): keyof SeatInfoProps => {
		if (seatId <= 22) return 'a';
		if (seatId <= 44) return 'b';
		if (seatId <= 66) return 'c';
		if (seatId <= 84) return 'd';
		if (seatId <= 102) return 'e';
		if (seatId <= 120) return 'f';
		if (seatId <= 138) return 'g';
		if (seatId <= 156) return 'h';
		if (seatId <= 178) return 'i';
		return 'j';
	};

	const getIndex = (seatId: number): number => {
		if (seatId <= 22) return seatId - 1;
		if (seatId <= 44) return seatId - 23;
		if (seatId <= 66) return seatId - 45;
		if (seatId <= 84) return seatId - 67;
		if (seatId <= 102) return seatId - 85;
		if (seatId <= 120) return seatId - 103;
		if (seatId <= 138) return seatId - 121;
		if (seatId <= 156) return seatId - 139;
		if (seatId <= 178) return seatId - 157;
		return seatId - 179;
	};

	return {
		seatInfo,
		setSeatInfo,
		toggleSeat,
		handleReservedSeatInfo,
		handleReserveSeat,
		reservedSeatInfo,
		setReservedSeatInfo,
	};
};
