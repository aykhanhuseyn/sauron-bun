export function getMetaData(element: HTMLElement) {
	const metaData: Record<'id' | string, string | null> = {};
	const attributes = Array.from(element.attributes);
	for (const key of attributes) {
		metaData[key.nodeName] = key.nodeValue;
	}
	return metaData;
}
