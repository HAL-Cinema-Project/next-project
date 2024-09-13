// import { MovieCaption } from '@/app/movies/[id]/_components/MovieCaption';
import { ScheduleAccordion } from '@/app/movies/[id]/_components/ScheduleAccordion';
import { TheaterSchedule } from '@/app/theaters/[id]/_components/TheaterSchedule';
import { ThemeSemantics } from '@yamada-ui/react';
import { text } from 'stream/consumers';

export const semantics: ThemeSemantics = {
	colors: {
		primary: 'neutral.950',
		secondary: 'blue.500',

		subHeader: {
			bg: '#fff',
			hoverBg: 'neutral.100',
			hoverBgArrow: 'neutral.900',
			mainText: '#000',
			line: 'neutral.100',
		},
		movieCard: {
			color: ['#000', '#fff'],
			bg: ['#f8f8f8', 'transparent'],
		},
		carousel: {
			bg: ['black', 'blue.700'],
		},
		footer: {
			bg: ['#000', 'blue.500'],
		},

		topSectionHeader: {
			bg: ['black', 'blue.500'],
			hover: ['black', 'blue.500'],
			title: '#fff',
			button: ['blue.500', '#000'],
		},

		breadcrumbList: {
			bg: ['#15202b', 'blue.500'],
		},
		caption: {
			bg: ['#15202b', 'blue.500'],
		},
		scheduleAccordion: {
			bg: ['#15202b', 'transparent'],
			text: ['#FFF', '#FFF'],
		},
		theaterSchedule: {
			bg: ['#f8f8f8', 'transparent'],
		},
	},
	colorSchemes: {
		secondary: 'blue',
	},
};
