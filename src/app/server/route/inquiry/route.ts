import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

//db接続
const prisma = new PrismaClient();

interface Inquiry {
	inquiry_id: number;
	inquiry_subject: string;
	inquiry_content: string;
	inquiry_email: string;
}

//getメソッド
export async function GET() {
	try {
		const categories = await prisma.inquiry.findMany();
		return NextResponse.json(categories);
	} catch (error) {
		console.error('Error fetching categories', error);
		return NextResponse.json({ error: 'Error fetching categories' });
	}
}

// POSTメソッド: Inquiryの新規作成
export async function POST(req: NextRequest) {
	try {
		const { inquiry_subject, inquiry_content, inquiry_email }: Inquiry =
			await req.json();

		const newInquiry = await prisma.inquiry.create({
			data: {
				inquiry_subject,
				inquiry_content,
				inquiry_email,
			},
		});

		return NextResponse.json(newInquiry);
	} catch (error) {
		console.error('Error creating category', error);
		return NextResponse.json({ error: 'Error creating category' });
	}
}
