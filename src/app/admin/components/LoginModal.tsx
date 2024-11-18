'use client';

import {
	Text,
	Input,
	Modal,
	ModalBody,
	useDisclosure,
	Button,
	ModalOverlay,
} from '@yamada-ui/react';
import React, { useEffect, useState } from 'react';

export const LoginModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [loginFlag, setLoginFlag] = useState(true);

	const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
	const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

	console.log(adminEmail, adminPassword);

	useEffect(() => {
		onOpen();
	}, [onOpen]);

	const handleLogin = () => {
		if (email == adminEmail && password == adminPassword) {
			onClose();
		} else {
			setLoginFlag(false);
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} size={'3xl'}>
				<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

				<ModalBody p={'25px'}>
					<Text fontSize={'2xl'} fontWeight={'bold'}>
						ログイン
					</Text>
					<Input
						placeholder="Email"
						name="Email"
						value={email}
						my={'10px'}
						w={'100%'}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="Password"
						name="Password"
						type="password"
						value={password}
						my={'10px'}
						w={'100%'}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{!loginFlag && (
						<Text color="red">メールアドレスまたはパスワードが違います。</Text>
					)}
					<Button my={'10px'} w={'100%'} type="submit" onClick={handleLogin}>
						ログイン
					</Button>
				</ModalBody>
			</Modal>
		</>
	);
};
