// categoryモデルのAPIを定義
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import pool from '../../PoolClient';

interface Category {
	category_id: number;
	category_name: string;
}

// getメソッド
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "Category"', []);
		return NextResponse.json(ret.rows);
	} catch (error) {
		console.error('Error fetching categories', error);
		return NextResponse.json({ error: 'Error fetching categories' });
	}
}

// postメソッド
export async function POST(req: NextRequest) {
	try {
		const { category_name }: Category = await req.json();
		try {
			const client = await pool.connect();

			const query = `
			INSERT INTO "Category" (category_name)
			VALUES ($1,$2,$3,$4,$5,$6)
			RETURNING *`;
			const values = [category_name];
			const result = await client.query(query, values);

			return NextResponse.json(result.rows[0], { status: 201 });
		} catch (error) {
			console.error('Error executing query', error);
			return NextResponse.json(
				{ error: 'Error executing query' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 400 }
		);
	}
}
