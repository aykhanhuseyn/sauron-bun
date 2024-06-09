import { createMiddleware } from 'hono/factory';
import useragent from 'useragent';

interface Context {
	agent: useragent.Agent;
}

export const device = createMiddleware<{ Bindings: Context }>((c, next) => {
	const agent = useragent.parse(c.req.header('user-agent') || '');
	next();
});
