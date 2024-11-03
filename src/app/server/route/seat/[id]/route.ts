import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

// db接続
const prisma = new PrismaClient();

interface Seat {
	seat_id: number;
	seat_point: string;
}

// データ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const ids = params.id.split(',').map((id) => parseInt(id, 10));

	try {
		const seats = await prisma.seat.findMany({
			where: {
				seat_id: { in: ids },
			},
		});

		if (seats.length === 0) {
			return NextResponse.json({ error: 'seat not found' }, { status: 404 });
		}

		return NextResponse.json(seats);
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
		const { seat_point }: Seat = await req.json();
		const { id } = params;

		const updatedSeat = await prisma.seat.update({
			where: { seat_id: id },
			data: { seat_point },
		});

		return NextResponse.json(updatedSeat, { status: 201 });
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// deleteメソッド
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;

		const deletedSeat = await prisma.seat.delete({
			where: { seat_id: id },
		});

		return NextResponse.json({
			message: 'Seat deleted successfully',
			deletedSeat,
		});
	} catch (error) {
		console.error('Error executing query', error);

		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}
