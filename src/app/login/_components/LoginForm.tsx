'use client';
import {
	Box,
	Text,
	Input,
	useBreakpoint,
	Center,
	Button,
} from '@yamada-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const LoginForm = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const router = useRouter();
	const breakpoint = useBreakpoint();

	// fetchでログイン処理を行う
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch('/server/route/user/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			console.log(data);
			if (data.message === 'success') {
				router.push('/');
			}
		} else {
			const data = await res.json();
			alert(data.error);
		}
	};
	return (
		<>
			<Box
				w={breakpoint === 'sm' ? '100%' : breakpoint === 'md' ? '90%' : '70%'}
				m="40px"
			>
				<form onSubmit={handleSubmit}>
					<Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
						LOG IN
					</Text>

					<Box m="20px 0">
						<Text>MAIL</Text>
						<Input
							name="email"
							placeholder="メールアドレス"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Box>

					<Box m="20px 0 ">
						<Text>PASSWORD</Text>
						<Input
							name="password"
							type="password"
							placeholder="パスワード"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{/* <Input mt="20px" type="password" placeholder="パスワード再入力" /> */}
					</Box>

					<Center>
						<Button
							w="100%"
							m="20px auto"
							colorScheme="secondary"
							type="submit"
						>
							ログイン
						</Button>
					</Center>
				</form>

				<Box>
					<Text>
						アカウントをお持ちでない方は
						<Link
							href={'/login/signup'}
							style={{
								color: 'red',
								fontWeight: 'bold',
							}}
						>
							こちら
						</Link>
						から
					</Text>
				</Box>
			</Box>
		</>
	);
};
