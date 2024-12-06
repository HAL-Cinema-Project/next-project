import pool from '@/app/server/PoolClient';
import { NextRequest, NextResponse } from 'next/server';

interface MovieSchedule {
	movie_schedule_id: number;
	movie_id: number;
	screen_id: number;
	cinema_id: number;
	start_time: Date;
	end_time: Date;
	created_at: Date;
	updated_at: Date;
}

export async function GET(
	req: NextRequest,
	{ params }: { params: { cinema_id: number } }
) {
	const client = await pool.connect();
	const { cinema_id } = params;

	try {
		const ret = await client.query(
			'SELECT * FROM "MovieSchedule" WHERE cinema_id = $1',
			[cinema_id]
		);
		if (ret.rows.length === 0) {
			return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
		}
		return NextResponse.json(ret.rows[0]);
	} catch (error) {
		console.error('Error fetching MovieSchedule', error);
		return NextResponse.json(
			{ error: 'Error fetching MovieSchedule' },
			{ status: 500 }
		);
	}
}
