import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// db接続情報
const prisma = new PrismaClient();

interface Schedule {
	schedule_id: number;
	screen_id: number;
	movie_id: number;
	seat_id: number[];
	time_id: number;
}

// GETメソッドの処理
export async function GET() {
	try {
		const schedules = await prisma.schedule.findMany();
		return NextResponse.json(schedules);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// POSTメソッドの処理
export async function POST(req: NextRequest) {
	try {
		const {
			screen_id,
			movie_id,
			seat_id,
			time_id,
		}: {
			screen_id: number;
			movie_id: number;
			seat_id: number[];
			time_id: number;
		} = await req.json();

		try {
			// トランザクションを開始して複数のレコードを一括作成
			const results = await prisma.$transaction(
				seat_id.map((seatId) =>
					prisma.schedule.create({
						data: {
							screen_id,
							movie_id,
							seat_id: seatId,
							time_id,
						},
					})
				)
			);

			return NextResponse.json(results, { status: 201 });
		} catch (error) {
			console.error('Error executing queries', error);
			return NextResponse.json(
				{ error: 'Error executing queries' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 400 }
		);
	}
}
