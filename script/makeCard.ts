import "dotenv/config"; // Load environment variables
import axios from "axios";
import fs from "fs-extra";
import sharp from "sharp";
import { OpenAI } from "openai";

// Constants (non-sensitive)
const TWITTER_API_BASE = "https://api.twitterapi.io/twitter";
const OPENAI_ASSISTANT_ID = "asst_0n1hLhZIKNqVhVyuo2IfeAGA";

// Sensitive API Keys from .env
const TWITTER_API_KEY = process.env.TWITTER_API_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

// OpenAI client
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Get username from command-line arguments
const username = process.argv[2];

if (!username) {
  console.error("Usage: bun makeCard.ts [username]");
  process.exit(1);
}

async function fetchTwitterData(username: string) {
  if (!TWITTER_API_KEY) {
    console.error("❌ TWITTER_API_KEY is missing from .env!");
    process.exit(1);
  }

  try {
    console.log(`📡 Fetching data for @${username}...`);
    console.log(`🔑 Using API Key: ${TWITTER_API_KEY.slice(0, 4)}... (hidden for security)`);

    const headers = { "X-API-Key": TWITTER_API_KEY }; // ✅ Correct capitalization

    const userInfo = await axios.get(`${TWITTER_API_BASE}/user/info?userName=${username}`, {
      headers,
    });

    const userTweets = await axios.get(`${TWITTER_API_BASE}/user/last_tweets?userName=${username}`, {
      headers,
    });

    return { user: userInfo.data.data, tweets: userTweets.data.tweets };
  } catch (error) {
    console.error(`❌ Error fetching Twitter data for ${username}:`, error.response?.data || error.message);
    process.exit(1);
  }
}

// Convert image URL to base64
async function fetchBase64Image(url: string) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`;
  } catch (error) {
    console.warn(`⚠️ Warning: Failed to fetch image from ${url}`);
    return null;
  }
}

// Generate a tpotmon card using OpenAI Assistant
async function generateCard(userData: any) {
  const structuredData = {
    name: userData.user.name,
    username: userData.user.userName,
    followers: userData.user.followers,
    following: userData.user.following,
    isBlueCheck: userData.user.isBlueVerified,
    tweetCount: userData.user.statusesCount,
    recentTweets: userData.tweets.slice(0, 100).map((tweet: any) => ({
      text: tweet.text,
      likes: tweet.likeCount,
      retweets: tweet.retweetCount,
      replies: tweet.replyCount,
      views: tweet.viewCount,
    })),
  };

  try {
    console.log("🤖 Sending data to OpenAI Assistant...");
    const thread = await openai.beta.threads.create({
      messages: [{ role: "user", content: JSON.stringify(structuredData) }],
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: OPENAI_ASSISTANT_ID,
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(thread.id);
      const aiResponse = messages.data[0]?.content[0]?.text;
      return JSON.parse(aiResponse);
    }
  } catch (error) {
    console.error("❌ Error generating card:", error.response?.data || error.message);
    process.exit(1);
  }
}

// Save card data to a file
async function saveCard(username: string, cardData: any) {
  const dir = "./cards";
  const filePath = `${dir}/${username}.json`;

  try {
    await fs.ensureDir(dir);
    await fs.writeJson(filePath, cardData, { spaces: 2 });
    console.log(`✅ Card saved: ${filePath}`);
  } catch (error) {
    console.error("❌ Error saving card:", error.message);
    process.exit(1);
  }
}

// Main Execution
(async () => {
  const twitterData = await fetchTwitterData(username);

  console.log("🖼️ Converting profile images to base64...");
  const enrichedData = {
    ...twitterData.user,
    profilePic: await fetchBase64Image(twitterData.user.profilePicture),
    profileBanner: await fetchBase64Image(twitterData.user.coverPicture),
  };

  console.log("🤖 Generating tpotmon card...");
  const card = await generateCard(twitterData);

  console.log("💾 Saving card...");
  await saveCard(username, { ...card, ...enrichedData });

  console.log("🎴 Done! Check the 'cards' folder.");
})();

