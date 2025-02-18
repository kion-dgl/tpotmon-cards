/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

interface TwitterApiResponse {
	status: string;
	msg: string;
	data: {
		id: string;
		name: string;
		userName: string;
		location: string;
		url: string;
		description: string;
		protected: boolean;
		isVerified: boolean;
		isBlueVerified: boolean;
		followers: number;
		following: number;
		favouritesCount: number;
		statusesCount: number;
		mediaCount: number;
		createdAt: string;
		coverPicture: string;
		profilePicture: string;
		canDm: boolean;
		isAutomated: boolean;
		automatedBy: string | null;
	};
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const username = url.searchParams.get('username');
		const twitterApiKey = env.TWITTER_API_KEY;

		if (!username) {
			return new Response(JSON.stringify({ error: 'Username is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		try {
			const apiUrl = `https://api.twitterapi.io/twitter/user/info?userName=${username}`;
			const twitterResponse = await fetch(apiUrl, {
				method: 'GET',
				headers: { 'X-API-Key': twitterApiKey },
			});

			if (!twitterResponse.ok) {
				throw new Error(`Twitter API request failed with status ${twitterResponse.status}`);
			}

			const twitterApiResponse = (await twitterResponse.json()) as TwitterApiResponse;
			const { data } = twitterApiResponse;

			if (!data) {
				throw new Error('No data received from Twitter API');
			}

			// Convert images to base64
			const profileUrl = data.profilePicture.replace('_normal', '_400x400');
			const profilePictureBase64 = await convertToBase64(profileUrl);
			const coverPictureBase64 = await convertToBase64(data.coverPicture);

			// Return only the requested fields
			const response = {
				name: data.name,
				username: data.userName,
				isBlueVerified: data.isBlueVerified,
				followers: data.followers,
				following: data.following,
				profilePicture: profilePictureBase64,
				coverPicture: coverPictureBase64,
			};

			return new Response(JSON.stringify(response), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
		} catch (error) {
			console.error(error);
			return new Response(JSON.stringify({ error: 'Failed to fetch data from Twitter API' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
} satisfies ExportedHandler<Env>;

// Helper function to fetch an image and convert it to a base64 string
async function convertToBase64(imageUrl: string): Promise<string> {
	try {
		const imageResponse = await fetch(imageUrl);
		if (!imageResponse.ok) {
			throw new Error(`Failed to fetch image at ${imageUrl}`);
		}

		const arrayBuffer = await imageResponse.arrayBuffer();
		const byteArray = new Uint8Array(arrayBuffer);

		// Convert in chunks to avoid exceeding the stack size
		let chunkSize = 8192; // Process 8192 bytes at a time
		let base64String = '';
		for (let i = 0; i < byteArray.length; i += chunkSize) {
			const chunk = byteArray.slice(i, i + chunkSize);
			base64String += String.fromCharCode(...chunk);
		}

		const mimeType = imageResponse.headers.get('Content-Type') || 'image/jpeg';
		return `data:${mimeType};base64,${btoa(base64String)}`;
	} catch (error) {
		console.error(`Error converting image to base64: ${error}`);
		return '';
	}
}

interface Env {
	TWITTER_API_KEY: string;
}
