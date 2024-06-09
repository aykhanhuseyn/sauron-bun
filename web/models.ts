import type { LogEvent } from '../server/models';

export interface Bucket extends LogEvent {
	sent: boolean;
}

declare global {
	interface Screen {
		isExtended: boolean;
	}

	interface Navigator {
		gpu: Gpu;
		connection?: NetworkInformation;
		buildID: string;
	}

	interface Gpu {
		wgslLanguageFeatures: {
			size: number;
		};
		requestAdapter: () => Promise<GPUAdapterInfo>;
	}

	interface GPUAdapterInfo {
		architecture: string;
		description: string;
		device: string;
		vendor: string;
	}

	interface NetworkInformation {
		downlink: number;
		effectiveType: string;
		rtt: number;
		saveData: boolean;
	}
}
