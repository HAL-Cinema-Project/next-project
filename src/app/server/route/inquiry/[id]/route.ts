import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Inquiry {
	inquiry_id: number;
	inquiry_subject: string;
	inquiry_content: string;
	inquiry_email: string;
}

// getメソッド
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const { id } = params;

	try {
		const inquiry = await prisma.inquiry.findUnique({
			where: { inquiry_id: Number(id) },
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
		const { inquiry_subject, inquiry_content, inquiry_email }: Inquiry =
			await req.json();

		const updatedInquiry = await prisma.inquiry.update({
			where: { inquiry_id: Number(id) },
			data: { inquiry_subject, inquiry_content, inquiry_email },
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
		const deletedinquiry = await prisma.inquiry.delete({
			where: { inquiry_id: Number(id) },
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
