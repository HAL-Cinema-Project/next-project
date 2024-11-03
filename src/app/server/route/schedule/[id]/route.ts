import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// db接続
const prisma = new PrismaClient();

interface Schedule {
	schedule_id: number;
	screen_id: number;
	movie_id: number;
	seat_id: number;
	time_id: number;
}

// データ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const schedule = await prisma.schedule.findUnique({
			where: { schedule_id: Number(id) },
		});
		return NextResponse.json(schedule);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// 更新メソッド
export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { time_id }: Schedule = await req.json();
		const { id } = params;

		const updatedSchedule = await prisma.schedule.update({
			where: { schedule_id: Number(id) },
			data: { time_id },
		});
		return NextResponse.json(updatedSchedule, { status: 201 });
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// DELETEメソッド（複数のSchedule削除）
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { ids: number[] } }
) {
	try {
		const { ids } = params; // 複数の schedule_id を受け取る

		// もし削除するIDがなければエラーを返す
		if (!ids || ids.length === 0) {
			return NextResponse.json(
				{ error: 'No schedule ids provided' },
				{ status: 400 }
			);
		}

		// スケジュールの削除処理（複数ID）
		const deletedSchedules = await prisma.schedule.deleteMany({
			where: {
				schedule_id: { in: ids },
			},
		});

		// 削除された行がない場合はエラー
		if (deletedSchedules.count === 0) {
			return NextResponse.json(
				{ error: 'No schedules found for the provided ids' },
				{ status: 404 }
			);
		}

		// 成功時のレスポンス
		return NextResponse.json({
			message: 'Schedules deleted successfully',
			deletedCount: deletedSchedules.count,
		});
	} catch (error) {
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 500 }
		);
	}
}
