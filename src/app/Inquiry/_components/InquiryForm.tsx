'use client';
import {
	Box,
	Button,
	Input,
	MultiSelect,
	Option,
	Text,
	Textarea,
	useBreakpoint,
} from '@yamada-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const InquiryForm = () => {
	const breakpoint = useBreakpoint();
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [maintext, setMaintext] = useState('');
	const [category, setCategory] = useState<string[]>([]);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = {
			inquiry_subject: formData.get('subject'),
			inquiry_content: formData.get('maintext'),
			inquiry_email: formData.get('email'),
			inquiry_category: category,
		};
		try {
			const response = await fetch('/server/route/inquiry', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				const json = await response.json();
				console.log(json);
				router.push('/');
			} else {
				console.error('HTTP-Error: ' + response.status);
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
					お問い合わせ
				</Text>
				<form onSubmit={handleSubmit}>
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

					<Box>
						<MultiSelect
							placeholder="カテゴリー選択"
							value={category}
							onChange={(value) => setCategory(value)}
						>
							<Option value="要望">要望</Option>
							<Option value="質問">質問</Option>
							<Option value="トラブル">トラブル</Option>
							<Option value="その他">その他</Option>
						</MultiSelect>
					</Box>

					<Button w="100%" m="20px auto" colorScheme="secondary" type="submit">
						送信
					</Button>
				</form>
			</Box>
		</>
	);
};
