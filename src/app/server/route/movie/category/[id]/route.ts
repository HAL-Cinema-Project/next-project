import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

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
}

// category_idを基にmovie取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const ret = await prisma.movie.findMany({
			where: { category_id: Number(id) },
		});
		return NextResponse.json(ret);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}
