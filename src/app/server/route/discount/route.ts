// cashモデルのAPIを定義
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';

// PSQL接続情報
const prisma = new PrismaClient();

interface Discount {
	discount_id: number;
	discount_type: string;
}

// getメソッド
export async function GET() {
	try {
		const ret = await prisma.discount.findMany();
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
		const { discount_type }: Discount = await req.json();

		try {
			const newDiscount = await prisma.discount.create({
				data: {
					discount_type,
				},
			});
			return NextResponse.json(newDiscount, { status: 201 });
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
