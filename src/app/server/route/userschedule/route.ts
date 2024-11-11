import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// DB接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface UserSchedule {
	user_schedule_id: number;
	user_id: number;
	schedule_id: number;
}

// GETメソッドの処理 (全件取得)
export async function GET() {
	const client = await pool.connect();
	try {
		const ret = await client.query('SELECT * FROM "UserSchedule"', []);
		return NextResponse.json(ret.rows);
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

		const client = await pool.connect();
		try {
			// トランザクションを開始
			await client.query('BEGIN');

			// すべてのschedule_idに対してINSERTを行う
			const insertedRows = [];
			for (const schedule_id of schedule_ids) {
				const query = `
					INSERT INTO "UserSchedule" (user_id, schedule_id)
					VALUES ($1, $2)
					RETURNING *`;
				const values = [user_id, schedule_id];
				const result = await client.query(query, values);
				insertedRows.push(result.rows[0]);
			}

			// トランザクションをコミット
			await client.query('COMMIT');

			// 成功した挿入データをレスポンスとして返す
			return NextResponse.json(insertedRows, { status: 201 });
		} catch (error) {
			// エラーが発生した場合はロールバック
			await client.query('ROLLBACK');
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
