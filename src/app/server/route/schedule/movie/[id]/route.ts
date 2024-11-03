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
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const ret = await prisma.schedule.findMany({
			where: { movie_id: Number(id) },
		});
		if (ret.length === 0) {
			return NextResponse.json([]);
		}
		return NextResponse.json(ret);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}
