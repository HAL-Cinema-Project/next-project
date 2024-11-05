'use client';
import React, { useEffect, useState, MouseEvent } from 'react';
import { AspectRatio, Box, useBreakpoint, Image } from '@yamada-ui/react';
import BreadcrumbList from './_components/BreadcrumbList';
import Title from './_components/Title';
import { fetchCinema } from '../hooks/useCinema';
import Placeholder from '../movies/_components/Placeholder';

interface Cinema {
	cinema_id: number;
	cinema_image: string;
	cinema_region: string;
	cinema_detail: string;
	cinema_email: string;
	cinema_address: string;
	cinema_tel: string;
}

const cinemaMapUrls: Record<number, string> = {
	1: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1664617.7279646508!2d136.9715623765585!3d35.424914290048086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d9090c03e2f%3A0x3de1c61ba2a4ac68!2zSEFM5p2x5Lqs!5e0!3m2!1sja!2sjp!4v1719230827810!5m2!1sja!2sjp',
	2: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.2113910366197!2d135.4904713740779!3d34.69984778326134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e728ba376c79%3A0x3880b1f8cc20187e!2zSEFM5aSn6Ziq!5e0!3m2!1sja!2sjp!4v1719232216600!5m2!1sja!2sjp',
	3: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1669907.8431759314!2d134.57849699375!3d35.1681223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376de618547db%3A0x76435e49b7e59323!2zSEFM5ZCN5Y-k5bGL!5e0!3m2!1sja!2sjp!4v1719231874954!5m2!1sja!2sjp',
};

const Page = () => {
	const breakpoint = useBreakpoint();
	const [cinemas, setCinemas] = useState<Cinema[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCinemadata = async () => {
			const cinemasData = await fetchCinema();
			const formattedCinemas: Cinema[] = cinemasData.map((cinema: any) => ({
				cinema_id: cinema.cinema_id,
				cinema_region: cinema.cinema_region,
				cinema_detail: cinema.cinema_detail,
				cinema_image: cinema.cinema_image,
				cinema_email: cinema.cinema_email,
				cinema_address: cinema.cinema_address,
				cinema_tel: cinema.cinema_tel,
			}));
			setCinemas(formattedCinemas);
			setLoading(false);
		};
		fetchCinemadata();
	}, []);

	return (
		<Box
			margin="0 auto"
			marginBottom="15px"
			maxWidth="1500px"
			width="100%"
			height="auto"
			backgroundColor="#fff"
		>
			<BreadcrumbList />
			<Title />
			{loading ? (
				<p>loading</p>
			) : (
				cinemas.map((data, index) => (
					<Box
						key={index}
						width="100%"
						marginTop="15px"
						padding="10px 0"
						borderRadius="2px"
						border="solid 1px #ddd"
						backgroundColor="#fff"
						cursor="pointer"
						onClick={() =>
							(window.location.href = `/theaters/${data.cinema_id}`)
						}
						_hover={{
							'& .title-box': {
								backgroundColor: '#08f',
								transition: 'background-color 0.3s ease',
							},
						}}
					>
						<Box
							className="title-box"
							width="calc(100% - 20px)"
							height="40px"
							marginLeft="10px"
							borderRadius="2px"
							backgroundColor="#111"
						>
							<p
								style={{
									paddingLeft: '10px',
									fontSize: '30px',
									lineHeight: '1.2',
									color: '#fff',
								}}
							>
								{data.cinema_region}
							</p>
						</Box>
						<Box
							display="flex"
							flexDirection={
								['sm', 'md'].includes(breakpoint) ? 'column' : 'row'
							}
						>
							<Box
								flex="3"
								margin="10px 10px 0 10px"
								borderRadius="2px"
								backgroundColor="#fff"
							>
								<Box position="relative" width="100%" paddingBottom="100%">
									<Image
										src={data.cinema_image}
										alt={data.cinema_region}
										style={{ borderRadius: '2px', objectFit: 'cover' }}
									/>
								</Box>
							</Box>
							<Box
								flex="7"
								display="flex"
								flexDirection="column"
								margin={
									['sm', 'md'].includes(breakpoint) ? '0 10px 0 10px' : '0'
								}
							>
								<Box
									width={
										['sm', 'md'].includes(breakpoint)
											? '100%'
											: 'calc(100% - 10px)'
									}
									borderRadius="2px"
									border="solid 1px #ddd"
									backgroundColor="#fff"
									fontSize="16px"
									padding="10px"
									marginTop="10px"
									marginBottom="10px"
								>
									住所: {data.cinema_address} 電話番号:
									{data.cinema_tel}
									<br />
									メールアドレス {data.cinema_email}
									<br />
									スクリーン数: 8<br />
									特徴 料金形態
									<br />
								</Box>
								<Box
									width={
										['sm', 'md'].includes(breakpoint)
											? '100%'
											: 'calc(100% - 10px)'
									}
									borderRadius="2px"
									border="solid 1px #ddd"
									backgroundColor="#fff"
								>
									<iframe
										src={cinemaMapUrls[data.cinema_id] || ''}
										width="100%"
										height="300px"
										loading="lazy"
										style={{
											border: 'none',
											margin: 0,
											padding: 0,
											display: 'block',
										}}
									></iframe>
								</Box>
							</Box>
						</Box>
					</Box>
				))
			)}
		</Box>
	);
};

export default Page;
