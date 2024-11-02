import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { PrismaClient } from '@prisma/client';

// db接続
const prisma = new PrismaClient();

interface CashMethod {
	method_id: number;
	method: string;
}

// データ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const inquiry = await prisma.cashMethod.findUnique({
			where: { method_id: Number(id) },
		});
		return NextResponse.json(inquiry);
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
		const { method }: CashMethod = await req.json();
		const { id } = params;
		try {
			const updatedInquiry = await prisma.cashMethod.update({
				where: { method_id: Number(id) },
				data: { method },
			});
			return NextResponse.json(updatedInquiry, { status: 201 });
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
			const deletedinquiry = await prisma.cashMethod.delete({
				where: { method_id: Number(id) },
			});
			return NextResponse.json({ message: 'CashMethod delete successfully' });
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
