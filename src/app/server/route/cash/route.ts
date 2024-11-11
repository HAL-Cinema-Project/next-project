// cashモデルのAPIを定義
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';

// PSQL接続情報
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
	database: process.env.DB_NAME,
});

interface Cash {
	movie_id: number;
	price_id: number;
	user_id: number;
	cash_id: number;
	method_id: number;
	discount_id: number;
}

// getメソッド
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "Cash"', []);
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
			movie_id,
			price_id,
			user_id,
			cash_id,
			method_id,
			discount_id,
		}: Cash = await req.json();

		const client = await pool.connect();
		try {
			const query = `
        INSERT INTO "User" (movie_id,price_id,user_id,method_id,discount_id,cash_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`;
			const values = [
				movie_id,
				price_id,
				user_id,
				method_id,
				cash_id,
				discount_id,
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
		console.error('Invalid request payload', error);
		return NextResponse.json(
			{ error: 'Invalid request payload' },
			{ status: 400 }
		);
	}
}
