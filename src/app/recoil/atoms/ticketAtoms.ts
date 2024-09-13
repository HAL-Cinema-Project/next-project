import { atom } from 'recoil';

export const totalPriceState = atom({
	key: 'totalPriceState',
	default: 0,
});

export const seatState = atom({
	key: 'seatState',
	default: {},
});

export const seatCountState = atom({
	key: 'seatCountState',
	default: 0,
});

export const normalTicketState = atom({
	key: 'normalTicketState',
	default: 0,
});

export const univTicketState = atom({
	key: 'univTicketState',
	default: 0,
});

export const highSchoolTicketState = atom({
	key: 'highSchoolTicketState',
	default: 0,
});

export const childTicketState = atom({
	key: 'childTicketState',
	default: 0,
});
