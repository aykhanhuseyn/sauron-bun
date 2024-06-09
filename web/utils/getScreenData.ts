export function getScreenData() {
	return {
		width: screen.width,
		height: screen.height,
		availWidth: screen.availWidth,
		availHeight: screen.availHeight,
		innerWidth: window.innerWidth,
		innerHeight: window.innerHeight,
		outerWidth: window.outerWidth,
		outerHeight: window.outerHeight,
		colorDepth: screen.colorDepth,
		pixelDepth: screen.pixelDepth,
		isExtended: screen.isExtended,
		orientationType: screen.orientation.type,
		orientationAngle: screen.orientation.angle,
		maxTouchPoints: navigator.maxTouchPoints,
		devicePixelRatio: devicePixelRatio,
	};
}
