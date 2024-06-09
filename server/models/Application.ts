import { type InferSchemaType, Schema, model } from 'mongoose';

const applicationSchema = new Schema(
	{
		name: { type: String, required: true },
		url: { type: String, required: true },
		authKey: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, ref: 'User' },
		users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	},
);

export type Application = InferSchemaType<typeof applicationSchema>;
export const Application = model('Application', applicationSchema);
