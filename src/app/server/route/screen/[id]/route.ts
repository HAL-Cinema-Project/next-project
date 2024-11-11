import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { error } from 'console';

// db接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface Screen {
	screen_id: number;
	screen_capacity: number;
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
			'SELECT * FROM "Screen" WHERE screen_id = $1',
			[id]
		);
		if (ret.rows.length === 0) {
			return NextResponse.json({ error: 'Screen not found' }, { status: 404 });
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
		const { screen_capacity }: Screen = await req.json();
		const client = await pool.connect();
		const { id } = params;
		try {
			const query = `
            UPDATE "Screen"
            SET screen_capacity = $1
            WHERE screen_id = $2
            RETURNING *`;
			const values = [screen_capacity, id];
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
            DELETE FROM "Screen"
            WHERE screen_id = $1
            RETURNING *`;
			const values = [id];
			const result = await client.query(query, values);
			if (result.rowCount == 0) {
				return NextResponse.json(
					{ error: 'Screen not found' },
					{ status: 404 }
				);
			}
			return NextResponse.json({ message: 'Screen deleted successfully' });
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
