import { model, Schema, type InferSchemaType } from 'mongoose';
import { Application } from './Application';

const userSchema = new Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		username: { type: String },
		phone: { type: String },
		otpSecret: { type: String },

		firstName: { type: String },
		lastName: { type: String },

		applications: [{ type: Schema.Types.ObjectId, ref: Application }],
	},
	{
		_id: true,
		timestamps: true,
	},
);

export type User = InferSchemaType<typeof userSchema>;
export const User = model('User', userSchema);
