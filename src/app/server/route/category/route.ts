// categoryモデルのAPIを定義
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

// db接続
const prisma = new PrismaClient();

interface Category {
	category_id: number;
	category_name: string;
}

// getメソッド
export async function GET() {
	try {
		const ret = await prisma.category.findMany();
		return NextResponse.json(ret);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// postメソッド
export async function POST(req: NextRequest) {
	try {
		const { category_name }: Category = await req.json();
		try {
			const query = await prisma.category.create({
				data: { category_name },
			});
			return NextResponse.json(query, { status: 201 });
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
