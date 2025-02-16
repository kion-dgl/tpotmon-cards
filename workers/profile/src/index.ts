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
			// Make the call to the Twitter API
			const apiUrl = `https://api.twitterapi.io/twitter/user/info?userName=${username}`;
			const response = await fetch(apiUrl, {
				method: 'GET',
				headers: {
					'X-API-Key': twitterApiKey,
				},
			});

			// Check if the response is OK
			if (!response.ok) {
				throw new Error(`Twitter API request failed with status ${response.status}`);
			}

			// Parse the response
			const data = await response.json();

			// Return the data as JSON
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
		} catch (error) {
			console.error(error); // Log the error to Wrangler console
			return new Response(JSON.stringify({ error: 'Failed to fetch data from Twitter API' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
} satisfies ExportedHandler<Env>;

interface Env {
	TWITTER_API_KEY: string;
}
