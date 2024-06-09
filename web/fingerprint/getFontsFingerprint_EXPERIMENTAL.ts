// Add font detection to fingerprint
const fonts = [
	'Arial',
	'Helvetica',
	'Times New Roman',
	'Courier New',
	'Verdana',
	'Georgia',
	'Palatino',
	'Garamond',
	'Bookman',
	'Avant Garde',
	'Comic Sans MS',
	'Candara',
	'Century Gothic',
	'Franklin Gothic Medium',
	'Lucida Grande',
	'Tahoma',
	'Geneva',
	'Lucidatypewriter',
	'Monaco',
	'Courier',
	'Courier New',
	'Lucida Console',
];

export function getFontsFingerprint() {
	const availableFonts = fonts.filter((font) =>
		document.fonts.check(`12px ${font}`),
	);

	return availableFonts;
}
