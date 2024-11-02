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
	movie_image1: string;
	movie_image2: string;
	category_id: number;
	movie_cast: string;
	movie_director: string;
}

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const ret = await prisma.movie.findUnique({
			where: { movie_id: Number(id) },
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

// updateメソッド
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
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
		const { id } = params;
		try {
			const updateMovie = await prisma.movie.update({
				where: { movie_id: Number(id) },
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
			return NextResponse.json(updateMovie, { status: 201 });
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

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		try {
			const deleteMovie = await prisma.movie.delete({
				where: { movie_id: Number(id) },
			});
			return NextResponse.json({ message: 'Movie deleted successfully' });
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
			{ status: 500 }
		);
	}
}
