import React, { useEffect } from 'react';
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
import useUserId from '../../../hooks/useUserId'; // User型のインポートパスを調整してください
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type UserInfoProps = {
	user: {
		user_id: string;
		first_name: string;
		last_name: string;
		e_mail: string;
		password: string;
		birthday: string;
		gender: string;
	};
};

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
	const router = useRouter();
	const cookie = Cookies.get('user_id');

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	if (!cookie) {
		router.push('/login');
		return;
	}

	const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await fetch(`../server/route/user/${cookie}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ e_mail: email, password }),
			});
			if (res.ok) {
				alert('更新が完了しました');
				router.refresh();
			} else {
				alert('更新に失敗しました');
			}
		} catch (error) {
			console.error('エラー:', error);
			alert('エラーが発生しました');
		}
	};

	return (
		<Box bgColor="#fff" color="#000" py="20px">
			<Box
				w="80%"
				m="0 auto"
				bgColor="#111"
				lineHeight="1.5"
				color="#fff"
				p="10px"
			>
				<Text ml="1vw" fontSize="2rem">
					ユーザー情報
				</Text>
			</Box>

			<Box display="flex" flexWrap="wrap" w="80%" m="20px auto" gap="10px">
				<Box
					display="flex"
					w="calc(50% - 10px)"
					bgColor="#f3f3f3"
					boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
					overflow="hidden"
				>
					<Box display="flex" flexDirection="column" p="10px" w="100%">
						<Box>
							<Text>性</Text>
							<Box display="flex">
								<text>{user.first_name}</text>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					display="flex"
					w="calc(50% - 10px)"
					bgColor="#f3f3f3"
					boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
					overflow="hidden"
				>
					<Box display="flex" flexDirection="column" p="10px" w="100%">
						<Box>
							<Text>名</Text>
							<Box display="flex" w="100%">
								{user.last_name}
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>

			<Box display="flex" flexWrap="wrap" w="80%" m="20px auto" gap="10px">
				<Box
					display="flex"
					w="calc(50% - 10px)"
					bgColor="#f3f3f3"
					boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
					overflow="hidden"
				>
					<Box display="flex" flexDirection="column" p="10px" w="100%">
						<Box display="flex">
							<Box>
								<Text>誕生日</Text>
								<Box display="flex">
									<text>{user.birthday}</text>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					display="flex"
					w="calc(50% - 10px)"
					bgColor="#f3f3f3"
					boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
					overflow="hidden"
				>
					<Box display="flex" flexDirection="column" p="10px" w="100%">
						<Box display="flex">
							<Box>
								<Text>性別</Text>
								<Box display="flex">
									<text>{user.gender}</text>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>

			<form onSubmit={handleChange}>
				<Box
					w="80%"
					m="0 auto"
					bgColor="#111"
					lineHeight="1.5"
					color="#fff"
					p="10px"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text ml="1vw" fontSize="2rem">
						ログイン設定
					</Text>
					<Text
						type="submit"
						as="button"
						color="blue"
						_hover={{ color: 'darkblue' }}
						// onClick={() => {
						// 	// Handle edit action here
						// }}
					>
						変更
					</Text>
				</Box>

				<Box display="flex" flexWrap="wrap" w="80%" m="20px auto" gap="10px">
					<Box
						display="flex"
						w="calc(50% - 10px)"
						bgColor="#f3f3f3"
						boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
						overflow="hidden"
					>
						<Box display="flex" flexDirection="column" p="10px" w="100%">
							<Box>
								<Text>E-MAIL</Text>
								<Box display="flex" bgColor="#fff">
									<Input
										name="email"
										placeholder="email"
										w="100%"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
					<Box
						display="flex"
						w="calc(50% - 10px)"
						bgColor="#f3f3f3"
						boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
						overflow="hidden"
					>
						<Box display="flex" flexDirection="column" p="10px" w="100%">
							<Box>
								<Text>パスワード</Text>
								<Box display="flex" bgColor="#fff">
									<Input
										name="password"
										placeholder="パスワード"
										w="100%"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</form>
		</Box>
	);
};

export default UserInfo;
