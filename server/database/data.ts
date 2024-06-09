import type { Application, LogEvent, User } from '../models';

export const userData: User = {
	email: 'user@sauron.com',
	password: 'password',
	username: 'user',
	phone: '1234567890',
	otpSecret: 'secret',
	firstName: 'John',
	lastName: 'Doe',
	applications: [],
	forcePasswordChange: false,
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const applicationData: Application = {
	users: [],
	name: 'Demo Application',
	authKey: 'demo',
	url: 'https://demo.sauron.com',
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const eventData: LogEvent = {
	coordinates: {
		x: 0,
		y: 0,
	},
	dimensions: {
		w: 100,
		h: 100,
	},
	fingerprint: 'fingerprint',
	eventType: 'click',
	identifier: 'button',
	createdAt: new Date(),
	updatedAt: new Date(),
	meta: {
		message: 'Button clicked',
	},
};
