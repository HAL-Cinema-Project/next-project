import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Client, Pool } from 'pg';
import pool from '../../PoolClient';

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
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "MovieSchedule"', []);
		return NextResponse.json(ret.rows);
	} catch (error) {
		console.error('Error fetching categories', error);
		return NextResponse.json({ error: 'Error fetching categories' });
	} finally {
		client.release(); // Release the connection
	}
}

// postメソッド
export async function POST(req: NextRequest) {
	const client = await pool.connect();
	try {
		const {
			movie_id,
			screen_id,
			cinema_id,
			start_time,
			end_time,
		}: MovieSchedule = await req.json();

		const query = `
		INSERT INTO "MovieSchedule" (movie_id, screen_id, cinema_id, start_time, end_time,created_at, updated_at)
		VALUES ($1,$2,$3,$4,$5,NOW(),NOW())
		RETURNING *`;
		const values = [movie_id, screen_id, cinema_id, start_time, end_time];
		const result = await client.query(query, values);

		return NextResponse.json(result.rows[0], { status: 201 });
	} catch (error) {
		console.error('Error creating category', error);
		return NextResponse.json({ error: 'Error creating category' });
	} finally {
		client.release(); // Release the connection
	}
}
