import type { Bucket } from './models';

export function getBuckets(): Bucket[] {
	try {
		const buckets = localStorage.getItem('buckets');

		const parsedBucket = JSON.parse(buckets!) as Bucket[];

		return parsedBucket;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function setBuckets(buckets: Bucket[]) {
	localStorage.setItem('buckets', JSON.stringify(buckets));
}

export function getMetaData(element: HTMLElement) {
	const metaData: Record<'id' | string, string | null> = {};
	const attributes = Array.from(element.attributes);
	for (const key of attributes) {
		metaData[key.nodeName] = key.nodeValue!;
	}
	return metaData;
}
