// import { load } from './fp';
import { getCurrentBrowserFingerPrint } from './fingerprint';
import { getBuckets } from './utils/getBuckets';
import { getMetaData } from './utils/getMetadata';
import { setBuckets } from './utils/setBuckets';

const src = (document.currentScript as HTMLScriptElement)?.src;
const url = new URL(src);
const projectId = url.searchParams.get('pi');
const origin = url.origin;

// const fingerprint = ''; // await fp.load();
// console.log({ fingerprint });
// load().then((fp: { get: () => Promise<{ visitorId: string }> }) =>
// 	fp.get().then((fp) => {
// 		console.log(fp.visitorId);
// 	}),
// );

// const fingerprint = await getCurrentBrowserFingerPrint();

let fingerprint = '';
getCurrentBrowserFingerPrint().then((fp) => {
	fingerprint = fp;
});

if (!projectId) {
	throw new Error('Sauron Project ID not provided!');
}

const interval = setInterval(() => {
	const buckets = getBuckets();

	const bucketsNoSent = buckets.filter((bucket) => !bucket.sent);

	setBuckets(bucketsNoSent);

	const promises = bucketsNoSent.map((bucket) =>
		fetch(`${origin}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bucket),
		})
			.then((response) => {
				if (response.status === 200) {
					bucket.sent = true;
					return;
				}
				if (response.status === 401) {
					clearInterval(interval);
					throw new Error('Unauthorized');
				}
			})
			.catch((error) => {
				clearInterval(interval);
				throw new Error(error);
			}),
	);

	Promise.allSettled(promises).then((response) => {
		console.log({ buckets, promises, response });
		setBuckets(buckets);
	});
}, 30000);

document.addEventListener('click', (event) => {
	const target = event.target as HTMLElement;

	if (!target || target.getAttribute('data-sauron-id') === null) {
		return;
	}

	const metaData = getMetaData(target);

	const buckets = getBuckets();
	const bucketsClone = buckets.slice();

	let bucketIndex = buckets.findIndex(
		(bucket) => bucket.identifier === metaData['data-sauron-id'],
	);
	bucketIndex = bucketIndex === -1 ? buckets.length : bucketIndex;

	const identifier = `${fingerprint}-${Math.random()
		.toString(36)
		.substring(7)}-${Date.now()}`;

	bucketsClone.push({
		coordinates: {
			x: event.clientX,
			y: event.clientY,
		},
		dimensions: {
			h: target.clientHeight,
			w: target.clientWidth,
		},
		createdAt: new Date(),
		eventType: 'click',
		updatedAt: new Date(),
		meta: metaData,
		fingerprint,
		application: projectId as unknown as undefined,
		identifier,
		sent: false,
	});

	localStorage.setItem('buckets', JSON.stringify(bucketsClone));
});

document.addEventListener('error', () => {});

document.addEventListener('resize', () => {});

document.addEventListener('keypress', () => {});

document.addEventListener('mousemove', () => {});

document.addEventListener('DOMContentLoaded', () => {});

document.addEventListener('touchstart', () => {});

document.addEventListener('touchmove', () => {});

document.addEventListener('touchend', () => {});
