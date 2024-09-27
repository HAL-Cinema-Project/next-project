'use client';
import {
	Box,
	Button,
	Input,
	Text,
	Textarea,
	useBreakpoint,
} from '@yamada-ui/react';
import React, { useState } from 'react';

export const InquiryForm = () => {
	const breakpoint = useBreakpoint();
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [maintext, setMaintext] = useState('');

	return (
		<>
			<Box
				w={breakpoint === 'sm' ? '100%' : breakpoint === 'md' ? '90%' : '70%'}
				m="40px"
			>
				<Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
					お問い合わせ
				</Text>
				<form action="">
					<Box m="20px 0 ">
						<Text>メールアドレス</Text>
						<Input
							name="email"
							placeholder="メールアドレス"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Box>

					<Box m="20px 0 ">
						<Text>件名</Text>
						<Input
							name="subject"
							placeholder="件名"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
					</Box>

					<Box m="20px 0 ">
						<Text>本文</Text>
						<Textarea
							name="maintext"
							placeholder="本文"
							value={maintext}
							onChange={(e) => setMaintext(e.target.value)}
							h={'200px'}
						/>
					</Box>

					<Button w="100%" m="20px auto" colorScheme="secondary" type="submit">
						送信
					</Button>
				</form>
			</Box>
		</>
	);
};
