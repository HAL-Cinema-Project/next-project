export type User = {
	user_id: string;
	first_name: string;
	last_name: string;
	schedule_id: number | null;
	e_mail: string;
	password: string;
	birthday: string;
	gender: string;
};

export type Movie = {
	movie_id: number;
	movie_name: string;
	movie_image: string;
};

export type Seat = {
	seat_id: number;
	seat_point: string;
};

export type MovieTime = {
	time_id: number;
	movie_start: string;
};

export type Schedule = {
	schedule_id: number;
	screen_id: number;
	movie_id: number;
	seat_id: number;
	time_id: number;
	movie: Movie;
	movie_time: MovieTime;
	seat: Seat;
};
