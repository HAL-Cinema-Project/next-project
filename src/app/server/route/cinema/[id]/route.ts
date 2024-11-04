import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// db接続
const prisma = new PrismaClient();

interface Cinema {
	cinema_id: number;
	cinema_region: string;
	cinema_address: string;
	cinema_tel: string;
	cinema_email: string;
	cinema_detail: string;
	cinema_image: string;
}

// getメソッド
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const inquiry = await prisma.cinema.findUnique({
			where: { cinema_id: Number(id) },
		});

		return NextResponse.json(inquiry);
	} catch (error) {
		console.error('Error fetching inquiry', error);
		return NextResponse.json(
			{ error: 'Error fetching inquiry' },
			{ status: 500 }
		);
	}
}

// inquiryの更新 (PATCHメソッド)
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const {
			cinema_address,
			cinema_detail,
			cinema_email,
			cinema_image,
			cinema_region,
			cinema_tel,
		}: Cinema = await req.json();

		const updatedInquiry = await prisma.cinema.update({
			where: { cinema_id: Number(id) },
			data: {
				cinema_address,
				cinema_detail,
				cinema_email,
				cinema_image,
				cinema_region,
				cinema_tel,
			},
		});

		return NextResponse.json(updatedInquiry, { status: 201 });
	} catch (error) {
		console.error('Error updating inquiry', error);
		return NextResponse.json(
			{ error: 'Error updating category' },
			{ status: 500 }
		);
	}
}

// inquiryの削除 (DELETEメソッド)
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const deletedinquiry = await prisma.cinema.delete({
			where: { cinema_id: Number(id) },
		});

		return NextResponse.json({ message: 'inquiry deleted successfully' });
	} catch (error) {
		console.error('Error deleting inquiry', error);
		return NextResponse.json(
			{ error: 'Error deleting inquiry' },
			{ status: 500 }
		);
	}
}
