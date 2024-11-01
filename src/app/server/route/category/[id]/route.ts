import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

// db接続
const prisma = new PrismaClient();

interface Category {
	category_id: number;
	category_name: string;
}

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		// 単一カテゴリの取得
		const category = await prisma.category.findUnique({
			where: { category_id: Number(id) },
		});
		return NextResponse.json(category);
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
		const { category_name }: Category = await req.json();
		const { id } = params;
		try {
			const updatesCategory = await prisma.category.update({
				where: { category_id: Number(id) },
				data: { category_name },
			});
			return NextResponse.json(updatesCategory, { status: 201 });
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

// Deleteメソッド
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		try {
			const query = await prisma.category.delete({
				where: { category_id: Number(id) },
			});
			return NextResponse.json({ message: 'Category deleted successfully' });
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
