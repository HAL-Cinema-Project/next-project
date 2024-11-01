//PaymentMethod.tsx
//途中・・・
'use client';

import { fetchMethod } from '@/app/hooks/useMethod';
import { Box, Button, Input, Option, Select, Text } from '@yamada-ui/react';
import React, { useEffect, useState } from 'react';

interface Method {
	method_id: number;
	method: string;
}

const PaymentMethod = () => {
	const [paymentMethods, setPaymentMethods] = useState<Method[]>([]);
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<string>('');
	useEffect(() => {
		const fetchData = async () => {
			const MethodData = await fetchMethod();
			const formattedData: Method[] = MethodData.map((method: any) => ({
				method_id: method.method_id,
				method: method.method,
			}));
			setPaymentMethods(formattedData);
		};
		fetchMethod();
	}, []);

	// 型の修正
	const handlePaymentMethodChange = (value: string) => {
		setSelectedPaymentMethod(value);
	};

	return (
		<Box
			maxW="900px"
			w="900px"
			bg="#fff"
			p="10px"
			sx={{
				'@media screen and (max-width: 1000px)': {
					maxW: '100%',
					w: '100%',
				},
			}}
		>
			<Box
				p="10px 20px"
				fontSize="1.5rem"
				mb="4px"
				color="#fff"
				bgColor="#333"
				boxShadow="md"
				sx={{
					'@media screen and (max-width: 1000px)': {
						w: '100%',
					},
				}}
			>
				<Text m="0 10px" fontSize="1.5rem" fontWeight="bold">
					情報入力
				</Text>
			</Box>

			<Box m="0px 40px">
				<form>
					<Box m="10px 0">
						<Text fontSize="1rem" mb="5px">
							お名前
						</Text>
						<Input name="name" placeholder="お名前" w="100%" />
					</Box>

					<Box m="10px 0">
						<Text fontSize="1rem" mb="5px">
							MAIL
						</Text>
						<Input name="e_mail" placeholder="メールアドレス" />
					</Box>

					<Box m="10px 0">
						<Text fontSize="1rem" mb="5px">
							電話番号
						</Text>
						<Input name="phone_num" type="text" placeholder="電話番号" />
					</Box>

					<Box m="10px 0">
						<Text fontSize="1rem" mb="5px">
							決済方法
						</Text>
						<Select
							name="payment_method"
							onChange={handlePaymentMethodChange}
							placeholder="決済方法を選択"
						>
							{paymentMethods.map((method) => (
								<Option key={method.method_id} value={method.method}>
									{method.method}
								</Option>
							))}
						</Select>
					</Box>

					{selectedPaymentMethod === 'クレジットカード' && (
						<Box
							w="800px"
							m="10px auto 30px auto"
							mt="10px"
							p="10px"
							boxShadow="0 0 1px #000"
							border="1px solid #ccc"
						>
							<Text fontSize="1.2rem" fontWeight="bold" mb="10px">
								クレジットカード情報を入力してください
							</Text>
							<Box m="10px 0">
								<Text fontSize="1rem" mb="5px">
									カード番号
								</Text>
								<Input name="card_number" placeholder="カード番号" />
							</Box>
							<Box m="10px 0">
								<Text fontSize="1rem" mb="5px">
									有効期限
								</Text>
								<Input name="expiration_date" placeholder="MM/YY" />
							</Box>
							<Box m="10px 0">
								<Text fontSize="1rem" mb="5px">
									セキュリティコード
								</Text>
								<Input
									name="security_code"
									type="password"
									placeholder="セキュリティコード"
								/>
							</Box>
						</Box>
					)}
				</form>
			</Box>
		</Box>
	);
};

export default PaymentMethod;
