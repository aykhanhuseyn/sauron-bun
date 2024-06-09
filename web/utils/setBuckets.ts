import type { Bucket } from '../models';

export function setBuckets(buckets: Bucket[]) {
	localStorage.setItem('buckets', JSON.stringify(buckets));
}
