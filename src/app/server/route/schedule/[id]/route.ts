import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { isFunctionDeclaration } from 'typescript';
import pool from '@/app/server/PoolClient';

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
	const client = await pool.connect();
	const { id } = params;

	try {
		const ret = await client.query(
			'SELECT * FROM "Schedule" WHERE schedule_id = $1',
			[id]
		);
		if (ret.rows.length === 0) {
			return NextResponse.json(
				{ error: 'schedule not found' },
				{ status: 404 }
			);
		}
		return NextResponse.json(ret.rows[0]);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	} finally {
		client.release();
	}
}

// 更新メソッド
export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { time_id }: Schedule = await req.json();
		const client = await pool.connect();
		const { id } = params;
		try {
			const query = `
            UPDATE "Schedule"
            SET time_id = $1
            WHERE schedule_id = $2
            RETURNING *`;
			const values = [time_id, id];
			const result = await client.query(query, values);
			return NextResponse.json(result.rows[0], { status: 201 });
		} catch (error) {
			console.error('Error executing query', error);
			return NextResponse.json(
				{ error: 'Error executing query' },
				{ status: 500 }
			);
		} finally {
			client.release();
		}
	} catch (error) {
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 400 }
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
		const client = await pool.connect();
		try {
			// もし削除するIDがなければエラーを返す
			if (!ids || ids.length === 0) {
				return NextResponse.json(
					{ error: 'No schedule ids provided' },
					{ status: 400 }
				);
			}

			// スケジュールの削除処理（複数ID）
			const query = `
				DELETE FROM "Schedule"
				WHERE schedule_id = ANY($1::int[])
				RETURNING *
			`;
			const result = await client.query(query, [ids]);

			// 削除された行がない場合はエラー
			if (result.rowCount === 0) {
				return NextResponse.json(
					{ error: 'No schedules found for the provided ids' },
					{ status: 404 }
				);
			}

			// 成功時のレスポンス
			return NextResponse.json({
				message: 'Schedules deleted successfully',
				deletedSchedules: result.rows,
			});
		} finally {
			client.release();
		}
	} catch (error) {
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 500 }
		);
	}
}
