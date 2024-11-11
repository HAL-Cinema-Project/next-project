import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// db接続
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

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
	const client = await pool.connect();
	const { id } = params;

	try {
		const ret = await client.query<Movie>(
			'SELECT * FROM "Movie" WHERE category_id = $1',
			[id]
		);
		if (ret.rows.length === 0) {
			return NextResponse.json(
				{ error: 'No data found for the given category_id' },
				{ status: 404 }
			);
		}
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
