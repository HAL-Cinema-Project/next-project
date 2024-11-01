import { Box, Center, GridItem, SimpleGrid, Text } from '@yamada-ui/react';
import React from 'react';

const Tabs = () => {
	return (
		<Box w="1500px" h="60px" bgColor="#0005">
			<Box
				display="flex"
				alignItems="center"
				maxW="1480px"
				m="0 auto"
				gap="5px"
			>
				<Box m="5px 0 0 0" w="100%" h="50px">
					<Center h="100%" bg="#ccc" color="white" fontSize="1.5rem">
						座席選択
					</Center>
				</Box>
				<Box m="5px 0 0 0" w="100%" h="50px">
					<Center h="100%" bg="#ccc" color="white" fontSize="1.5rem">
						チケット選択
					</Center>
				</Box>
				<Box m="5px 0 0 0" w="100%" h="50px">
					<Center h="100%" bg="#ccc" color="white" fontSize="1.5rem">
						決済情報入力
					</Center>
				</Box>
				<Box m="5px 0 0 0" w="100%" h="50px">
					<Center h="100%" bg="#4169e1" color="white" fontSize="1.5rem">
						最終確認
					</Center>
				</Box>
				<Box m="5px 0 0 0" w="100%" h="50px">
					<Center h="100%" bg="#ccc" color="white" fontSize="1.5rem">
						予約完了
					</Center>
				</Box>
			</Box>
		</Box>
	);
};

export default Tabs;
