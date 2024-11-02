// cashmethodモデルのAPIを定義
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';

// PSQL接続情報
const prisma = new PrismaClient();

interface CashMethod {
	method_id: number;
	method: string;
}

// GETメソッドの処理
export async function GET() {
	try {
		const categories = await prisma.cashMethod.findMany();
		return NextResponse.json(categories);
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
		const { method }: CashMethod = await req.json();

		try {
			const newInquiry = await prisma.cashMethod.create({
				data: {
					method,
				},
			});
			return NextResponse.json(newInquiry, { status: 201 });
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
