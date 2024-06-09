import type { Bucket } from '../models';

export function getBuckets(): Bucket[] {
	try {
		const buckets = localStorage.getItem('buckets');

		const parsedBucket = JSON.parse(buckets ?? '[]') as Bucket[];

		return parsedBucket;
	} catch (_) {
		return [];
	}
}
