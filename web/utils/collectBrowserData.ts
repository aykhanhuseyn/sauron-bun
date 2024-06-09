import { getBrowserData } from './getBrowserData';
import { getHardwareData } from './getHardwareData';
import { getScreenData } from './getScreenData';
import { getTimezoneData } from './getTimezone';

export async function collectBrowserData(): Promise<BrowserData> {
	const screen = getScreenData();
	const browser = getBrowserData();
	const timezone = getTimezoneData();
	const hardware = await getHardwareData();

	return {
		screen,
		hardware,
		browser,
		timezone,
	};
}

interface BrowserData {
	screen: ReturnType<typeof getScreenData>;
	browser: ReturnType<typeof getBrowserData>;
	timezone: ReturnType<typeof getTimezoneData>;
	hardware: Awaited<ReturnType<typeof getHardwareData>>;
}
