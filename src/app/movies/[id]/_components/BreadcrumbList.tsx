'use client';

import { Box } from '@yamada-ui/react';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export const BreadcrumbList = () => {
	const { id } = useParams();

	return (
		<div
			style={{
				width: '100%',
				height: '30px',
				marginTop: '15px',
				borderRadius: '2px',
				backgroundColor: '#111',
			}}
		>
			<p
				style={{
					paddingLeft: '10px',
					fontSize: '16px',
					lineHeight: '1.8',
					color: '#fff',
				}}
			>
				<Link href="/" passHref>
					<span
						style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
					>
						トップページ
					</span>
				</Link>
				{' > '}
				<Link href="/movies" passHref>
					<span
						style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
					>
						作品案内
					</span>
				</Link>
				{' > '}
				<Link href={`/movies/${id}`} passHref>
					<span
						style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
					>
						作品詳細
					</span>
				</Link>
			</p>
		</div>
	);
};
