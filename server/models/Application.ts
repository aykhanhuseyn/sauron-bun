import { Schema, model, type InferSchemaType } from 'mongoose';

const applicationSchema = new Schema(
	{
		name: { type: String, required: true },
		url: { type: String, required: true },
		authKey: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export type Application = InferSchemaType<typeof applicationSchema>;
export const Application = model('Application', applicationSchema);
