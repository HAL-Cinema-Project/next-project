import { Box, Center } from '@yamada-ui/react';
import React from 'react';
import TheaterCard from './TheaterCard';

const theater = [
	{
		id: 1,
		theaterImage: 'hal_tokyo.jpg',
		theaterName: 'HAL東京',
		theaterInformation:
			'新宿駅から徒歩3分、コクーンタワー内に設置された最新鋭の映画館。8つのスクリーンを備え、最新の視覚・音響設備を完備。さらに、快適な座席と広々としたスペースにより、映画鑑賞が至高のエンターテインメント体験となるよう設計。IMAXシアターや4DXシアターなど、多彩なフォーマットで映画を楽しむこともでき、リアルな映像体験も提供している。',
	},
	{
		id: 2,
		theaterImage: 'hal_nagoya.jpg',
		theaterName: 'HAL名古屋',
		theaterInformation:
			'名古屋駅から徒歩3分のスパイラルタワーズ内に位置し、アクセス抜群のロケーション。最新の技術を駆使し、映画鑑賞者に最高の体験を提供することを目指している。特注の座席は長時間の映画鑑賞でも疲れにくく、最高のリラックスを提供している。さらに、カップホルダーやUSBポート付きの座席もあり、利便性も考慮。',
	},
	{
		id: 3,
		theaterImage: 'hal_osaka.jpg',
		theaterName: 'HAL大阪',
		theaterInformation:
			'大阪駅から徒歩2分の好立地。最新のデジタル映写技術と音響設備を備えた8つのスクリーンで、ハリウッド大作から国内外の話題作、クラシック映画まで幅広いジャンルの作品を上映。特注の座席で映画鑑賞をより快適に。バリアフリー設計で、字幕付き上映や音声ガイド付き上映も実施。全てのお客様に快適で魅力的な映画体験をお届けしている。',
	},
];

const TheaterList = () => {
	return (
		<>
			<Box display="flex" flexDirection="column" as={Center}>
				{theater.map((data, index) => (
					<TheaterCard
						key={index}
						id={data.id}
						theaterImage={data.theaterImage}
						theaterName={data.theaterName}
						theaterInformation={data.theaterInformation}
					/>
				))}
			</Box>
		</>
	);
};

export default TheaterList;
