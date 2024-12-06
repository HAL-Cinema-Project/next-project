import pool from '@/app/server/PoolClient';
import { PrismaClient } from '@prisma/client';
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

// getメソッド
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const client = await pool.connect();
	const { id } = params;

	try {
		const ret = await client.query(
			'SELECT * FROM "MovieSchedule" WHERE movie_schedule_id = $1',
			[id]
		);
		if (ret.rows.length === 0) {
			return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
		}
		return NextResponse.json(ret.rows[0]);
	} catch (error) {
		console.error('Error fetching inquiry', error);
		return NextResponse.json(
			{ error: 'Error fetching inquiry' },
			{ status: 500 }
		);
	}
}

// inquiryの更新 (PATCHメソッド)
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const {
			movie_id,
			screen_id,
			cinema_id,
			start_time,
			end_time,
			created_at,
			updated_at,
		}: MovieSchedule = await req.json();
		const client = await pool.connect();
		const { id } = params;
		try {
			const query = `
            UPDATE "MovieSchedule"
            SET movie_id = $1,
            screen_id = $2,
            cinema_id = $3,
            start_time = $4,
            end_time = $5
            WHERE movie_schedule_id = $6
            RETURNING *`;
			const values = [movie_id, screen_id, cinema_id, start_time, end_time, id];
			const result = await client.query(query, values);
			return NextResponse.json(result.rows[0], { status: 201 });
		} catch (error) {
			console.error('Error executing query', error);
			return NextResponse.json(
				{ error: 'Error executing query' },
				{ status: 500 }
			);
		} finally {
			client.release();
		}
	} catch (error) {
		console.error('Error updating inquiry', error);
		return NextResponse.json(
			{ error: 'Error updating category' },
			{ status: 500 }
		);
	}
}

// inquiryの削除 (DELETEメソッド)
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		const client = await pool.connect();
		try {
			const query = `
            DELETE FROM "MovieSchedule"
            WHERE movie_schedule_id = $1
            RETURNING *`;
			const values = [id];
			const result = await client.query(query, values);
			if (result.rowCount == 0) {
				return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
			}
			return NextResponse.json({ message: 'Movie deleted successfully' });
		} catch (error) {
			console.error('Error executing query', error);
			return NextResponse.json(
				{ error: 'Error executing query' },
				{ status: 500 }
			);
		} finally {
			client.release();
		}
	} catch (error) {
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 500 }
		);
	}
}
