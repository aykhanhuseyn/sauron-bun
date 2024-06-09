import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import { etag } from 'hono/etag';
import { jwt } from 'hono/jwt';
import { logger } from 'hono/logger';
import { poweredBy } from 'hono/powered-by';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { Application } from 'models/Application';
// import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie'
// https://hono.dev/middleware/builtin/compress
// import { compress } from 'hono/compress'

type Variables = {
  message: string
}

const app = new Hono<{ Variables: Variables }>()

app.use(cors({ origin: '*' }));
app.use(secureHeaders());
app.use(poweredBy());
app.use(trimTrailingSlash());
app.use(prettyJSON());
app.use(etag());
app.use(logger());

app.use(
	'/api/*',
	jwt({
		secret: 'it-is-very-secret',
		cookie: 'sauron-token',
		alg: 'HS256',
	}),
);

app.post('/api/v1/login', (context) => {
	console.log('login', context);

	return context.json({ token: 'token' });
});

app.get('/demo', serveStatic({ root: '../demo' }));

app.get('/app', async (context) => {
	const { pi: projectId } = context.req.query;
	const project = await Application.findById(projectId);
	return context;
});

app.post('/api/v1/report', (context) => {
	console.log('report', context);
	return context.text('reported');
});

// app.get('/app', (context) => {
// 	console.log({ context})
// 	const application = await Application.findById(projectId);

// 	if (
// 		application &&
// 		[application.url, 'https://localhost:8000/demo'].includes(referrer as string)
// 	) {
// 		return new Response(file('../web/dist/index.js'), { status: 200 });
// 	}
// });

// app.get('/', (context) => {
// 	if (Math.random() > 0.6) {
// 		context.status(401).json({ message: 'Hello, World!' });
// 		return context.status(401).text('Unauthorized');
// 	}
// 	return res.status(200).json({
// 		projectId,
// 		ip,
// 		referrer,
// 		agent: agent.toJSON(),
// 	});
// });

export default app;
