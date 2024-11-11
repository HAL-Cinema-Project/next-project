// screenモデルのAPIを定義
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { resourceLimits } from 'worker_threads';

// db接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface Screen {
	screen_id: number;
	screen_capacity: number;
}

// GETメソッドの処理
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "Screen"', []);
		return NextResponse.json(ret.rows);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	} finally {
		client.release();
	}
}

// POSTメソッドの処理
export async function POST(req: NextRequest) {
	try {
		const { screen_capacity }: Screen = await req.json();
		const client = await pool.connect();
		try {
			const query = `
            INSERT INTO "Screen" (screen_capacity)
            VALUES ($1)
            RETURNING *`;
			const values = [screen_capacity];
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
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 400 }
		);
	}
}
