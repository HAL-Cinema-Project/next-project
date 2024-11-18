'use client';

import { Box, Drawer, DrawerBody, Text, useDisclosure } from '@yamada-ui/react';
import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@yamada-ui/fontawesome';
import Link from 'next/link';

export const AdminHeader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const drawerMenuList = [
		{
			id: 1,
			navMenu: '映画管理',
			route: '/admin/movie_admin',
		},
		{
			id: 2,
			navMenu: '上映管理',
			route: '/admin/schedule_admin',
		},
		{
			id: 3,
			navMenu: '問い合わせ管理',
			route: '/admin/inquiry_admin',
		},
	];

	return (
		<>
			<Box
				w={'100%'}
				display={'flex'}
				alignItems={'center'}
				gap={'20px'}
				py={'15px'}
				px={'10px'}
				bgColor={'#000'}
				color={'#fff'}
			>
				<Box>
					<Icon icon={faBars} onClick={onOpen} fontSize={'2rem'} />
					<Drawer isOpen={isOpen} onClose={onClose} placement={'left'}>
						<DrawerBody>
							{drawerMenuList.map((index) => (
								<Link key={index.id} href={index.route}>
									<Text color={'#000'} fontSize={'1.6rem'}>
										{index.navMenu}
									</Text>
								</Link>
							))}
						</DrawerBody>
					</Drawer>
				</Box>
				<Text fontSize={'1.6rem'} pb={'3px'}>
					HALシネマ管理者画面
				</Text>
			</Box>
		</>
	);
};
