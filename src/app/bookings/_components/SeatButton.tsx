'use client';
import { useSeat } from '@/app/hooks/useSeat';
import { SeatInfoProps } from '@/provider/Provider';
import { Box } from '@yamada-ui/react';
import React from 'react';

interface Props {
	key: number;
	x_axis: keyof SeatInfoProps;
	y_axis: number;
	buttonColor: string;
}

export const SeatButton = (props: Props) => {
	const { seatInfo, toggleSeat, reservedSeatInfo } = useSeat();

	const isSelected = seatInfo[props.x_axis][props.y_axis - 1]; // y_axis は1始まりのため、-1します

	return (
		<Box
			as="button"
			disabled={
				reservedSeatInfo[props.x_axis as keyof SeatInfoProps][props.y_axis - 1]
			}
			w={'25px'}
			h={'35px'}
			bg={isSelected ? props.buttonColor : '#ddd'}
			_disabled={{
				bg: '#999',
				cursor: 'not-allowed',
				opacity: 0.6,
			}}
			rounded={'5px'}
			onClick={() => toggleSeat(props.x_axis, props.y_axis - 1)} // y_axis は1始まりのため、-1します
		></Box>
	);
};
