import { type InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		forcePasswordChange: { type: Boolean, default: false },

		firstName: { type: String },
		lastName: { type: String },
		username: { type: String },
		phone: { type: String },
		otpSecret: { type: String },

		applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }],
	},
	{
		_id: true,
		timestamps: true,
	},
);

export type User = InferSchemaType<typeof userSchema>;
export const User = model('User', userSchema);
