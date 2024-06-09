// https://github.com/artem0/canvas-fingerprinting/blob/master/hash/murmurhash3.js
// output - 3705295134 a hashed number of the string.
// https://en.wikipedia.org/wiki/MurmurHash
// murmurHash v3 32bit gc version
export function murmurHash(key: string, seed = 0) {
	const remainder = key.length & 3; // key.length % 4
	const bytes = key.length - remainder;
	let h1 = seed;
	let h1b: number;
	const c1 = 0xcc9e2d51;
	const c2 = 0x1b873593;
	let k1 = 0;
	let i = 0;

	while (i < bytes) {
		k1 =
			(key.charCodeAt(i) & 0xff) |
			((key.charCodeAt(++i) & 0xff) << 8) |
			((key.charCodeAt(++i) & 0xff) << 16) |
			((key.charCodeAt(++i) & 0xff) << 24);
		++i;

		k1 =
			((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 =
			((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;

		h1 ^= k1;
		h1 = (h1 << 13) | (h1 >>> 19);
		h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
		h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
	}

	k1 = 0;

	switch (remainder) {
		case 3: {
			k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
			break;
		}
		case 2: {
			k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
			break;
		}
		case 1: {
			k1 ^= key.charCodeAt(i) & 0xff;

			k1 =
				((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
			k1 = (k1 << 15) | (k1 >>> 17);
			k1 =
				((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
			h1 ^= k1;
			break;
		}
		default:
			return 0;
	}

	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 =
		((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) &
		0xffffffff;
	h1 ^= h1 >>> 13;
	h1 =
		((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) &
		0xffffffff;
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}

// taken from same above repo
export const javaHashCode = (string: string, K: number) => {
	let hash = 0;
	if (string.length === 0) {
		return hash;
	}
	let char = 0;
	for (let i = 0; i < string.length; i++) {
		char = string.charCodeAt(i);
		hash = K * ((hash << 5) - hash) + char;
		hash &= hash;
	}
	return hash;
};

// reference - https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript#answer-52171480
// output - 6533356943844037
export const cyrb53 = (str: string, seed = 0) => {
	let h1 = 0xdeadbeef ^ seed;
	let h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch = 0; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 =
		Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
		Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 =
		Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
		Math.imul(h1 ^ (h1 >>> 13), 3266489909);
	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
