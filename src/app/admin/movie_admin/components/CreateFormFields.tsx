import {
	Box,
	Input,
	Stack,
	Text,
	Textarea,
	Select,
	Option,
} from '@yamada-ui/react';
import { FormData } from './FormData';

interface FormFieldsProps {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	categoryData: { category_id: number; category_name: string }[];
}

export const FormFields = ({
	formData,
	setFormData,
	categoryData,
}: FormFieldsProps) => {
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		setFormData({ ...formData, mainImage: file });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFormData({ ...formData, mainImage: e.target.files[0] });
		}
	};

	return (
		<Stack width="xl">
			<Box>
				<Text fontWeight="bold">作品名</Text>
				<Input
					name="movieName"
					placeholder="作品名"
					value={formData.movieName}
					onChange={handleChange}
				/>
			</Box>

			<Box>
				<Text fontWeight="bold">上映開始日</Text>
				<Input
					type="date"
					name="startDate"
					placeholder="上映開始日"
					value={formData.startDate}
					onChange={handleChange}
					onFocus={(e) => e.target.showPicker && e.target.showPicker()}
				/>
			</Box>

			{/* カテゴリー */}
			<Box>
				<Text fontWeight="bold">カテゴリー</Text>
				<Select
					name="category"
					placeholder="カテゴリーを選択"
					value={formData.category}
					onChange={(value) =>
						setFormData((prevData) => ({ ...prevData, category: value }))
					}
				>
					{categoryData.map((category) => (
						<Option key={category.category_id} value={category.category_name}>
							{category.category_name}
						</Option>
					))}
				</Select>
			</Box>

			<Box>
				<Text fontWeight="bold">時間</Text>
				<Input
					type="text"
					name="duration"
					value={formData.duration}
					onChange={(e) => {
						const value = e.target.value.replace(/[^0-9]/g, '');
						setFormData({ ...formData, duration: value });
					}}
					placeholder="映画時間"
				/>
			</Box>

			<Box>
				<Text fontWeight="bold">監督</Text>
				<Input
					name="director"
					placeholder="監督"
					value={formData.director}
					onChange={handleChange}
				/>
			</Box>

			<Box>
				<Text fontWeight="bold">キャスト</Text>
				<Input
					name="cast"
					placeholder="キャスト"
					value={formData.cast}
					onChange={handleChange}
				/>
			</Box>

			<Box>
				<Text fontWeight="bold">説明</Text>
				<Textarea
					name="description"
					placeholder="説明"
					value={formData.description}
					onChange={handleChange}
				/>
			</Box>

			<Box>
				<Text fontWeight="bold">メイン画像</Text>
				<Box
					onDrop={handleImageDrop}
					onDragOver={(e) => e.preventDefault()}
					onClick={() => document.getElementById('mainImageUpload')?.click()}
					border="2px dashed #007BFF"
					borderRadius="md"
					p="4"
					textAlign="center"
					cursor="pointer"
					bg={formData.mainImage ? '#f5f5f5' : 'transparent'}
				>
					{formData.mainImage ? (
						<Text>{formData.mainImage.name}</Text>
					) : (
						<Text>画像をアップロード</Text>
					)}
				</Box>
				<Input
					id="mainImageUpload"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>
			</Box>

			<Box>
				<Text fontWeight="bold">サブ画像</Text>
				<Box
					onDrop={handleImageDrop}
					onDragOver={(e) => e.preventDefault()}
					onClick={() => document.getElementById('subImageUpload')?.click()}
					border="2px dashed #007BFF"
					borderRadius="md"
					p="4"
					textAlign="center"
					cursor="pointer"
					bg={formData.subImage ? '#f5f5f5' : 'transparent'}
				>
					{formData.subImage ? (
						<Text>{formData.subImage.name}</Text>
					) : (
						<Text>画像をアップロード</Text>
					)}
				</Box>
				<Input
					id="subImageUpload"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>
			</Box>
		</Stack>
	);
};
