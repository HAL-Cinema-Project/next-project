import { Pool } from 'pg';

declare global {
	var pgPool: Pool | undefined;
}

// Pool インスタンスを作成または再利用
const pool =
	global.pgPool ||
	new Pool({
		max: 10,
		idleTimeoutMillis: 30000,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
		database: process.env.DB_NAME,
	});

if (process.env.NODE_ENV !== 'production') {
	global.pgPool = pool;
}

export default pool;
