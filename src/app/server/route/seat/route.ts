// seatモデルのAPIを定義
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';

// db接続情報
const prisma = new PrismaClient();

interface Seat {
	seat_id: number;
	seat_point: string;
}

// GETメソッドの処理
export async function GET() {
	try {
		const ret = await prisma.seat.findMany();
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
		const { seat_point }: Seat = await req.json();
		try {
			const newSeat = await prisma.seat.create({
				data: {
					seat_point,
				},
			});
			return NextResponse.json(newSeat, { status: 201 });
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
