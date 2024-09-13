'use client';
import { DatePicker } from '@yamada-ui/calendar';
import {
	Box,
	Button,
	Center,
	Input,
	Radio,
	RadioGroup,
	Text,
	useBreakpoint,
} from '@yamada-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const SignUpForm = () => {
	const router = useRouter();
	const breakpoint = useBreakpoint();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = {
			first_name: formData.get('first_name'),
			last_name: formData.get('last_name'),
			e_mail: formData.get('e_mail'),
			password: formData.get('password'),
			birthday: formData.get('birthday'),
			gender: formData.get('gender'),
		};
		try {
			const res = await fetch('/server/route/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (res.ok) {
				const json = await res.json();
				console.log(json);
				router.push('/');
			} else {
				console.error('HTTP-Error: ' + res.status);
			}
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<>
			<Box
				w={breakpoint === 'sm' ? '100%' : breakpoint === 'md' ? '90%' : '70%'}
				m="40px"
			>
				<Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
					SIGN UP
				</Text>

				<form onSubmit={handleSubmit}>
					<Box m="20px 0">
						<Text>NAME</Text>
						<Box display="flex" justifyContent="space-between">
							<Input name="last_name" placeholder="苗字" w="49%" />
							<Input name="first_name" placeholder="名前" w="49%" />
						</Box>
					</Box>

					<Box m="20px 0">
						<Text>MAIL</Text>
						<Input name="e_mail" placeholder="メールアドレス" />
					</Box>

					<Box m="20px 0 ">
						<Text>PASSWORD</Text>
						<Input name="password" type="password" placeholder="パスワード" />
						<Input mt="20px" type="password" placeholder="パスワード再入力" />
					</Box>

					<Box m="20px 0">
						<Text>BIRTHDAY</Text>
						<DatePicker
							name="birthday"
							placeholder="誕生日"
							defaultType="year"
						/>
					</Box>

					<Box m="20px 0">
						<Text>GENDER</Text>
						<RadioGroup direction="row">
							<Radio name="gender" value="男性">
								男性
							</Radio>
							<Radio name="gender" value="女性">
								女性
							</Radio>
							<Radio name="gender" value="その他">
								選択しない
							</Radio>
						</RadioGroup>
					</Box>

					<Center>
						<Button
							type="submit"
							w="100%"
							m="20px auto"
							colorScheme="secondary"
						>
							登録
						</Button>
					</Center>
				</form>

				<Box>
					<Text>
						登録済みの方は
						<Link
							href={'/login'}
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
