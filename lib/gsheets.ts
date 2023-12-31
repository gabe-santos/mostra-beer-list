import { google } from 'googleapis';

export async function getGoogleSheetsData(range: string) {
	const auth = await google.auth.getClient({
		projectId: 'mostra-beer-list',
		credentials: {
			type: 'service_account',
			private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY?.split(
				String.raw`\n`
			).join('\n'),
			client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
			client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
			token_url: 'https://oauth2.googleapis.com/token',
			universe_domain: 'googleapis.com',
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const data = await sheets.spreadsheets.values.get({
		spreadsheetId: '1grWFl0X6Ur5RHxcTB3BmxjkKmY91MCdr2IYQ9c_HHVI',
		range,
	});

	console.log(data.data.values);

	return data.data.values;
}
