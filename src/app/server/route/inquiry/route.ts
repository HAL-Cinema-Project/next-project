import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

//db接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface Inquiry {
	inquiry_id: number;
	inquiry_subject: string;
	inquiry_content: string;
	inquiry_email: string;
}

//getメソッド
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "Inquiry"', []);
		return NextResponse.json(ret.rows);
	} catch (error) {
		console.error('Error fetching categories', error);
		return NextResponse.json({ error: 'Error fetching categories' });
	}
}

// POSTメソッド: Inquiryの新規作成
export async function POST(req: NextRequest) {
	try {
		const { inquiry_subject, inquiry_content, inquiry_email }: Inquiry =
			await req.json();

		const client = await pool.connect();

		const query = `
		INSERT INTO "Inquiry" (inquiry_subject, inquiry_content, inquiry_email)
		VALUES ($1,$2,$3)
		RETURNING *`;
		const values = [inquiry_subject, inquiry_content, inquiry_email];
		const result = await client.query(query, values);

		return NextResponse.json(result.rows[0], { status: 201 });
	} catch (error) {
		console.error('Error creating category', error);
		return NextResponse.json({ error: 'Error creating category' });
	}
}
