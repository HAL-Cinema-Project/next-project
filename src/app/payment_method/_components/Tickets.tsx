import { Box, Button, Link, Text } from '@yamada-ui/react';
import React from 'react';

const Ticket = () => {
	//仮データ
	const ticketTypes = {
		general: { type: '一般', count: 2 },
		university: { type: '大学生', count: 1 },
		highSchool: { type: '高校生・中学生', count: 0 },
		elementary: { type: '小学生・幼児', count: 0 },
	};
	const totalTickets = Object.values(ticketTypes).reduce(
		(total, ticket) => total + ticket.count,
		0
	);
	const totalAmount = totalTickets * 1500;
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
