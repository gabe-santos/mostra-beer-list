import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
	const range = 'Sheet1!A2:G9';

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
		spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
		range,
	});

	return NextResponse.json(data.data.values);
};
