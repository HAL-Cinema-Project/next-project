// cashmethodモデルのAPIを定義
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import pool from '../../PoolClient';

interface CashMethod {
	method_id: number;
	method: string;
}

// GETメソッドの処理
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "CashMethod"', []);
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
		const { method }: CashMethod = await req.json();

		const client = await pool.connect();
		try {
			const query = `
        INSERT INTO "CashMethod" (method) 
        VALUES ($1) 
        RETURNING *`;
			const values = [method];
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
