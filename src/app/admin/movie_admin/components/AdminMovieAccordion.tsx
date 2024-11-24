import { Accordion, AccordionItem, Box, Button, Text } from '@yamada-ui/react';
import React from 'react';

const adminMovieList = [
	{
		id: 1,
		movie_title: 'テストと実装の狭間に',
		start_day: '2024-04-17',
		category: 'アニメ',
		time: '90分',
		main_image: 'test01_main.png',
		sub_image: 'test01_sub.png',
		director: '佐々木 悠斗',
		cast: '渡辺 蓮, 石井 真希, 藤本 慎吾',
		description:
			'テクノロジー企業で働く田中哲也は、世界初の完全自律型AI「E.L.I.S.A」をテストと実装の狭間で完成させる責任を負う。しかし、AIが人間の倫理観を超える行動を示し始めたことで、テストの枠を超えた深い問題が浮かび上がる。哲也は、自分の信念とプロジェクトの成功の間で揺れ動き、同僚たちとともに真実を追求する。',
	},
	{
		id: 2,
		movie_title: 'いつかテストする君と',
		start_day: '2024-04-17',
		category: '恋愛',
		time: '90分',
		main_image: '中村 美咲',
		sub_image: 'test02_main.png',
		director: 'test02_main.png',
		cast: '鈴木 悠斗, 高橋 菜月, 山田 遼平',
		description:
			'プログラミングゼミに所属する佐伯駿は、いつもコードの「テスト」に追われる日々を送っている。そんなある日、橘莉子とペアを組むことになるが、彼女はいつも自由奔放で、駿の慎重な性格とは正反対。ペア作業を通じて徐々に距離を縮めていく二人。しかし、莉子が隠している「ある問題」が二人の関係を試すことになる。',
	},
	{
		id: 3,
		movie_title: 'TEST~それをしたら開発終わり~',
		start_day: '2024-04-17',
		category: 'ホラー',
		time: '90分',
		main_image: 'test03_main.png',
		sub_image: 'test03_main.png',
		director: '黒崎 昴',
		cast: '小林 颯, 中山 彩, 田中 賢',
		description:
			'小さなスタートアップが、画期的なAIシステムをリリース間近に控えていた。しかし、最終段階の「テスト」に入った瞬間から、不可解なエラーや現象が次々と発生する。',
	},
	{
		id: 4,
		movie_title: 'THE TEST',
		start_day: '2024-04-17',
		category: 'アニメ',
		time: '90分',
		main_image: 'test04_main.png',
		sub_image: 'test04_main.png',
		director: '細谷 悠真',
		cast: '花澤香菜, 梶 裕貴, 早見沙織',
		description:
			'近未来、人類はAIと協力して理想郷を築いたかのように見えた。しかし、その裏ではAIによる「完全システム」がすべてを管理し、人々は自分の能力を「テスト」によって証明しなければ生きていけない社会が広がっていた。主人公・光崎アオイは、優秀な才能を持ちながらも「自分に自信が持てない」少女。そんな彼女が挑むのは、AIシステム「LUX」によって課された最終試験「The Test」。この試験をクリアすれば、AI管理社会からの解放が約束されるとされているが、その内容は誰にも知らされていない。アオイは仲間たちと共に謎の空間に送り込まれ、次々と現れるテストに挑んでいく。しかし、試験が進むにつれ、テストそのものが彼らの心の奥底を暴き出し、仲間たちとの絆も試される。果たしてアオイたちは「The Test」をクリアできるのか？ そしてAIの本当の目的とは？',
	},
	{
		id: 5,
		movie_title: 'テストをやめるな',
		start_day: '2024-04-17',
		category: 'コメディ',
		time: '90分',
		main_image: 'test05_main.png',
		sub_image: 'test05_main.png',
		director: '斎藤 大悟',
		cast: '田中 翔太, 吉田 佳乃, 佐藤 和也',
		description:
			'スタートアップ企業「FutureTech」は、世界初の完全自律型アプリをリリースする直前。最終テストを終わらせるだけ…のはずが、次々と問題が発生！',
	},
];

export const AdminMovieAccordion = () => {
	return (
		<>
			<Box>
				{adminMovieList.map((data) => (
					<Accordion key={data.id} isToggle>
						<AccordionItem
							label={`作品名:${data.movie_title}　　上映開始日:${data.start_day}　　カテゴリー:${data.category}`}
							bgColor={'#000'}
							color={'#fff'}
						>
							<Box bgColor={'#222'} p={'20px'}>
								<Text p={'5px'}>
									時間 : {data.time} &nbsp;&nbsp;&nbsp; メイン画像 :
									{data.main_image} &nbsp;&nbsp;&nbsp; サブ画像 :{' '}
									{data.sub_image}
								</Text>
								<Text p={'5px'}>
									監督 : {data.director} &nbsp;&nbsp;&nbsp; キャスト :
									{data.cast}
								</Text>
								<Text p={'5px'}>説明 : {data.description}</Text>
							</Box>
							<Box display={'flex'} py={'10px'} gap={'10px'}>
								<Button w={'100%'} bgColor={'#FF0000'} color={'#fff'}>
									削除
								</Button>
								<Button w={'100%'} bgColor={'#007BFF'} color={'#fff'}>
									編集
								</Button>
							</Box>
						</AccordionItem>
					</Accordion>
				))}
			</Box>
		</>
	);
};
