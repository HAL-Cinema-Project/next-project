'use client';

// CreateModal.tsxの先頭でインポート
import { FormData } from './FormData';

import { useState } from 'react';
import {
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@yamada-ui/react';
import useFetchCategories from '@/app/hooks/useFetchCategories';
import { FormFields } from './CreateFormFields';

export const CreateModal = () => {
	const { categoryData } = useFetchCategories();

	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		movieName: '',
		startDate: '',
		category: '',
		duration: '',
		director: '',
		cast: '',
		description: '',
		mainImage: null,
		subImage: null,
	});

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
		setFormData({
			movieName: '',
			startDate: '',
			category: '',
			duration: '',
			director: '',
			cast: '',
			description: '',
			mainImage: null,
			subImage: null,
		});
	};

	const handleAdd = () => {
		console.log('送信データ:', formData);

		if (
			!formData.movieName ||
			!formData.startDate ||
			!formData.category ||
			!formData.mainImage
		) {
			alert('入力していない項目があります。');
			return;
		}

		closeModal();
	};

	return (
		<Box>
			<Button onClick={openModal} bgColor={'#007BFF'} color={'#fff'}>
				項目追加
			</Button>

			<Modal isOpen={isOpen} onClose={closeModal} size="3xl">
				<ModalOverlay />
				<Box
					as="div"
					bg="white"
					borderRadius="md"
					p="4"
					mx="auto"
					mt="5%"
					height="auto"
				>
					<ModalHeader>新しい項目を追加</ModalHeader>
					<ModalBody overflowY="auto" maxHeight="60vh">
						<FormFields
							formData={formData}
							setFormData={setFormData}
							categoryData={categoryData}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							onClick={closeModal}
							bgColor={'#FF0000'}
							color={'#fff'}
							w="150px"
						>
							キャンセル
						</Button>
						<Button
							onClick={handleAdd}
							bgColor={'#007BFF'}
							color={'#fff'}
							mr={3}
							w="150px"
						>
							追加
						</Button>
					</ModalFooter>
				</Box>
			</Modal>
		</Box>
	);
};
