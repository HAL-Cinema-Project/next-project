import { Box, Input, Stack, Text, Select, Option } from '@yamada-ui/react';
import { FormData } from './FormData';

interface FormFieldsProps {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	theaterTypes: string[];
}

export const FormFields = ({
	formData,
	setFormData,
	theaterTypes,
}: FormFieldsProps) => {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<Stack width="xl">
			{/* 作品名 */}
			<Box>
				<Text fontWeight="bold">作品名</Text>
				<Input
					name="movieName"
					placeholder="作品名を入力"
					value={formData.movieName}
					onChange={handleChange}
				/>
			</Box>

			{/* 上映シアター */}
			<Box>
				<Text fontWeight="bold">上映シアター</Text>
				<Select
					name="theaterType"
					placeholder="上映シアターを選択"
					value={formData.theaterType}
					onChange={(value: string) =>
						setFormData({ ...formData, theaterType: value })
					}
				>
					{['名古屋シアター', '東京シアター', '大阪シアター'].map(
						(type, index) => (
							<Option key={index} value={type}>
								{type}
							</Option>
						)
					)}
				</Select>
			</Box>

			{/* スクリーン番号 */}
			<Box>
				<Text fontWeight="bold">スクリーン番号</Text>
				<Select
					name="screenNumber"
					placeholder="スクリーン番号を選択"
					value={formData.screenNumber}
					onChange={(value: string) =>
						setFormData({ ...formData, screenNumber: value })
					}
				>
					{Array.from({ length: 8 }, (_, i) => (i + 1).toString()).map(
						(num) => (
							<Option key={num} value={num}>
								{num}
							</Option>
						)
					)}
				</Select>
			</Box>

			{/* 上映日 */}
			<Box>
				<Text fontWeight="bold">上映日</Text>
				<Input
					type="date"
					name="screeningDate"
					value={formData.screeningDate}
					onChange={handleChange}
					onFocus={(e) => e.target.showPicker && e.target.showPicker()}
				/>
			</Box>

			{/* 上映開始時間 */}
			<Box>
				<Text fontWeight="bold">上映開始時間</Text>
				<Input
					type="time"
					name="startTime"
					value={formData.startTime}
					onChange={handleChange}
				/>
			</Box>

			{/* 上映終了時間 */}
			<Box>
				<Text fontWeight="bold">上映終了時間</Text>
				<Input
					type="time"
					name="endTime"
					value={formData.endTime}
					onChange={handleChange}
				/>
			</Box>
		</Stack>
	);
};
