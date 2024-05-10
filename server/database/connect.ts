import mongoose from 'mongoose';

const dbUrl = import.meta.env.DB_URL;

export async function connect() {
	try {
		console.log('Connecting to database', dbUrl);
		await mongoose.connect(dbUrl, { autoIndex: false });
		console.log('Connected to database');
	} catch (error) {
		console.error('Error connecting to database:', error);
		process.exit(1);
	}
}
