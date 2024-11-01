import { Box, Button, Link, Text } from '@yamada-ui/react';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
	normalTicketState,
	univTicketState,
	highSchoolTicketState,
	childTicketState,
} from '@/app/recoil/atoms/ticketAtoms';

const Ticket = () => {
	const ticketProps = {
		normal: useRecoilValue(normalTicketState),
		univ: useRecoilValue(univTicketState),
		highschool: useRecoilValue(highSchoolTicketState),
		elem: useRecoilValue(childTicketState),
	};

	const ticketTypes = {
		general: { type: '一般', count: ticketProps.normal },
		university: { type: '大学生', count: ticketProps.univ },
		highSchool: { type: '高校生・中学生', count: ticketProps.highschool },
		elementary: { type: '小学生・幼児', count: ticketProps.elem },
	};
	const totalTickets = Object.values(ticketTypes).reduce(
		(total, ticket) => total + ticket.count,
		0
	);
	const [totalAmount, setTotalAmount] = useState<number>(0);
	useEffect(() => {
		const totalAmount =
			ticketTypes.general.count * 1800 +
			ticketTypes.university.count * 1600 +
			ticketTypes.highSchool.count * 1400 +
			ticketTypes.elementary.count * 1200;
		setTotalAmount(totalAmount);
	}, [
		ticketTypes.general.count,
		ticketTypes.university.count,
		ticketTypes.highSchool.count,
		ticketTypes.elementary.count,
	]);
	return (
		<Box w="100%">
			<Box
				h="40px"
				marginBottom="10px"
				paddingLeft="10px"
				fontSize="20px"
				lineHeight="2.0"
				bgColor="#111"
			>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					選択チケット
				</Text>
			</Box>

			<Box
				display="flex"
				justifyContent="space-between"
				h="40px"
				marginBottom="10px"
				padding="0 10px"
				fontSize="20px"
				lineHeight="2.0"
				bgColor="#111"
			>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					一般 :
				</Text>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					1800円/{ticketTypes.general.count}枚
				</Text>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				h="40px"
				marginBottom="10px"
				padding="0 10px"
				fontSize="20px"
				lineHeight="2.0"
				bgColor="#111"
			>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					大学生 :
				</Text>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					1600円/{ticketTypes.university.count}枚
				</Text>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				h="40px"
				marginBottom="10px"
				padding="0 10px"
				fontSize="20px"
				lineHeight="2.0"
				bgColor="#111"
			>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					高校生・中学生 :
				</Text>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					1400円/{ticketTypes.highSchool.count}枚
				</Text>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				h="40px"
				marginBottom="10px"
				padding="0 10px"
				fontSize="20px"
				lineHeight="2.0"
				bgColor="#111"
			>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					小学生・幼児 :
				</Text>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					1200円/{ticketTypes.elementary.count}枚
				</Text>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				h="40px"
				marginBottom="10px"
				padding="0 10px"
				fontSize="20px"
				lineHeight="2.0"
				bgColor="#111"
			>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					合計金額・合計枚数 :
				</Text>
				<Text
					color="#fff"
					whiteSpace="nowrap"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					{totalAmount}円 / {totalTickets}枚
				</Text>
			</Box>
		</Box>
	);
};

export default Ticket;
