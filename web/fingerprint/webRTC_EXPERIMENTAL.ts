// reference - biri on github

interface PromiseLike {
	resolve: (_id: string) => void;
	reject: (message: string) => void;
}

let _id: string;

const promises: PromiseLike[] = [];

let connection: RTCPeerConnection;

function resolvePromises(value: string) {
	_id = value;
	promises.forEach(({ resolve }) => resolve(_id));
	promises.length = 0;
	connection.removeEventListener('icecandidate', onIceCandidate);
}

function onIceCandidate({ candidate }: RTCPeerConnectionIceEvent) {
	if (connection.iceGatheringState === 'complete' && _id == null) {
		// cleanup
		connection = null as unknown as RTCPeerConnection;
		promises.forEach(({ reject }) =>
			reject(
				'This browser is not supported, so WebRTC2 cannot provide a unique, static ID for this machine.',
			),
		);
		promises.length = 0;

		return;
	}

	if (!candidate) {
		return;
	}

	// For Chrome
	if (candidate.foundation) {
		return resolvePromises(candidate.foundation);
	}

	// For Safari
	if (candidate.candidate) {
		const matches = /^candidate:(\d+)\s/.exec(candidate.candidate);
		if (!matches || matches[1].length < 2) {
			return;
		}

		return resolvePromises(matches[1]);
	}
}

async function startConnection() {
	if (connection) {
		return;
	}

	connection = new RTCPeerConnection();

	// Required for Safari, causes an error on some other browsers.
	try {
		const stream = document.createElement('canvas').captureStream();
		stream.getTracks().forEach((track) => connection.addTrack(track));
	} catch (_) {}

	connection.addEventListener('icecandidate', onIceCandidate);

	const offer = await connection.createOffer({
		offerToReceiveAudio: false,
		offerToReceiveVideo: true,
	});

	connection.setLocalDescription(offer);
}

async function WebRTCUniqueId() {
	if (typeof RTCPeerConnection === 'undefined') {
		throw new Error(
			"This browser doesn't support WebRTC, so webRTC cannot provide a unique, static ID for this machine.",
		);
	}

	if (_id) {
		return _id;
	}

	const promise = new Promise<string>((resolve, reject) => {
		startConnection();
		promises.push({ resolve, reject });
	});

	return promise;
}

export { WebRTCUniqueId };
