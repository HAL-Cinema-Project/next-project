import { Box, Divider, Text } from '@yamada-ui/react';
import React from 'react';
import {
	leftFrontSeat,
	rightFrontSeat,
	leftBackSeat,
	rightBackSeat,
} from '../../_components/smallSeatList';
import { SeatButton } from '../../_components/SeatButton';
import { SeatInfoProps } from '@/provider/Provider';

type SeatType = {
	id: number;
	x_axis: string;
	y_axis: number;
};

export const SmallSelectSeat = () => {
	const buttonColor = 'red';

	return (
		<>
			<Box w={'100%'}>
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
						座席選択
					</Text>
				</Box>
				<Box
					bgColor="#111"
					p={'15px 15px 15px 20px'}
					w="1070px"
					h="715.5px"
					mb="10px"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Text textAlign={'center'} color={'#fff'} fontSize={'1.4rem'}>
						Screen3
					</Text>
					<Box as="center">
						<Divider variant="solid" w="800px" m={'10px auto'} />
						<Text color={'#fff'}>▲スクリーン</Text>
					</Box>
					{/* 1列目 */}
					<Box
						display={'flex'}
						gap={'20px'}
						justifyContent={'center'}
						my={'20px'}
					>
						<Box
							display={'flex'}
							w={'55px'}
							gap={'5px'}
							flexWrap={'wrap'}
							pointerEvents={'none'}
						>
							{leftFrontSeat.map((data: SeatType) => (
								<SeatButton
									key={data.id}
									x_axis={data.x_axis.toLowerCase() as keyof SeatInfoProps}
									y_axis={data.y_axis}
									buttonColor={buttonColor}
								/>
							))}
						</Box>
						<Box
							display={'flex'}
							w={'250px'}
							gap={'5px'}
							flexWrap={'wrap'}
							pointerEvents={'none'}
						>
							{rightFrontSeat.map((data: SeatType) => (
								<SeatButton
									key={data.id}
									x_axis={data.x_axis.toLowerCase() as keyof SeatInfoProps}
									y_axis={data.y_axis}
									buttonColor={buttonColor}
								/>
							))}
						</Box>
					</Box>
					{/* 3列目 */}
					<Box
						display={'flex'}
						gap={'20px'}
						justifyContent={'center'}
						my={'20px'}
					>
						<Box
							display={'flex'}
							w={'55px'}
							gap={'5px'}
							flexWrap={'wrap'}
							pointerEvents={'none'}
						>
							{leftBackSeat.map((data: SeatType) => (
								<SeatButton
									key={data.id}
									x_axis={data.x_axis.toLowerCase() as keyof SeatInfoProps}
									y_axis={data.y_axis}
									buttonColor={buttonColor}
								/>
							))}
						</Box>
						<Box
							display={'flex'}
							w={'250px'}
							gap={'5px'}
							flexWrap={'wrap'}
							pointerEvents={'none'}
						>
							{rightBackSeat.map((data: SeatType) => (
								<SeatButton
									key={data.id}
									x_axis={data.x_axis.toLowerCase() as keyof SeatInfoProps}
									y_axis={data.y_axis}
									buttonColor={buttonColor}
								/>
							))}
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};
