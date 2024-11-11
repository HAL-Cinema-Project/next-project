import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { error } from 'console';

// db接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface Price {
	price_id: number;
	price_sum: number;
	ticket_id: number;
}

// データ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const client = await pool.connect();
	const { id } = params;

	try {
		const ret = await client.query(
			'SELECT * FROM "Price" WHERE price_id = $1',
			[id]
		);
		if (ret.rows.length === 0) {
			return NextResponse.json({ error: 'Price not found' }, { status: 404 });
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

// 更新メソッド
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { price_sum, ticket_id }: Price = await req.json();
		const client = await pool.connect();
		const { id } = params;
		try {
			const query = `
            UPDATE "Price"
            SET price_sum = $1,
			ticket_id = $2
            WHERE price_id = $3
            RETURNING *`;
			const values = [price_sum, ticket_id, id];
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

// 削除メソッド
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		const client = await pool.connect();
		try {
			const query = `
            DELETE FROM "Price"
            WHERE price_id = $1
            RETURNING *`;
			const values = [id];
			const result = await client.query(query, values);
			if (result.rowCount == 0) {
				return NextResponse.json({ error: 'Price not found' }, { status: 404 });
			}
			return NextResponse.json({ message: 'Price deleted successfully' });
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
