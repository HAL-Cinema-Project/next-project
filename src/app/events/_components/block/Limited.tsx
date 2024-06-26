'use client';

import { Box, GridItem, SimpleGrid, Text, Image } from '@yamada-ui/react';
import React, { useState } from 'react';
import { limitedImages, limitedDetails } from '../atom/data';

const Limited = () => {
	const [showText, setShowText] = useState(Array(4).fill(false));

	const handleImageClick = (index: number) => {
		const newShowText = [...showText];
		newShowText[index] = !newShowText[index];
		setShowText(newShowText);
	};

	return (
		<Box m="10px auto 50px auto">
			<Box
				w="1500px"
				m="20px auto"
				bgColor="#111"
				lineHeight="1.5"
				color="#fff"
				p="10px"
			>
				<Text ml="1vw" fontSize="2rem">
					期間限定イベント
				</Text>
			</Box>

			<SimpleGrid w="1450px" m="0 auto" columns={{ base: 2, md: 1 }} gap="md">
				{limitedImages.map((img, index) => (
					<GridItem key={index} w="full" rounded="md">
						<Box position="relative">
							<Box
								as="div"
								w="full"
								h="4xs"
								rounded="md"
								overflow="hidden"
								boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
								_hover={{ filter: 'brightness(0.8)' }}
							>
								<Image
									src={img}
									alt={`image-${index}`}
									w="full"
									h="full"
									onClick={() => handleImageClick(index)}
									cursor="pointer"
								/>
							</Box>
							{showText[index] && (
								<Box
									position="relative"
									w="full"
									bgColor="rgba(0, 0, 0, 0.5)"
									color="#fff"
									p="10px"
								>
									<Text>{limitedDetails[index]}</Text>
								</Box>
							)}
						</Box>
					</GridItem>
				))}
			</SimpleGrid>
		</Box>
	);
};

export default Limited;
