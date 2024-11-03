import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// DB接続
const prisma = new PrismaClient();

interface UserSchedule {
	user_schedule_id: number;
	user_id: string;
	schedule_id: number;
}

// GETメソッドの処理 (全件取得)
export async function GET() {
	try {
		const ret = await prisma.userSchedule.findMany();
		return NextResponse.json(ret);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// POSTメソッドの処理 (複数のINSERTを行う)
export async function POST(req: NextRequest) {
	try {
		// リクエストボディからuser_idと複数のschedule_idを受け取る
		const {
			user_id,
			schedule_ids,
		}: { user_id: string; schedule_ids: number[] } = await req.json();

		// schedule_idsが配列であるかチェック
		if (!Array.isArray(schedule_ids) || schedule_ids.length === 0) {
			return NextResponse.json(
				{ error: 'No schedules provided' },
				{ status: 400 }
			);
		}

		// トランザクションで複数のレコードを挿入
		const insertedRows = await prisma.$transaction(
			schedule_ids.map((schedule_id) =>
				prisma.userSchedule.create({
					data: {
						user_id: user_id,
						schedule_id: schedule_id,
					},
				})
			)
		);

		// 成功した挿入データをレスポンスとして返す
		return NextResponse.json(insertedRows, { status: 201 });
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}
