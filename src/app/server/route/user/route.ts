// usersモデルのAPIを定義
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { supabase } from '../../supabase_index';

// PSQL接続情報
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
	database: process.env.DB_NAME,
});

interface User {
	user_id: number;
	first_name: string;
	last_name: string;
	password: string;
	e_mail: string;
	birthday: Date;
	gender: string;
	created_at: Date;
	updated_at: Date;
}

// GETメソッドの処理
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "User"', []);
		return NextResponse.json(ret.rows);
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

// ユーザー登録POSTメソッドの処理
export async function POST(req: NextRequest) {
	try {
		const { first_name, last_name, e_mail, birthday, password, gender }: User =
			await req.json();

		// パスワードのハッシュ化
		const hashedPassword = await bcrypt.hash(password, 10);

		const client = await pool.connect();

		try {
			// SupaBaseにユーザー登録
			const { data, error: signUpError } = await supabase.auth.signUp({
				email: e_mail,
				password: password,
			});
			if (signUpError) {
				throw signUpError;
			}

			const query = `

        INSERT INTO "User" (user_id, first_name, last_name, password, e_mail, birthday, gender, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 

        RETURNING *`;

			const values = [
				data.user?.id,
				first_name,
				last_name,
				hashedPassword,
				e_mail,
				birthday,
				gender,
			];
			const result = await client.query(query, values);

			const ret = NextResponse.json(result.rows[0], { status: 201 });

			return ret;
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
		console.error('Invalid request payload', error);
		return NextResponse.json(
			{ error: 'Invalid request payload' },
			{ status: 400 }
		);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const { first_name, last_name, password, e_mail, birthday, gender }: User =
			await req.json();

		// パスワードのハッシュ化
		const hashedPassword = await bcrypt.hash(password, 10);

		const client = await pool.connect();
		try {
			const query = `
        UPDATE "User" 
        SET first_name = $1, last_name = $2, password = $3, e_mail = $4, birthday = $5
      `;
			const values = [
				first_name,
				last_name,
				password,
				e_mail,
				birthday,
				gender,
			];

			const result = await client.query(query, values);
			return NextResponse.json(result.rows[0], { status: 200 });
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
		console.error('Invalid request payload', error);
		return NextResponse.json(
			{ error: 'Invalid request payload' },
			{ status: 400 }
		);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { user_id }: User = await req.json();

		const client = await pool.connect();
		try {
			const query = `
        DELETE FROM "User" 
        WHERE user_id = $1
        RETURNING *`;
			const values = [user_id];
			const result = await client.query(query, values);
			return NextResponse.json(result.rows[0], { status: 200 });
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
		console.error('Invalid request payload', error);
		return NextResponse.json(
			{ error: 'Invalid request payload' },
			{ status: 400 }
		);
	}
}
