// CreateModal.tsx
'use client';

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

export const CreateModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const { categoryData } = useFetchCategories();

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

		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="3xl">
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
						onClick={onClose}
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
	);
};
