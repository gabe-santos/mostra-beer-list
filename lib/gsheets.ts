import { google } from 'googleapis';

export async function getGoogleSheetsData(range: string) {
	const auth = await google.auth.getClient({
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
