import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// db接続
const prisma = new PrismaClient();

// movie_id と time_id を使用して予約座席情報を取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { movie_id: number; time_id: number } }
) {
	const { searchParams } = new URL(req.url);
	const movie_id = parseInt(searchParams.get('movie_id') || '', 10);
	const time_id = parseInt(searchParams.get('time_id') || '', 10);

	if (isNaN(movie_id) || isNaN(time_id)) {
		return NextResponse.json(
			{ error: 'Invalid movie_id or time_id' },
			{ status: 400 }
		);
	}

	try {
		// Prisma で movie_id と time_id に基づいて予約座席情報を取得
		const schedules = await prisma.schedule.findMany({
			where: {
				movie_id: movie_id,
				time_id: time_id,
			},
		});

		if (schedules.length === 0) {
			// 該当する座席情報がない場合は空の配列を返す
			return NextResponse.json([]);
		}

		// 該当する座席情報を返す
		return NextResponse.json(schedules);
	} catch (error) {
		// エラーハンドリング
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}
