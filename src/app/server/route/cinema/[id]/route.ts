import pool from '@/app/server/PoolClient';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Cinema {
	cinema_id: number;
	cinema_region: string;
	cinema_address: string;
	cinema_tel: string;
	cinema_email: string;
	cinema_detail: string;
	cinema_image: string;
}

// getメソッド
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const client = await pool.connect();
	const { id } = params;

	try {
		const ret = await client.query(
			'SELECT * FROM "Cinema" WHERE cinema_id = $1',
			[id]
		);
		if (ret.rows.length === 0) {
			return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
		}
		return NextResponse.json(ret.rows[0]);
	} catch (error) {
		console.error('Error fetching inquiry', error);
		return NextResponse.json(
			{ error: 'Error fetching inquiry' },
			{ status: 500 }
		);
	}
}

// inquiryの更新 (PATCHメソッド)
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const {
			cinema_address,
			cinema_detail,
			cinema_email,
			cinema_image,
			cinema_region,
			cinema_tel,
		}: Cinema = await req.json();
		const client = await pool.connect();
		const { id } = params;
		try {
			const query = `
            UPDATE "Movie"
            SET cinema_region = $1,
            cinema_address = $2,
            cinema_detail = $3,
            cinema_email = $4,
			cinema_tel = $5,
			cinema_image = $6,
            WHERE cinema_id = $7
            RETURNING *`;
			const values = [
				cinema_region,
				cinema_address,
				cinema_detail,
				cinema_email,
				cinema_tel,
				cinema_image,
				id,
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
		console.error('Error updating inquiry', error);
		return NextResponse.json(
			{ error: 'Error updating category' },
			{ status: 500 }
		);
	}
}

// inquiryの削除 (DELETEメソッド)
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		const client = await pool.connect();
		try {
			const query = `
            DELETE FROM "Cinema"
            WHERE cinema_id = $1
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
