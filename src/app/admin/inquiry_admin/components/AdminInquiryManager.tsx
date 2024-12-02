'use client';

import { useState, useEffect } from 'react';
import { AdminInquiryAccordion } from './AdminInquiryAccodion';
import useFetchInquirys from '@/app/hooks/useFetchInquiry';

export const AdminInquiryManager = () => {
	const { inquiryData, loading } = useFetchInquirys(); // データ取得用のカスタムフック
	const [filteredInquirys, setFilteredInquirys] = useState(inquiryData); // フィルタリング結果を管理

	useEffect(() => {
		// 初回データ設定
		setFilteredInquirys(inquiryData);
	}, [inquiryData]);

	// 検索処理
	const handleSearch = (term: string) => {
		const filtered = inquiryData.filter((inquiry) =>
			inquiry.inquiry_subject.toLowerCase().includes(term.toLowerCase())
		);
		setFilteredInquirys(filtered);
	};

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<AdminInquiryAccordion inquirys={filteredInquirys} />
		</>
	);
};
