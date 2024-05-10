import { Application, User, LogEvent } from '../models';
import { applications, users, event } from './data';

export async function seed() {
	try {
		let app = await Application.findOne({ authKey: applications[0].authKey });
		if (!app) {
			app = (await Application.insertMany(applications))[0];
		}
		const user = await User.findOne({ email: users[0].email });
		if (!user) {
			await User.insertMany(
				users.map((user) => ({ ...user, applications: [app._id] })),
			);
		}
		const logEvent = LogEvent.findOne(event);
		if (!logEvent) {
			await LogEvent.create({
				identifier: event.identifier,
				application: app._id,
			});
		}
	} catch (error) {
		console.error('Error seeding database:', error);
	}
}
