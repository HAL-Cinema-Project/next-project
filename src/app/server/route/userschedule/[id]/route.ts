import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// db接続
const prisma = new PrismaClient();

interface UserSchedule {
	user_schedule_id: number;
	user_id: string;
	schedule_id: number;
}

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		// user_schedule_idが一意である前提で取得
		const ret = await prisma.userSchedule.findUnique({
			where: {
				user_schedule_id: Number(id),
			},
		});

		if (!ret) {
			// データが見つからない場合のエラーレスポンス
			return NextResponse.json(
				{ error: 'UserSchedule not found' },
				{ status: 404 }
			);
		}

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
	{ params }: { params: { id: string } }
) {
	try {
		const { user_id, schedule_id }: UserSchedule = await req.json();
		const { id } = params;
		try {
			const updatedInquiry = await prisma.userSchedule.update({
				where: { user_schedule_id: Number(id) },
				data: { user_id, schedule_id },
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

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		try {
			const deletedinquiry = await prisma.userSchedule.delete({
				where: { user_schedule_id: Number(id) },
			});
			return NextResponse.json({
				message: 'UserSchedule deleted successfully',
			});
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
