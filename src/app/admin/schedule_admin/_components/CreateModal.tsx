'use client';

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
import { FormData } from './FormData';

export const CreateModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		movieName: '',
		theaterType: '',
		screenNumber: '',
		screeningDate: '',
		startTime: '',
		endTime: '',
	});

	const theaterTypes = ['IMAX', '4DX', '通常', 'プレミアム'];

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
		setFormData({
			movieName: '',
			theaterType: '',
			screenNumber: '',
			screeningDate: '',
			startTime: '',
			endTime: '',
		});
	};

	const handleAdd = () => {
		console.log('送信データ:', formData);

		if (
			!formData.movieName ||
			!formData.theaterType ||
			!formData.screenNumber ||
			!formData.screeningDate ||
			!formData.startTime ||
			!formData.endTime
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
							theaterTypes={theaterTypes}
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
