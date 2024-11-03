import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// db接続
const prisma = new PrismaClient();

interface Schedule {
	schedule_id: number;
	screen_id: number;
	movie_id: number;
	seat_id: number;
	time_id: number;
	screen_capacity: number; // 追加: screen_capacity を含める
}

// movie_idを使用したデータ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		// Prisma で Schedule と Screen を JOIN し、screen_capacity を取得
		const schedules = await prisma.schedule.findMany({
			where: { screen_id: Number(id) },
			select: {
				schedule_id: true,
				screen_id: true,
				movie_id: true,
				seat_id: true,
				time_id: true,
				screen: {
					select: {
						screen_capacity: true,
					},
				},
			},
		});

		if (schedules.length === 0) {
			return NextResponse.json([]);
		}

		// screen_capacity を含む形にデータを加工
		const formattedSchedules = schedules.map((schedule) => ({
			schedule_id: schedule.schedule_id,
			screen_id: schedule.screen_id,
			movie_id: schedule.movie_id,
			seat_id: schedule.seat_id,
			time_id: schedule.time_id,
			screen_capacity: schedule.screen.screen_capacity,
		}));

		return NextResponse.json(formattedSchedules);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}
