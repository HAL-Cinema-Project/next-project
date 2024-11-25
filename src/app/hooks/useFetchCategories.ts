'use client';

import { useEffect, useState } from 'react';
import { fetchCategory } from './useCategory';
import { Category } from '../interfaces/categoryDataIntarface';

const useFetchCategories = () => {
	const [categoryData, setCategoryData] = useState<Category[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const categoryData = await fetchCategory();
			const formattedData: Category[] = categoryData.map(
				(category: Category) => ({
					category_id: category.category_id,
					category_name: category.category_name,
				})
			);
			setCategoryData(formattedData);
		};
		fetchData();
	}, []);

	return { categoryData };
};

export default useFetchCategories;
