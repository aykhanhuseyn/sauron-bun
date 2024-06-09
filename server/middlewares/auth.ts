import { createMiddleware } from 'hono/factory';

export const script = createMiddleware((context, next) => {
	const productId = context.req.url.searchParams.get('pi');
	next();
});
