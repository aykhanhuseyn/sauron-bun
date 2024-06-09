/**
 * Determines if the current date is in daylight saving time (DST).
 *
 * @returns {boolean} True if the current date is in DST, false otherwise.
 */
function isDst(): boolean {
	const rightNow = new Date();
	const jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
	let temp = jan1.toISOString();
	const jan2 = new Date(temp.substring(0, temp.length - 1));
	const stdTimeOffset = (jan1.getTime() - jan2.getTime()) / (1000 * 60 * 60);
	const june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
	temp = june1.toISOString();
	const june2 = new Date(temp.substring(0, temp.length - 1));
	const daylightTimeOffset =
		(june1.getTime() - june2.getTime()) / (1000 * 60 * 60);
	return stdTimeOffset === daylightTimeOffset;
}

/**
 * Returns the current timezone.
 *
 * @returns {string} The current timezone.
 */
function getTimezone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Returns the current timezone offset in minutes.
 *
 * @returns {number} The current timezone offset.
 */
function getTimezoneOffset(): number {
	return new Date().getTimezoneOffset();
}

/**
 * Returns a string containing the fingerprints of the current timezone.
 * The fingerprints consist of three components separated by '|':
 * 1. Whether the current timezone is observing daylight saving time (DST).
 * 2. The name of the current timezone.
 * 3. The offset of the current timezone from UTC in minutes.
 *
 * @returns {string} The fingerprints of the current timezone.
 */
export function getTimezoneFingerprints(): string {
	return `${isDst()}|${getTimezone()}|${getTimezoneOffset()}`;
}

/**
 * Returns an object containing information about the current timezone.
 *
 * @returns {Object} The timezone data object.
 * @property {boolean} isDst - Indicates whether the current timezone is in daylight saving time.
 * @property {string} timezone - The name of the current timezone.
 * @property {number} timezoneOffset - The offset in minutes between the current timezone and UTC.
 */
export function getTimezoneData() {
	return {
		isDst: isDst(),
		timezone: getTimezone(),
		timezoneOffset: getTimezoneOffset(),
	};
}
