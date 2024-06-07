// cashmethodモデルのAPIを定義
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { Pool } from "pg";


// PSQL接続情報
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME,
});

interface cash {
  movie_id: number;
  price_id: number;
  id:number;
  cash_id:number;
}


// POSTメソッドの処理
export async function POST(req: NextRequest) {
  try {
    const {movie_id,price_id,id,cash_id }: cash =
      await req.json();


    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO "User" (movie_id,price_id,id,cash_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`;
      const values = [movie_id,price_id,id,cash_id];
      const result = await client.query(query, values);
      return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
      console.error("Error executing query", error);
      return NextResponse.json(
        { error: "Error executing query" },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Invalid request payload", error);
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
