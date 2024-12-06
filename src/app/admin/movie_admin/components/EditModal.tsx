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
import { FormFields } from './CreateFormFields';
import useFetchCategories from '@/app/hooks/useFetchCategories';

interface EditModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialData: FormData;
	onSave: (updatedData: FormData) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
	isOpen,
	onClose,
	initialData,
	onSave,
}) => {
	const { categoryData } = useFetchCategories();
	const [formData, setFormData] = useState<FormData>(initialData);

	const handleSave = () => {
		if (
			!formData.movieName ||
			!formData.startDate ||
			!formData.category ||
			!formData.mainImage
		) {
			alert('入力していない項目があります。');
			return;
		}
		onSave(formData);
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
				<ModalHeader>項目を編集</ModalHeader>
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
						onClick={handleSave}
						bgColor={'#007BFF'}
						color={'#fff'}
						mr={3}
						w="150px"
					>
						保存
					</Button>
				</ModalFooter>
			</Box>
		</Modal>
	);
};
