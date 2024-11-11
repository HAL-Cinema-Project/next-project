import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

// db接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface Category {
	category_id: number;
	category_name: string;
}

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const client = await pool.connect();
	const { id } = params;

	try {
		const ret = await client.query(
			'SELECT * FROM "Category" WHERE category_id = $1',
			[id]
		);
		if (ret.rows.length === 0) {
			return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
		}
		return NextResponse.json(ret.rows[0]);
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

// updateメソッド
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { category_name }: Category = await req.json();
		const { id } = params;
		try {
			const client = await pool.connect();
			const { id } = params;
			try {
				const query = `
				UPDATE "Category"
				SET category_name = $1,
				WHERE movie_id = $9
				RETURNING *`;
				const values = [category_name, id];
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

// Deleteメソッド
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		const client = await pool.connect();
		try {
			const query = `
            DELETE FROM "Category"
            WHERE category_id = $1
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
