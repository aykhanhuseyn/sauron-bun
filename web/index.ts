import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';
import { getBuckets, setBuckets, getMetaData } from './utils';

const src = (document.currentScript as HTMLScriptElement)?.src;
const url = new URL(src);
const projectId = url.searchParams.get('pi');
const origin = url.origin;

if (!projectId) {
	throw new Error('Sauron Project ID not provided!');
}

const interval = setInterval(() => {
	const buckets = getBuckets();

	const bucketsNoSent = buckets.filter((bucket) => !bucket.sent);

	setBuckets(bucketsNoSent);

	const promises = bucketsNoSent.map(
		(bucket) => () =>
			fetch(`${origin}/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bucket),
			}).then((response) => {
				if (response.status === 200) {
					bucket.sent = true;
					return;
				}
				if (response.status === 401) {
					clearInterval(interval);
					throw new Error('Unauthorized');
				}
			}),
	);

	Promise.allSettled(promises).then(() => {
		setBuckets(buckets);
	});
}, 30000);

document.addEventListener('click', (event) => {
	if (!(event.target instanceof HTMLElement)) {
		return;
	}

	const target = event.target as HTMLElement;

	const metaData = getMetaData(target);

	const buckets = getBuckets();
	const bucketsClone = buckets.slice();

	const bucketIndex = buckets.findIndex(
		(bucket) => bucket.identifier === metaData.id,
	);
	bucketsClone[bucketIndex] = {
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
		identifier: metaData.id!,
	};

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
