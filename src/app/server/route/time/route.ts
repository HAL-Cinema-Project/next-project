import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

//db接続
const prisma = new PrismaClient();

interface MovieTime {
	time_id: number;
	movie_start: string;
}

// GETメソッドの処理
export async function GET() {
	try {
		const ret = await prisma.movieTime.findMany();
		return NextResponse.json(ret);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const { movie_start }: MovieTime = await req.json();
		try {
			const newTime = await prisma.movieTime.create({
				data: {
					movie_start,
				},
			});
			return NextResponse.json(newTime, { status: 201 });
		} catch (error) {
			console.error('Error executing error', error);
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
