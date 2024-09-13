import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { supabase } from '../../../supabase_index';

const prisma = new PrismaClient();

// db接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface User {
	user_id: string;
	first_name: string;
	last_name: string;
	schedule_id: number;
	e_mail: string;
	password: string;
}

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const client = await pool.connect();
	const { id } = params;

	try {
		const ret = await client.query('SELECT * FROM "User" WHERE user_id = $1', [
			id,
		]);
		if (ret.rows.length === 0) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
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

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { schedule_id }: User = await req.json();
		const client = await pool.connect();
		const { id } = params;
		try {
			const query = `
			UPDATE "User"
			SET schedule_id = $1
			WHERE user_id = $2
			RETURNING *`;
			const values = [schedule_id, id];
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

async function updateUserProfile(newEmail?: string, newPassword?: string) {
	const updates: { email?: string; password?: string } = {};

	if (newEmail) updates.email = newEmail;
	if (newPassword) updates.password = newPassword;

	const { data, error } = await supabase.auth.updateUser(updates);
	if (error) {
		console.error('プロフィール更新エラー:', error.message);
		return null;
	}

	console.log('プロフィールが更新されました:', data);
	return data;
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { e_mail, password } = await req.json();
		const { id } = params;
		const currentUser = await prisma.user.findUnique({
			where: { user_id: id },
		});
		if (!currentUser) {
			return NextResponse.json(
				{ error: 'ユーザーが見つかりません' },
				{ status: 404 }
			);
		}

		const updateData: {
			e_mail?: string;
			password?: string;
		} = {};

		if (e_mail) updateData.e_mail = e_mail;
		if (password) {
			updateData.password = await bcrypt.hash(password, 10);
		}

		const change = await prisma.user.update({
			where: { user_id: id },
			data: updateData,
		});

		const { data, error } = await supabase.auth.updateUser({
			email: e_mail,
			password: password,
		});
		if (error) {
			console.error('プロフィール更新エラー:', error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		} else {
		}

		return NextResponse.json(change, { status: 201 });
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}
