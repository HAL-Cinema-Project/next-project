import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import pool from '@/app/server/PoolClient';

interface Inquiry {
	inquiry_id: number;
	inquiry_subject: string;
	inquiry_content: string;
	inquiry_email: string;
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
			'SELECT * FROM "Inquiry" WHERE inquiry_id = $1',
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

// inquiryの更新 (PATCHメソッド)
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const { inquiry_subject, inquiry_content, inquiry_email }: Inquiry =
			await req.json();
		const client = await pool.connect();

		const query = `
		UPDATE "Inquiry"
		SET inquiry_subject = $1,
		inquiry_content = $2,
		inquiry_email = $3,
		WHERE inquiry_id = $9
		RETURNING *`;
		const values = [inquiry_subject, inquiry_content, inquiry_email, id];
		const result = await client.query(query, values);
		return NextResponse.json(result.rows[0], { status: 201 });
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
	const { id } = params;
	const client = await pool.connect();

	try {
		const query = `
		DELETE FROM "Inquiry"
		WHERE inquiry_id = $1
		RETURNING *`;
		const values = [id];
		const result = await client.query(query, values);
		if (result.rowCount == 0) {
			return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
		}
		return NextResponse.json({ message: 'Movie deleted successfully' });
	} catch (error) {
		console.error('Error deleting inquiry', error);
		return NextResponse.json(
			{ error: 'Error deleting inquiry' },
			{ status: 500 }
		);
	}
}
