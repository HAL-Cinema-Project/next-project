export interface Movie {
	movie_id: number;
	movie_name: string;
	category_id: number;
	movie_time: number;
	movie_detail: string;
	movie_image1: string;
	movie_image2: string;
	movie_cast: string;
	movie_director: string;
	movie_start_date: string;
	movie_end_date: string;
}
export interface Inquiry {
	inquiry_id: number;
	inquiry_subject: string;
	inquiry_content: number;
	inquiry_email: number;
	created_at: string;
	inquiry_category: string;
	inquiry_comp: boolean;
}
