// movieモデルのAPIを定義
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

// db接続
const prisma = new PrismaClient();

interface Movie {
	movie_id: number;
	movie_name: string;
	movie_detail: string;
	movie_time: number;
	category_id: number;
	movie_image1: string;
	movie_image2: string;
	movie_cast: string;
	movie_director: string;
}

// GETメソッドの処理
export async function GET() {
	try {
		const ret = await prisma.movie.findMany();
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
			movie_name,
			movie_detail,
			movie_time,
			category_id,
			movie_image1,
			movie_image2,
			movie_cast,
			movie_director,
		}: Movie = await req.json();
		try {
			const newMovie = await prisma.movie.create({
				data: {
					movie_name,
					movie_detail,
					movie_time,
					category_id,
					movie_image1,
					movie_image2,
					movie_cast,
					movie_director,
				},
			});
			return NextResponse.json(newMovie, { status: 201 });
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
