declare module 'bun' {
	interface Env {
		DB_USER: string;
		DB_PASSWORD: string;
		DB_HOST: string;
		DB_PORT: string;
		DB_URL: string;
		BUN_PORT: string;
	}
}
