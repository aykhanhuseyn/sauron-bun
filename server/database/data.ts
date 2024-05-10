import type { User, Application, LogEvent } from '../models';

export const applications: Application[] = [
	{
		name: 'Demo Application',
		authKey: 'demo',
		url: 'https://demo.sauron.com',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export const users: User[] = [
	{
		email: 'user@sauron.com',
		password: 'password',
		username: 'user',
		phone: '1234567890',
		otpSecret: 'secret',
		firstName: 'John',
		lastName: 'Doe',
		applications: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export const event: LogEvent = {
	coordinates: {
		x: 0,
		y: 0,
	},
	dimensions: {
		w: 100,
		h: 100,
	},
	eventType: 'click',
	identifier: 'button',
	createdAt: new Date(),
	updatedAt: new Date(),
	meta: {
		message: 'Button clicked',
	},
};
