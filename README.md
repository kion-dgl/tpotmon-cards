# tpotmon-cards

![tpotmon logo](https://github.com/user-attachments/assets/261f4c41-9c55-4778-bae0-1342ceee7b10)

## Proposed Rules  

### **Deck & Setup**  
- Each player constructs a deck of **40 cards**.  
- At the start of the game, players draw **5 cards** from their deck.  

### **Turn Structure**  
- Players receive **Engagement Points (EP)** at the start of each turn.  
- Engagement Points are spent to play cards onto the field.  

### **Card Types**  
- **User Account Cards** – Represent different levels of online presence, from small to influential figures.  
- **Action Cards** – Represent interactions, strategies, or events that affect gameplay.  

### **User Account Levels**  
User cards belong to different tiers, requiring varying amounts of Engagement Points to be played:  
1. **Nanobie** – The lowest level, easiest to play.  
2. **Lowbie** – Slightly stronger presence, still accessible.  
3. **Highbie** – Established accounts with more influence.  
4. **Ultrabie** – Powerful user cards that may require **sacrificing** lower-level users.  
5. **Megabie** – **Deck Leader**; only one per deck, extremely powerful but high-risk.  

### **Gameplay Flow**  
- Players take turns spending Engagement Points to play user or action cards.  
- Some higher-tier user cards (like **Ultrabies**) require sacrificing lower-tier cards.  
- **Megabies** act as deck leaders—only **one** can be included in a deck.  

### **Winning & Losing**  
- Players start with **Influence Points**.  
- The game continues until one player **loses all their Influence Points**, making their presence irrelevant.  

## Development

### Continuous Integration

This project includes a GitHub Actions workflow that runs on pull requests to the main branch:

1. **TypeScript and Schema Validation**: Runs `astro check` to ensure all TypeScript code is valid and content collections conform to their schemas
2. **Build Verification**: Ensures the project builds correctly with `astro build`

To run these checks locally:

```bash
# TypeScript and schema validation
npm run astro check

# Build the project
npm run build
```
