import { readdir, readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

async function validateCards() {
  console.log('Validating content collections against schema...');
  
  try {
    // First, read the config.ts file to extract the enum values
    const cardsDir = path.join(process.cwd(), 'src/content/cards');
    const configPath = path.join(process.cwd(), 'src/content/config.ts');
    const configContent = await readFile(configPath, 'utf8');
    
    // Extract enum values using regex from config.ts
    const attackTypesMatch = configContent.match(/const AttackTypes = \[(.*?)\] as const/);
    const abilityTypesMatch = configContent.match(/const AbilityTypes = \[(.*?)\] as const/);
    const attackChanceTypesMatch = configContent.match(/const AttackChanceTypes = \[(.*?)\] as const/);
    const rarityTypesMatch = configContent.match(/z.enum\(\["(.*?)"\]\)/);
    
    if (!attackTypesMatch || !abilityTypesMatch || !attackChanceTypesMatch || !rarityTypesMatch) {
      console.error('Failed to extract type information from config.ts');
      process.exit(1);
    }
    
    // Parse the enum values from the config.ts file
    const AttackTypes = JSON.parse(`[${attackTypesMatch[1]}]`);
    const AbilityTypes = JSON.parse(`[${abilityTypesMatch[1]}]`);
    const AttackChanceTypes = JSON.parse(`[${attackChanceTypesMatch[1]}]`);
    const RarityTypes = rarityTypesMatch[1].split('", "');
    
    console.log('Using schema types:');
    console.log('- Attack Types:', AttackTypes);
    console.log('- Ability Types:', AbilityTypes);
    console.log('- Attack Chance Types:', AttackChanceTypes);
    console.log('- Rarity Types:', RarityTypes);
    
    const files = await readdir(cardsDir);
    let hasErrors = false;
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      console.log(`Checking ${file}...`);
      const filePath = path.join(cardsDir, file);
      const content = await readFile(filePath, 'utf8');
      
      try {
        // Parse the JSON
        const cardData = JSON.parse(content);
        
        // Validate required fields
        const requiredFields = [
          'name', 'username', 'followers', 'following', 'isBlueCheck',
          'profilePic', 'profileBanner', 'title', 'weakness', 'resists',
          'createdOn', 'rarity', 'hp', 'abilities', 'attacks'
        ];
        
        for (const field of requiredFields) {
          if (cardData[field] === undefined) {
            console.error(`❌ ${file}: Missing required field "${field}"`);
            hasErrors = true;
          }
        }
        
        // Validate field types and constraints
        if (typeof cardData.name !== 'string') {
          console.error(`❌ ${file}: "name" must be a string`);
          hasErrors = true;
        }
        
        if (typeof cardData.username !== 'string') {
          console.error(`❌ ${file}: "username" must be a string`);
          hasErrors = true;
        }
        
        if (typeof cardData.followers !== 'number') {
          console.error(`❌ ${file}: "followers" must be a number`);
          hasErrors = true;
        }
        
        if (typeof cardData.following !== 'number') {
          console.error(`❌ ${file}: "following" must be a number`);
          hasErrors = true;
        }
        
        if (typeof cardData.isBlueCheck !== 'boolean') {
          console.error(`❌ ${file}: "isBlueCheck" must be a boolean`);
          hasErrors = true;
        }
        
        if (typeof cardData.profilePic !== 'string' || !cardData.profilePic.startsWith('data:image')) {
          console.error(`❌ ${file}: "profilePic" must be a data URL starting with 'data:image'`);
          hasErrors = true;
        }
        
        if (typeof cardData.profileBanner !== 'string' || !cardData.profileBanner.startsWith('data:image')) {
          console.error(`❌ ${file}: "profileBanner" must be a data URL starting with 'data:image'`);
          hasErrors = true;
        }
        
        // Validate weakness
        if (!cardData.weakness || typeof cardData.weakness !== 'object') {
          console.error(`❌ ${file}: "weakness" must be an object`);
          hasErrors = true;
        } else {
          if (typeof cardData.weakness.amount !== 'number') {
            console.error(`❌ ${file}: "weakness.amount" must be a number`);
            hasErrors = true;
          }
          
          if (!AttackTypes.includes(cardData.weakness.type)) {
            console.error(`❌ ${file}: "weakness.type" must be one of: ${AttackTypes.join(', ')}`);
            hasErrors = true;
          }
        }
        
        // Validate resists
        if (!cardData.resists || typeof cardData.resists !== 'object') {
          console.error(`❌ ${file}: "resists" must be an object`);
          hasErrors = true;
        } else {
          if (typeof cardData.resists.amount !== 'number') {
            console.error(`❌ ${file}: "resists.amount" must be a number`);
            hasErrors = true;
          }
          
          if (!AttackTypes.includes(cardData.resists.type)) {
            console.error(`❌ ${file}: "resists.type" must be one of: ${AttackTypes.join(', ')}`);
            hasErrors = true;
          }
        }
        
        // Validate date
        try {
          new Date(cardData.createdOn);
        } catch (e) {
          console.error(`❌ ${file}: "createdOn" must be a valid date string`);
          hasErrors = true;
        }
        
        // Validate rarity
        if (!RarityTypes.includes(cardData.rarity)) {
          console.error(`❌ ${file}: "rarity" must be one of: ${RarityTypes.join(', ')}`);
          hasErrors = true;
        }
        
        // Validate HP
        if (cardData.hp !== null && typeof cardData.hp !== 'number') {
          console.error(`❌ ${file}: "hp" must be a number or null`);
          hasErrors = true;
        }
        
        // Validate abilities
        if (!Array.isArray(cardData.abilities)) {
          console.error(`❌ ${file}: "abilities" must be an array`);
          hasErrors = true;
        } else if (cardData.abilities.length > 2) {
          console.error(`❌ ${file}: "abilities" can have a maximum of 2 items`);
          hasErrors = true;
        } else {
          for (const [index, ability] of cardData.abilities.entries()) {
            if (typeof ability.name !== 'string') {
              console.error(`❌ ${file}: "abilities[${index}].name" must be a string`);
              hasErrors = true;
            }
            
            if (!AbilityTypes.includes(ability.type)) {
              console.error(`❌ ${file}: "abilities[${index}].type" must be one of: ${AbilityTypes.join(', ')}`);
              hasErrors = true;
            }
            
            if (typeof ability.description !== 'string') {
              console.error(`❌ ${file}: "abilities[${index}].description" must be a string`);
              hasErrors = true;
            }
          }
        }
        
        // Validate attacks
        if (!Array.isArray(cardData.attacks)) {
          console.error(`❌ ${file}: "attacks" must be an array`);
          hasErrors = true;
        } else if (cardData.attacks.length > 2) {
          console.error(`❌ ${file}: "attacks" can have a maximum of 2 items`);
          hasErrors = true;
        } else {
          for (const [index, attack] of cardData.attacks.entries()) {
            if (typeof attack.name !== 'string') {
              console.error(`❌ ${file}: "attacks[${index}].name" must be a string`);
              hasErrors = true;
            }
            
            if (!AttackTypes.includes(attack.type)) {
              console.error(`❌ ${file}: "attacks[${index}].type" must be one of: ${AttackTypes.join(', ')}`);
              hasErrors = true;
            }
            
            if (typeof attack.damage !== 'number') {
              console.error(`❌ ${file}: "attacks[${index}].damage" must be a number`);
              hasErrors = true;
            }
            
            if (!AttackChanceTypes.includes(attack.chance)) {
              console.error(`❌ ${file}: "attacks[${index}].chance" must be one of: ${AttackChanceTypes.join(', ')}`);
              hasErrors = true;
            }
            
            if (typeof attack.description !== 'string') {
              console.error(`❌ ${file}: "attacks[${index}].description" must be a string`);
              hasErrors = true;
            }
          }
        }
        
        if (!hasErrors) {
          console.log(`✅ ${file} is valid`);
        }
        
      } catch (err) {
        console.error(`❌ ${file}: Invalid JSON: ${err.message}`);
        hasErrors = true;
      }
    }
    
    if (hasErrors) {
      console.error('❌ Validation failed: One or more content files do not conform to the schema.');
      process.exit(1);
    } else {
      console.log('✅ All content collections validated successfully!');
    }
  } catch (err) {
    console.error('Error validating content collections:', err);
    process.exit(1);
  }
}

validateCards();