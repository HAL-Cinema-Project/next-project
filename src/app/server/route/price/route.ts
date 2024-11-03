// priceモデルのAPIを定義
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { resourceLimits } from 'worker_threads';
import { PrismaClient } from '@prisma/client';

// db接続
const prisma = new PrismaClient();

interface Price {
	price_id: number;
	price_sum: number;
	ticket_id: string;
}

// GETメソッドの処理
export async function GET() {
	try {
		const ret = await prisma.price.findMany();
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
		const { price_sum, ticket_id }: Price = await req.json();
		try {
			const newPrice = await prisma.price.create({
				data: {
					price_sum,
					ticket_id,
				},
			});
			return NextResponse.json(newPrice, { status: 201 });
		} catch (error) {
			console.error('Error executing query', error);
			return NextResponse.json(
				{ error: 'Error executing query' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 400 }
		);
	}
}
