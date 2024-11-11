import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { error } from 'console';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface Seat {
	seat_id: number;
	seat_point: string;
}

// データ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const client = await pool.connect();
	const ids = params.id.split(',').map((id) => parseInt(id, 10));

	try {
		const seats = await Promise.all(
			ids.map(async (id) => {
				const ret = await client.query(
					'SELECT * FROM "Seat" WHERE seat_id = $1',
					[id]
				);
				if (ret.rows.length === 0) {
					return null;
				}
				return ret.rows[0];
			})
		);

		const filteredSeats = seats.filter((seat) => seat !== null);

		if (filteredSeats.length === 0) {
			return NextResponse.json({ error: 'seat not found' }, { status: 404 });
		}

		return NextResponse.json(filteredSeats);
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
		const { seat_point }: Seat = await req.json();
		const client = await pool.connect();
		const { id } = params;
		try {
			const query = `
            UPDATE "Seat"
            SET seat_point = $1
            WHERE seat_id = $2
            RETURNING *`;
			const values = [seat_point, id];
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

// deleteメソッド
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		const client = await pool.connect();
		try {
			const query = `
            DELETE FROM "Seat"
            WHERE seat_id = $1
            RETURNING *`;
			const values = [id];
			const result = await client.query(query, values);
			if (result.rowCount == 0) {
				return NextResponse.json({ error: 'Seat not found' }, { status: 404 });
			}
			return NextResponse.json({ message: 'Seat delete successfully' });
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
