import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

//db接続
const prisma = new PrismaClient();

interface Ticket {
	ticket_id: string;
	ticket_price: number;
}

export async function GET() {
	try {
		const ret = await prisma.ticket.findMany();

		const ticketTypes = ret.map((ticket: Ticket) => {
			let type = '';
			if (ticket.ticket_id == '1') {
				type = 'normal';
			} else if (ticket.ticket_id == '2') {
				type = 'collegeStudent';
			} else if (ticket.ticket_id == '3') {
				type = 'middleStudent';
			} else if (ticket.ticket_id == '4') {
				type = 'kids';
			}
			return { ...ticket, type };
		});
		return NextResponse.json(ticketTypes);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// POSTメソッド
export async function POST(req: NextRequest) {
	try {
		const { ticket_price }: Ticket = await req.json();
		try {
			const newTicket = await prisma.ticket.create({
				data: {
					ticket_price,
				},
			});
			return NextResponse.json(newTicket, { status: 201 });
		} catch (error) {
			console.error('Error executing query', error);
			return NextResponse.json(
				{ error: 'Error executing query' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Invalid request error', error);
		return NextResponse.json(
			{ error: 'Invalid request error' },
			{ status: 400 }
		);
	}
}
