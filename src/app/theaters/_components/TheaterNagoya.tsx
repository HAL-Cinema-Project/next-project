'use client';
import React, { MouseEvent } from 'react';
import Image from 'next/image';
import { Box, useBreakpoint } from '@yamada-ui/react';

const TheaterNagoya = () => {
	const breakpoint = useBreakpoint();

	const handleMapClick = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<Box
			width="100%"
			height="auto"
			marginTop="15px"
			padding="10px 0"
			borderRadius="2px"
			border="solid 1px #ddd"
			backgroundColor="#fff"
			cursor="pointer"
			onClick={() => (window.location.href = '/theaters/2')}
			_hover={{
				'& .title-box': {
					backgroundColor: '#08f',
					transition: 'background-color 0.3s ease',
				},
			}}
		>
			<Box
				className="title-box"
				width="calc(100% - 20px)"
				height="40px"
				marginLeft="10px"
				borderRadius="2px"
				backgroundColor="#111"
			>
				<p
					style={{
						paddingLeft: '10px',
						fontSize: '30px',
						lineHeight: '1.2',
						color: '#fff',
					}}
				>
					HAL 名古屋 シアター
				</p>
			</Box>
			<Box
				display="flex"
				flexDirection={['sm', 'md'].includes(breakpoint) ? 'column' : 'row'}
			>
				<Box
					flex="3"
					height="auto"
					margin="10px 10px 0 10px"
					borderRadius="2px"
					backgroundColor="#fff"
				>
					<Box position="relative" width="100%" paddingBottom="100%">
						<Image
							src="/hal_nagoya.jpg"
							alt="HAL Nagoya"
							fill
							style={{ borderRadius: '2px', objectFit: 'cover' }}
						/>
					</Box>
				</Box>
				<Box
					flex="7"
					display="flex"
					flexDirection="column"
					margin={['sm', 'md'].includes(breakpoint) ? '0 10px 0 10px' : '0'}
				>
					<Box
						width={
							['sm', 'md'].includes(breakpoint) ? '100%' : 'calc(100% - 10px)'
						}
						height="100%"
						borderRadius="2px"
						border="solid 1px #ddd"
						backgroundColor="#fff"
						fontSize="16px"
						padding="10px"
						marginTop="10px"
						marginBottom="10px"
					>
						住所: 愛知県名古屋市中村区名駅４丁目２７−１
						総合校舎スパイラルタワーズ 電話番号: 052-551-1001
						<br />
						メールアドレス
						<br />
						スクリーン数: 8<br />
						特徴 料金形態
						<br />
					</Box>
					<Box
						width={
							['sm', 'md'].includes(breakpoint) ? '100%' : 'calc(100% - 10px)'
						}
						height="auto"
						borderRadius="2px"
						border="solid 1px #ddd"
						backgroundColor="#fff"
						onClick={handleMapClick}
					>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1669907.8431759314!2d134.57849699375!3d35.1681223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376de618547db%3A0x76435e49b7e59323!2zSEFM5ZCN5Y-k5bGL!5e0!3m2!1sja!2sjp!4v1719231874954!5m2!1sja!2sjp"
							width="100%"
							height="300px"
							loading="lazy"
						></iframe>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default TheaterNagoya;
