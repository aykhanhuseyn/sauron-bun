import type { LogEvent } from '../server/models';

export interface Bucket extends LogEvent {
	sent: boolean;
}
