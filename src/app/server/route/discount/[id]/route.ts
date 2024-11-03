import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { PrismaClient } from '@prisma/client';

// db接続
const prisma = new PrismaClient();

interface Discount {
	discount_id: number;
	discount_type: string;
}

// データ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const ret = await prisma.discount.findUnique({
			where: {
				discount_id: Number(id),
			},
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

// 更新メソッド
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { discount_id, discount_type }: Discount = await req.json();
		const { id } = params;
		try {
			const updatedDiscount = await prisma.discount.update({
				where: { discount_id: Number(id) },
				data: { discount_type },
			});
			return NextResponse.json(updatedDiscount, { status: 201 });
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

// deleteメソッド処理
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		try {
			const deletedinquiry = await prisma.discount.delete({
				where: { discount_id: Number(id) },
			});
			return NextResponse.json({ message: 'Discount delete successfully' });
		} catch (error) {
			console.error('Error deleting inquiry', error);
			return NextResponse.json(
				{ error: 'Error deleting inquiry' },
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
