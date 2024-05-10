import { Schema, model, type InferSchemaType } from 'mongoose';
import { Application } from './Application';

const logEventSchema = new Schema(
	{
		application: { type: Schema.Types.ObjectId, ref: Application },
		dimensions: { type: { w: Number, h: Number }, required: true },
		coordinates: { type: { x: Number, y: Number }, required: true },
		eventType: { type: String, required: true },
		identifier: { type: String, required: true },
		meta: { type: Schema.Types.Mixed },
		fingerprint: { type: String, required: true },
		referrer: { type: String },
		ip: { type: String },
		agent: {
			source: { type: String },
			browser: { type: String },
			browserVersion: { type: String },
			os: { type: String },
			osVersion: { type: String },
			device: { type: String },
		},
	},
	{
		_id: true,
		timestamps: true,
	},
);

export type LogEvent = InferSchemaType<typeof logEventSchema>;
export const LogEvent = model('LogEvent', logEventSchema);
