import { Box, Text } from '@yamada-ui/react';
import Link from 'next/link';
import React from 'react';

export const BreadcrumbList = () => {
	return (
		<Box
			width="100%"
			height="30px"
			marginTop="15px"
			borderRadius="2px"
			backgroundColor="#111"
		>
			<Text paddingLeft="10px" fontSize="16px" lineHeight="1.8" color="#fff">
				<Link href="/" passHref>
					<Text as="span" color="#fff" textDecoration="none" cursor="pointer">
						トップページ
					</Text>
				</Link>
				{' > '}
				<Link href="/movies" passHref>
					<Text as="span" color="#fff" textDecoration="none" cursor="pointer">
						作品案内
					</Text>
				</Link>
				{' > '}
				<Link href="/movies" passHref>
					<Text as="span" color="#fff" textDecoration="none" cursor="pointer">
						作品詳細
					</Text>
				</Link>
				{' > '}
				<Link href="/movies" passHref>
					<Text as="span" color="#fff" textDecoration="none" cursor="pointer">
						座席予約
					</Text>
				</Link>
			</Text>
		</Box>
	);
};
