export async function getHardwareData() {
	const adapter = await navigator?.gpu?.requestAdapter?.();

	return {
		gpu: {
			vendor: adapter?.vendor,
			architecture: adapter?.architecture,
		},
		cpu: {
			hardwareConcurrency: navigator.hardwareConcurrency,
			platform: navigator.platform,
		},
		ram: 'deviceMemory' in navigator ? (navigator.deviceMemory as number) : 0,
		network: {
			downlink: navigator.connection?.downlink ?? 0,
			effectiveType: navigator.connection?.effectiveType,
			rtt: navigator.connection?.rtt ?? 0,
			saveData: navigator.connection?.saveData ?? false,
		},
	};
}
