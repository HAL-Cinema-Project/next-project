'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type TicketType = 'normal' | 'middleStudent' | 'kids' | 'collegeStudent';

type TicketOperations = {
	[K in TicketType as `${K}TicketPlus` | `${K}TicketMinus`]: () => void;
};

interface Ticket {
	ticket_id: number;
	ticket_price: number;
	type: string;
}

type UseTicketReturn = {
	normal: number;
	middleStudent: number;
	kids: number;
	collegeStudent: number;
	normalPrice: number;
	middleStudentPrice: number;
	kidsPrice: number;
	collegeStudentPrice: number;
	totalPrice: number;
} & TicketOperations;

export const useTicket = (): UseTicketReturn => {
	const searchParams = useSearchParams();
	const seatCountQuery = searchParams.get('seatCount');
	const seatCount = seatCountQuery ? Number(seatCountQuery) : 0;
	const [tickets, setTickets] = useState({
		normal: 0,
		middleStudent: 0,
		kids: 0,
		collegeStudent: 0,
	});

	const [prices, setPrice] = useState({
		normal: 0,
		collegeStudent: 0,
		middleStudent: 0,
		kids: 0,
	});

	useEffect(() => {
		const fetchTicketPrices = async () => {
			const res = await fetch('../server/route/ticket');
			const data = await res.json();

			const prices = {
				normal:
					data.find((ticket: Ticket) => ticket.type === 'normal')
						?.ticket_price || 0,
				kids:
					data.find((ticket: Ticket) => ticket.type === 'kids')?.ticket_price ||
					0,
				collegeStudent:
					data.find((ticket: Ticket) => ticket.type === 'collegeStudent')
						?.ticket_price || 0,
				middleStudent:
					data.find((ticket: Ticket) => ticket.type === 'middleStudent')
						?.ticket_price || 0,
			};
			setPrice(prices);
		};
		fetchTicketPrices();
	}, []);

	const totalPrice = useMemo(() => {
		return Object.entries(tickets).reduce((total, [type, count]) => {
			return total + prices[type as TicketType] * count;
		}, 0);
	}, [tickets, prices]);

	const updateTicket = useCallback(
		(type: TicketType, increment: number) => {
			const totalTickets = Object.values(tickets).reduce(
				(sum, val) => sum + val,
				0
			);
			if (totalTickets + increment <= seatCount) {
				setTickets((prev) => ({
					...prev,
					[type]: Math.max(0, prev[type] + increment),
				}));
			}
		},
		[seatCount, tickets]
	);

	const ticketOperations = useMemo(() => {
		const operations: Record<string, () => void> = {};
		(Object.keys(tickets) as TicketType[]).forEach((type) => {
			operations[`${type}TicketPlus`] = () => updateTicket(type, 1);
			operations[`${type}TicketMinus`] = () => updateTicket(type, -1);
		});
		return operations;
	}, [updateTicket, tickets]);

	return {
		...tickets,
		totalPrice,
		...ticketOperations,
		normalPrice: prices.normal,
		middleStudentPrice: prices.middleStudent,
		collegeStudentPrice: prices.collegeStudent,
		kidsPrice: prices.kids,
	} as UseTicketReturn;
};
