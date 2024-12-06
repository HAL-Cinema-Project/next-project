import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Client, Pool } from 'pg';
import pool from '../../PoolClient';

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
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "Cinema"', []);
		return NextResponse.json(ret.rows);
	} catch (error) {
		console.error('Error fetching categories', error);
		return NextResponse.json({ error: 'Error fetching categories' });
	} finally {
		client.release(); // Release the connection
	}
}

// postメソッド
export async function POST(req: NextRequest) {
	const client = await pool.connect();
	try {
		const {
			cinema_region,
			cinema_address,
			cinema_detail,
			cinema_email,
			cinema_tel,
			cinema_image,
		}: Cinema = await req.json();

		const query = `
		INSERT INTO "Cinema" (cinema_region, cinema_address, cinema_detail, cinema_tel, cinema_email, cinema_image)
		VALUES ($1,$2,$3,$4,$5,$6)
		RETURNING *`;
		const values = [
			cinema_region,
			cinema_address,
			cinema_detail,
			cinema_tel,
			cinema_email,
			cinema_image,
		];
		const result = await client.query(query, values);

		return NextResponse.json(result.rows[0], { status: 201 });
	} catch (error) {
		console.error('Error creating category', error);
		return NextResponse.json({ error: 'Error creating category' });
	} finally {
		client.release(); // Release the connection
	}
}
