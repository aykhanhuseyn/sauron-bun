import { Application, LogEvent, User } from '../models';
import { applicationData, eventData, userData } from './data';

export async function seed() {
	try {
		let user = await User.findOne({ email: userData.email });
		if (!user) {
			user = await User.create(userData);
		}

		let app = await Application.findOne({ authKey: applicationData.authKey });
		if (!app) {
			app = await Application.create({
				...applicationData,
				owner: user._id,
				users: [user._id],
			});
			user.applications.push(app._id);
			user.save();
		}

		const logEvent = LogEvent.findOne({ identifier: eventData.identifier });
		if (!logEvent) {
			await LogEvent.create({
				...eventData,
				application: app._id,
			});
		}
	} catch (error) {
		console.error('Error seeding database:', error);
	}
}
