'use client';

import { useEffect, useState } from 'react';
import { Inquiry } from '../interfaces/movieDataInterface';
import { fetchInquiry } from './useInquiry';

const useFetchInquirys = () => {
	const [inquiryData, setInquiryData] = useState<Inquiry[]>([]);
	const [filteredInquirys, setFilteredInquirys] = useState<Inquiry[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const inquirysData = await fetchInquiry();

			const formattedData: Inquiry[] = inquirysData.map((inquiry: Inquiry) => ({
				inquiry_id: inquiry.inquiry_id,
				inquiry_subject: inquiry.inquiry_subject,
				inquiry_content: inquiry.inquiry_content,
				inquiry_email: inquiry.inquiry_email,
				created_at: inquiry.created_at,
				inquiry_category: inquiry.inquiry_category,
				inquiry_comp: inquiry.inquiry_comp,
			}));
			setInquiryData(formattedData);
			setFilteredInquirys(formattedData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return { inquiryData, filteredInquirys, loading };
};

export default useFetchInquirys;
