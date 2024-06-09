export const isCanvasSupported = () => {
	const elem = document.createElement('canvas');
	return !!elem.getContext?.('2d');
};

export const getCanvasFingerprint = () => {
	if (!isCanvasSupported()) {
		return 'fingerprint';
	}

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
	const txt = 'BrowserLeaks,com <canvas> 1.0';
	ctx.textBaseline = 'top';
	ctx.font = "14px 'Arial'";
	ctx.textBaseline = 'alphabetic';
	ctx.fillStyle = '#f60';
	ctx.fillRect(125, 1, 62, 20);
	ctx.fillStyle = '#069';
	ctx.fillText(txt, 2, 15);
	ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
	ctx.fillText(txt, 4, 17);
	return canvas.toDataURL();
};
