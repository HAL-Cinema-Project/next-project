// movieモデルのAPIを定義
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

// db接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	max: 30,
});

interface Movie {
	movie_id: number;
	movie_name: string;
	movie_detail: string;
	movie_time: number;
	category_id: number;
	movie_image1: string;
	movie_image2: string;
	movie_cast: string;
	movie_director: string;
}

// GETメソッドの処理
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "Movie"', []);
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
		const {
			movie_name,
			movie_detail,
			movie_time,
			category_id,
			movie_image1,
			movie_image2,
			movie_cast,
			movie_director,
		}: Movie = await req.json();
		const client = await pool.connect();
		try {
			const query = `
            INSERT INTO "Movie" (movie_name, movie_detail, movie_time, category_id, movie_image1, movie_image2, movie_cast, movie_director)
            VALUES ($1, $2, $3, $4,$5,$6,$7,$8)
            RETURNING *`;
			const values = [
				movie_name,
				movie_detail,
				movie_time,
				category_id,
				movie_image1,
				movie_image2,
				movie_cast,
				movie_director,
			];
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
