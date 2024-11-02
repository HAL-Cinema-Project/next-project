// screenモデルのAPIを定義
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

// db接続
const prisma = new PrismaClient();

interface Screen {
	screen_id: number;
	screen_capacity: number;
}

// GETメソッドの処理
export async function GET() {
	try {
		const ret = await prisma.screen.findMany();
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
		const { screen_capacity }: Screen = await req.json();
		try {
			const newScreen = await prisma.screen.create({
				data: {
					screen_capacity,
				},
			});
			return NextResponse.json(newScreen, { status: 201 });
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
