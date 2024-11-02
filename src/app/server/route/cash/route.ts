// cashモデルのAPIを定義
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

// PSQL接続情報
const prisma = new PrismaClient();

interface Cash {
	movie_id: number;
	price_id: number;
	user_id: number;
	cash_id: number;
	method_id: number;
	discount_id: number;
}

// getメソッド
export async function GET() {
	try {
		const ret = await prisma.cash.findMany();
		return NextResponse.json(ret);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// POSTメソッドの処理
export async function POST(req: NextRequest) {
	try {
		const {
			movie_id,
			price_id,
			user_id,
			cash_id,
			method_id,
			discount_id,
		}: Cash = await req.json();

		try {
			const query = `
        INSERT INTO "User" (movie_id,price_id,user_id,method_id,discount_id,cash_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`;
			const values = [
				movie_id,
				price_id,
				user_id,
				method_id,
				cash_id,
				discount_id,
			];
			return NextResponse.json({ status: 201 });
		} catch (error) {
			console.error('Error executing query', error);
			return NextResponse.json(
				{ error: 'Error executing query' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Invalid request payload', error);
		return NextResponse.json(
			{ error: 'Invalid request payload' },
			{ status: 400 }
		);
	}
}
