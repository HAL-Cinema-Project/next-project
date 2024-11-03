import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// db接続
const prisma = new PrismaClient();

interface Schedule {
	schedule_id: number;
	screen_id: number;
	movie_id: number;
	seat_id: number;
	time_id: number;
}

// movie_idを使用したデータ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { time_id: number } } // time_id を正しく受け取る
) {
	const { time_id } = params;

	try {
		// time_idが数値として存在するかを確認
		const schedules = await prisma.schedule.findMany({
			where: { time_id: Number(time_id) }, // time_idをフィルタとして使用
		});
		return NextResponse.json(schedules);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}
