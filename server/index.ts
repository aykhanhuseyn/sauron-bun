import { file, serve } from 'bun';
import { connect, seed } from 'database';
import { Application } from 'models';
import useragent from 'useragent';

await connect();
await seed();

serve({
	tls: {
		cert: file('./server.crt'),
		key: file('./server.key'),
	},
	async fetch(req, server) {
		const agent = useragent.parse(req.headers.get('user-agent') || '');
		const os = agent.os.family;
		const osVersion = agent.os.toVersion();
		const device = agent.device.family;
		const deviceVersion = agent.device.toVersion();
		const browser = agent.family;
		const browserVersion = agent.toVersion();
		const source = agent.source;

		const url = new URL(req.url);
		const ip = server.requestIP(req);
		const referrer = req.headers.get('referer');
		const projectId = url.searchParams.get('pi');
		// const cookies = req.headers.getAll('set-cookie');

		console.log('-----------------', {
			// ip,
			// referrer,
			// cookies,
			// projectId,
			os,
			osVersion,
			device,
			deviceVersion,
			browser,
			browserVersion,
			source,
		});

		switch (url.pathname) {
			case '/': {
				return new Response(
					JSON.stringify({
						projectId,
						ip,
						referrer,
						agent: agent.toJSON(),
					}),
					{
						status: 200,
					},
				);
			}
			case '/app': {
				switch (req.method) {
					case 'GET': {
						const app = await Application.findById(projectId);

						if (app && app.url === referrer) {
							return new Response(file('../web/dist/index.js'), { status: 200 });
						}
						return new Response('Application not found!', { status: 404 });
					}
					default:
						return new Response('Method not handled!', { status: 500 });
				}
			}
			// TODO: remove demo endpoint
			case '/demo': {
				return new Response(file('../demo/index.html'), { status: 200 });
			}
			case '/api/v1/report': {
				switch (req.method) {
					case 'POST': {
						return new Response('Message saved!', { status: 200 });
					}
					default:
						return new Response('Method not handled!', { status: 500 });
				}
			}
			default:
				return new Response('Endpoint not handled!', { status: 500 });
		}
	},
	serverName: 'Sauron Server',
});
