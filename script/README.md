### **📄 README for `makeCard.ts`**
```markdown
# `makeCard.ts` - tpotmon Card Generator

This script generates a **tpotmon card** from a **Twitter/X user account** by:
1. **Fetching Twitter profile info** and **recent tweets**.
2. **Analyzing tweet patterns** to generate unique **abilities & attacks**.
3. **Using OpenAI Assistant** (`asst_0n1hLhZIKNqVhVyuo2IfeAGA`) to create a JSON-based card.
4. **Saving the card to a local file** (`./cards/[username].json`).

## 🛠️ **Installation**
Ensure you have **Bun** installed:
```sh
curl -fsSL https://bun.sh/install | bash
```
Then, install dependencies:
```sh
bun add axios openai fs-extra sharp dotenv
```

## ⚙️ **Setup**
1. Create a `.env` file:
   ```sh
   touch .env
   ```
2. Add your API keys:
   ```
   TWITTER_API_KEY=your-twitterapi-io-key
   OPENAI_API_KEY=your-openai-api-key
   ```
3. Ensure `.env` is ignored by Git:
   ```sh
   echo ".env" >> .gitignore
   ```

## 🚀 **Usage**
Run the script with a **Twitter/X username**:
```sh
bun makeCard.ts wagieweeb
```
Example Output:
```sh
📡 Fetching data for @wagieweeb...
✅ Got basic info!
🔄 Fetching more tweets...
✅ 100 tweets fetched!
🤖 Generating tpotmon card...
✅ Card saved: ./cards/wagieweeb.json
🎴 Done! Check the 'cards' folder.
```

## 📁 **Generated JSON Format**
Each card includes:
```json
{
  "name": "Kion",
  "username": "WagieWeeb",
  "followers": 2956,
  "following": 1334,
  "title": "The Chaotic Technophile",
  "hp": 150,
  "summonCost": 5,
  "weakness": { "amount": 10, "type": "Goon" },
  "resists": { "amount": 20, "type": "Roast" },
  "abilities": [
    { "name": "Reply Guy", "type": "Passive", "description": "Gains +5 HP when mentioned in a ratio attempt." }
  ],
  "attacks": [
    { "chance": "80/100", "description": "Post into the void", "attack": 0 },
    { "chance": "20/100", "description": "Gets dunked on", "attack": 20 }
  ]
}
```

## 🔥 **Features**
✅ Fetches up to **100 tweets** (handles pagination).  
✅ **Pre-populates known fields** (followers, following, etc.).  
✅ **Generates unique attacks & abilities** based on tweet patterns.  
✅ **Humorous, sarcastic card descriptions** reflecting user engagement.  
✅ **Saves JSON output** for further use.  

## 🛠 **Troubleshooting**
### **1️⃣ Missing API Key**
```sh
❌ TWITTER_API_KEY is missing from .env!
```
Fix: Add your Twitter API key to `.env` and restart.

### **2️⃣ No Tweets Fetched**
```sh
📊 Total tweets before adding: 0
📊 Total tweets after adding: 20
```
Fix: Ensure your Twitter account isn't private or restricted.

### **3️⃣ AI Generates Generic Attacks**
Fix:  
- Ensure `makeCard.ts` is using the latest **AI prompt** update.  
- **Re-run the script** to refresh responses.

## 🤝 **Contributing**
- Submit PRs to **fix bugs or enhance attack descriptions**.  
- Suggest **new attack types & abilities** based on **funny tweet patterns**.

---
🚀 **Enjoy generating your tpotmon cards!**
