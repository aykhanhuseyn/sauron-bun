export function getBrowserData() {
	let browser = 'Browser';
	switch (true) {
		case 'brave' in navigator: {
			browser = 'Brave;';
			break;
		}
		case 'chrome' in navigator: {
			browser = 'Chrome;';
			break;
		}
		case 'safari' in navigator: {
			browser = 'Safari;';
			break;
		}
		case 'netscape' in window: {
			browser = 'Firefox;';
			break;
		}
		default: {
			browser = 'Browser;';
			break;
		}
	}

	return {
		appCodeName: navigator.appCodeName,
		appName: navigator.appName,
		appVersion: navigator.appVersion,
		browser,
		buildID: navigator.buildID,
		cookieEnabled: navigator.cookieEnabled,
		isStandalone: window.matchMedia('(display-mode: standalone)').matches,
		platform: navigator.platform,
		product: navigator.product,
		productSub: navigator.productSub,
		language: navigator.language,
		languages: navigator.languages,
		maxTouchPoints: navigator.maxTouchPoints,
		userAgent: navigator.userAgent,
		vendor: navigator.vendor,
	};
}
