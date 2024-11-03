import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { stringify } from 'querystring';

// db接続
const prisma = new PrismaClient();

interface Ticket {
	ticket_id: string;
	ticket_price: number;
}

// データ単体取得
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		const ret = await prisma.ticket.findUnique({
			where: { ticket_id: id },
		});
		return NextResponse.json(ret);
	} catch (error) {
		console.error('Error executing query', error);
		return NextResponse.json(
			{ error: 'Error executing query' },
			{ status: 500 }
		);
	}
}

// update
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { ticket_price }: Ticket = await req.json();
		const { id } = params;
		try {
			const updatedTicket = await prisma.ticket.update({
				where: { ticket_id: id },
				data: { ticket_price },
			});
			return NextResponse.json(updatedTicket, { status: 201 });
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

// delete
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		try {
			const deletedticket = await prisma.ticket.delete({
				where: { ticket_id: id },
			});
			return NextResponse.json({ message: 'Ticket deleted successfully' });
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
			{ status: 500 }
		);
	}
}
