import { supabase } from '../../../supabase_index';
import { NextRequest, NextResponse } from 'next/server';

import { Pool } from 'pg';

// PSQL接続情報
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
	database: process.env.DB_NAME,
});

export async function GET(req: NextRequest) {
	try {
		const client = await pool.connect();
		const ret = await client.query('SELECT * FROM "User" WHERE user_id = $1');
		return NextResponse.json(ret.rows);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// サインインPOSTメソッドの処理
export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const { email, password } = await req.json();
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		const { session } = data;

		if (!session) {
			return NextResponse.json({ error: 'Session not found' }, { status: 500 });
		}
		const response = NextResponse.json({ message: 'success' }, { status: 200 });

		response.cookies.set('access_token', session.access_token, {
			httpOnly: true,
			secure: true,
			path: '/',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7日間の有効期限
			maxAge: 7 * 24 * 60 * 60,
		});

		response.cookies.set('refresh_token', session.refresh_token, {
			httpOnly: true,
			secure: true,
			path: '/',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7日間の有効期限
			maxAge: 7 * 24 * 60 * 60,
		});

		response.cookies.set('user_id', session.user.id, {
			httpOnly: false,
			secure: true,
			path: '/',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7日間の有効期限
			maxAge: 7 * 24 * 60 * 60,
		});

		return response;
	} catch (error) {
		console.error('Invalid request payload', error);
		return NextResponse.json(
			{ error: 'Invalid request payload' },
			{ status: 400 }
		);
	}
}
