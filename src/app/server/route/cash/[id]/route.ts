import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { error } from "console";

// db接続
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

interface Cash {
    movie_id: number;
    price_id: number;
    user_id:number;
    cash_id:number;
  }

// データ単体取得
export async function GET(req:NextRequest, { params }: { params: { id: number } }) {
    const client = await pool.connect();
    const { id } = params;

    try{
        const ret = await client.query('SELECT * FROM "Cash" WHERE cash_id = $1',[id]);
        if (ret.rows.length === 0){
            return NextResponse.json({ error: "Cash not found" }, { status: 404 });
        }
        return NextResponse.json(ret.rows[0]);
    } catch (error) {
        console.error("Error executing query", error);
        return NextResponse.json(
            { error: "Error executing query" },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}

// 更新メソッド
export async function PATCH(req:NextRequest, { params }: { params: { id: number } }) {
    try{
        const { movie_id,price_id,user_id,cash_id }: Cash = await req.json();
        const client = await pool.connect();
        const { id } = params;
        try {
            const query = `
            UPDATE "Cash"
            SET movie_id = $1,
            price_id =$2,
            id = $3
            WHERE cash_id = $4
            RETURNING *`;
            const values = [movie_id,price_id,user_id,cash_id , id];
            const result = await client.query(query, values);
            return NextResponse.json(result.rows[0], { status: 201 });
        } catch (error) {
            console.error("Error executing query",error);
            return NextResponse.json(
                { error: "Error executing query" },
                { status: 500 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Invalid request error", error);
        return NextResponse.json(
            { error: "Invalid request error" },
            { status: 400 }
        );
    }
}


// deleteメソッド処理
export async function DELETE(req:NextRequest, { params }: { params: { id: number } }) {
    try{
        const { id } = params;
        const client = await pool.connect();
        try{
            const query =`
            DELETE FROM "CashMethod"
            WHERE method_id = $1
            RETURNING *`;
            const values = [id];
            const result = await client.query(query,values);
            if (result.rowCount == 0) {
                return NextResponse.json(
                    { error: "CashMethod not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json( { message: "CashMethod delete successfully" } );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Invalid request error",error);
        return NextResponse.json(
            { error: "Invalid request error" },
            { status: 500 }
        )
    }
}