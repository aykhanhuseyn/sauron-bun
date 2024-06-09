import { getBrowserData } from '../utils/getBrowserData';
import { getHardwareData } from '../utils/getHardwareData';
import { getScreenData } from '../utils/getScreenData';
import { getTimezoneFingerprints } from '../utils/getTimezone';
import { cyrb53 } from './crypto';
import { generateAudioFingerPrint } from './generateAudioFingerprints';
import { getCanvasFingerprint } from './getCanvasFingerprint';

/**
 * This functions working
 * @Param {null}
 * @return {Promise<string>} - resolve(string)
 */
export const getCurrentBrowserFingerPrint = (): Promise<string> => {
	/**
	 * @return {Promise<string>} - a frequency number 120.256896523
	 * @reference - https://fingerprintjs.com/blog/audio-fingerprinting/
	 */
	const getAudioPrints = new Promise<string>((resolve) => {
		generateAudioFingerPrint.run((fingerprint) => resolve(fingerprint));
	});

	/**
	 *
	 * @param {null}
	 * @return {Promise<string>} - and sha512 hashed string
	 */
	const DevicePrints = new Promise<string>((resolve, reject) =>
		getAudioPrints
			.then(async (audioFingerprint) => {
				let fingerprint = navigator.userAgent;

				const canvasFingerprint = getCanvasFingerprint();
				fingerprint += `${canvasFingerprint};`;

				const timeZoneFingerprint = getTimezoneFingerprints();
				fingerprint += `${timeZoneFingerprint};`;

				const browser = getBrowserData();
				fingerprint += `${JSON.stringify(browser)};`;

				const screen = getScreenData();
				const screenFingerprint = `${screen.width}${screen.height}${screen.isExtended}${screen.maxTouchPoints}${screen.pixelDepth}${screen.colorDepth}`;
				fingerprint += `${screenFingerprint};`;

				const hardware = await getHardwareData();
				fingerprint += `${JSON.stringify(hardware)};`;

				console.log({
					fingerprint,
					timeZoneFingerprint,
					audioFingerprint,
					canvasFingerprint,
					cyrb53: cyrb53(fingerprint, 0),
				});

				// using btoa to hash the values to looks better readable
				resolve(cyrb53(fingerprint, 0) as unknown as string);
			})
			.catch(() => {
				try {
					// if failed with audio fingerprint then resolve only with canvas fingerprint
					resolve(cyrb53(getCanvasFingerprint()).toString());
				} catch (_) {
					reject('Failed to generate the finger print of this browser');
				}
			}),
	);

	return DevicePrints;
};

declare global {
	interface Navigator {
		brave: {
			isBrave: () => boolean;
		};
	}
}
