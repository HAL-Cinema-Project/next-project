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
export async function GET() {
	try {
		const cinema = await prisma.cinema.findMany();
		return NextResponse.json(cinema);
	} catch (error) {
		console.error('Error fetching categories', error);
		return NextResponse.json({ error: 'Error fetching categories' });
	}
}

// postメソッド
export async function POST(req: NextRequest) {
	try {
		const {
			cinema_region,
			cinema_address,
			cinema_detail,
			cinema_email,
			cinema_tel,
			cinema_image,
		}: Cinema = await req.json();

		const newInquiry = await prisma.cinema.create({
			data: {
				cinema_address,
				cinema_detail,
				cinema_email,
				cinema_image,
				cinema_region,
				cinema_tel,
			},
		});

		return NextResponse.json(newInquiry);
	} catch (error) {
		console.error('Error creating category', error);
		return NextResponse.json({ error: 'Error creating category' });
	}
}
