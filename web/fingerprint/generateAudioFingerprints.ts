export const generateAudioFingerPrint = (() => {
	let context: OfflineAudioContext;
	let oscillator: OscillatorNode;
	let compressor: DynamicsCompressorNode;
	let currentTime = 0;
	let fingerprint = '';
	let callback: Cb;

	function run(cb: Cb, debug = false) {
		callback = cb;

		try {
			setup();

			oscillator.connect(compressor);
			compressor.connect(context.destination);

			oscillator.start(0);
			context.startRendering();

			context.oncomplete = onComplete;
		} catch (e) {
			if (debug) {
				throw e;
			}
		}
	}

	function setup() {
		setContext();
		currentTime = context.currentTime;
		setOscillator();
		setCompressor();
	}

	function setContext() {
		const AudioContext =
			'webkitOfflineAudioContext' in window
				? (window.webkitOfflineAudioContext as typeof window.OfflineAudioContext)
				: window.OfflineAudioContext;
		context = new AudioContext(1, 44100, 44100);
	}

	function setOscillator() {
		oscillator = context.createOscillator();
		oscillator.type = 'triangle';
		oscillator.frequency.setValueAtTime(10000, currentTime);
	}

	function setCompressor() {
		compressor = context.createDynamicsCompressor();

		setCompressorValueIfDefined('threshold', -50);
		setCompressorValueIfDefined('knee', 40);
		setCompressorValueIfDefined('ratio', 12);
		setCompressorValueIfDefined('reduction', -20);
		setCompressorValueIfDefined('attack', 0);
		setCompressorValueIfDefined('release', 0.25);
	}

	function setCompressorValueIfDefined(item: CompressorValues, value: number) {
		if (typeof compressor[item as 'attack']?.setValueAtTime === 'function') {
			compressor[item as 'attack'].setValueAtTime(value, context.currentTime);
		}
	}

	function onComplete(event: OfflineAudioCompletionEvent) {
		generateFingerprints(event);
		compressor.disconnect();
	}

	function generateFingerprints(event: OfflineAudioCompletionEvent) {
		let output = 0;
		for (let i = 4500; 5e3 > i; i++) {
			const channelData = event.renderedBuffer.getChannelData(0)[i];
			output += Math.abs(channelData);
		}

		fingerprint = output.toString();

		if (typeof callback === 'function') {
			return callback(fingerprint);
		}
	}

	return {
		run: run,
	};
})();

export async function generateAudioFingerprint(debug = false) {
	return new Promise<string>((resolve, reject) => {
		try {
			// set context
			const AudioContext =
				'webkitOfflineAudioContext' in window
					? (window.webkitOfflineAudioContext as typeof window.OfflineAudioContext)
					: window.OfflineAudioContext;
			const context = new AudioContext(1, 44100, 44100);

			const currentTime = context.currentTime;

			const oscillator = context.createOscillator();
			oscillator.type = 'triangle';
			oscillator.frequency.setValueAtTime(10000, currentTime);

			const compressor = context.createDynamicsCompressor();

			compressor.threshold.setValueAtTime(-50, context.currentTime);
			compressor.knee.setValueAtTime(40, context.currentTime);
			compressor.ratio.setValueAtTime(12, context.currentTime);
			(compressor.reduction as unknown as AudioParam)?.setValueAtTime(
				-20,
				context.currentTime,
			);
			compressor.attack.setValueAtTime(0, context.currentTime);
			compressor.release.setValueAtTime(0.25, context.currentTime);

			oscillator.connect(compressor);
			compressor.connect(context.destination);

			oscillator.start(0);
			context.startRendering();

			context.addEventListener('complete', (event) => {
				let output = 0;
				for (let i = 4500; 5e3 > i; i++) {
					const channelData = event.renderedBuffer.getChannelData(0)[i];
					output += Math.abs(channelData);
				}

				compressor.disconnect();
				resolve(output.toString());
			});
		} catch (error) {
			if (debug) {
				reject(error);
			}
		}
	});
}

type Cb = (fingerprint: string) => void;
type CompressorValues =
	| 'attack'
	| 'knee'
	| 'ratio'
	| 'reduction'
	| 'release'
	| 'threshold';
