import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface Schedule {
	schedule_id: number;
	screen_id: number;
	movie_id: number;
	seat_id: number;
	time_id: number;
}

// movie_id と time_id を使用して予約座席情報を取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { movie_id: number; time_id: number } }
) {
	const client = await pool.connect();
	const { searchParams } = new URL(req.url);
	const movie_id = searchParams.get('movie_id');
	const time_id = searchParams.get('time_id'); // movie_id と time_id を取得

	try {
		// movie_id と time_id に基づいて予約座席情報を取得するクエリ
		const ret = await client.query<Schedule>(
			'SELECT * FROM "Schedule" WHERE movie_id = $1 AND time_id = $2',
			[movie_id, time_id]
		);
		if (ret.rows.length === 0) {
			// 該当する座席情報がない場合は空の配列を返す
			return NextResponse.json([]);
		}
		// 該当する座席情報を返す
		return NextResponse.json(ret.rows);
	} catch (error) {
		// エラーハンドリング
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	} finally {
		// クライアント接続を解放
		client.release();
	}
}
