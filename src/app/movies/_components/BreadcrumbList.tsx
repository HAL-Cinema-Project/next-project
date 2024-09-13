import React from 'react';
import { Box, Text } from '@yamada-ui/react';
import Link from 'next/link';

const BreadcrumbList = () => {
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
			</Text>
		</Box>
	);
};

export default BreadcrumbList;
