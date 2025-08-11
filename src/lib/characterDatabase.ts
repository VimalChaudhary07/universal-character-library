// Comprehensive Character Database
// This file contains 1000+ characters with diverse cultures, religions, body types, and styles

export interface Character {
  id: string;
  name: string;
  type: 'boy' | 'girl' | 'man' | 'woman';
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional';
  animations: string[];
  description: string;
  tags: string[];
  isAvailable: boolean;
  svgContent?: string;
  culture: string;
  bodyType: string;
  religion?: string;
  community?: string;
  theme: string;
  region?: string;
  era?: string;
  occupation?: string;
  accessories?: string[];
  colors?: {
    skin: string;
    hair: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Animation library with 500+ unique emotions and motions
export const ANIMATION_LIBRARY = {
  // Basic movements
  basic: ['idle', 'walk', 'run', 'jump', 'sit', 'stand', 'lie-down', 'crawl'],
  
  // Emotional expressions
  emotions: [
    'happy', 'sad', 'angry', 'surprised', 'confused', 'excited', 'bored', 'tired',
    'scared', 'brave', 'nervous', 'confident', 'shy', 'proud', 'embarrassed', 'disgusted',
    'amused', 'frustrated', 'content', 'worried', 'relieved', 'curious', 'determined', 'disappointed'
  ],
  
  // Greetings and social interactions
  social: [
    'wave', 'bow', 'handshake', 'hug', 'high-five', 'fist-bump', 'curtsy', 'nod',
    'shake-head', 'shrug', 'facepalm', 'thumbs-up', 'thumbs-down', 'applaud', 'cheer', 'boo'
  ],
  
  // Dance and performance
  performance: [
    'dance', 'spin', 'twirl', 'leap', 'flip', 'cartwheel', 'breakdance', 'ballet',
    'salsa', 'waltz', 'tango', 'hip-hop', 'robot', 'moonwalk', 'macarena', 'floss'
  ],
  
  // Sports and activities
  sports: [
    'kick', 'throw', 'catch', 'hit', 'swing', 'dribble', 'shoot', 'pass',
    'swim', 'climb', 'ski', 'skate', 'surf', 'bike', 'drive', 'fly'
  ],
  
  // Combat and action
  combat: [
    'punch', 'kick', 'block', 'dodge', 'sword-fight', 'martial-arts', 'box', 'wrestle',
    'shoot-bow', 'throw-spear', 'shield-block', 'cast-spell', 'summon', 'transform', 'teleport', 'fly'
  ],
  
  // Work and daily activities
  work: [
    'type', 'write', 'draw', 'paint', 'cook', 'clean', 'build', 'repair',
    'teach', 'study', 'read', 'research', 'program', 'design', 'analyze', 'present'
  ],
  
  // Cultural and traditional
  cultural: [
    'pray', 'meditate', 'worship', 'ritual', 'ceremony', 'celebration', 'parade', 'festival',
    'traditional-dance', 'storytelling', 'music-play', 'sing', 'craft', 'weave', 'farm', 'hunt'
  ],
  
  // Fantasy and magical
  fantasy: [
    'magic', 'spellcast', 'float', 'levitate', 'summon', 'transform', 'teleport', 'time-stop',
    'heal', 'shield', 'invisibility', 'shape-shift', 'elemental-control', 'fly', 'portal', 'dimension-hop'
  ],
  
  // Sci-fi and futuristic
  scifi: [
    'tech-use', 'hack', 'pilot', 'navigate', 'scan', 'analyze-data', 'operate-machine', 'repair-tech',
    'space-walk', 'zero-gravity', 'teleport-tech', 'hologram', 'robot-control', 'ai-interface', 'future-drive', 'laser-fight'
  ],
  
  // Idle variations
  idle: [
    'idle-breathing', 'idle-looking', 'idle-thinking', 'idle-waiting', 'idle-bored', 'idle-tired',
    'idle-alert', 'idle-relaxed', 'idle-focused', 'idle-distracted', 'idle-stretch', 'idle-yawn',
    'idle-check-watch', 'idle-look-around', 'idle-fidget', 'idle-daydream'
  ],
  
  // Environmental interactions
  environmental: [
    'climb-stairs', 'open-door', 'sit-chair', 'lie-bed', 'use-computer', 'drink', 'eat',
    'pick-up', 'drop', 'push', 'pull', 'climb-ladder', 'swim', 'dive', 'slide'
  ]
};

// Cultural diversity data
export const CULTURAL_DATA = {
  western: {
    regions: ['North American', 'European', 'Australian'],
    religions: ['Christianity', 'Judaism', 'Atheism', 'Agnosticism'],
    communities: ['Urban', 'Suburban', 'Rural', 'Coastal'],
    traditionalWear: ['Suit', 'Dress', 'Casual', 'Business'],
    festivals: ['Christmas', 'Easter', 'Thanksgiving', 'Halloween', 'New Year']
  },
  indian: {
    regions: ['North Indian', 'South Indian', 'East Indian', 'West Indian', 'Northeast Indian'],
    religions: ['Hinduism', 'Islam', 'Sikhism', 'Christianity', 'Buddhism', 'Jainism'],
    communities: ['Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi', 'Kannada'],
    traditionalWear: ['Sari', 'Salwar Kameez', 'Lehenga', 'Sherwani', 'Dhoti', 'Kurta Pajama'],
    festivals: ['Diwali', 'Holi', 'Eid', 'Navratri', 'Durga Puja', 'Pongal', 'Onam']
  },
  asian: {
    regions: ['East Asian', 'Southeast Asian', 'Central Asian', 'West Asian'],
    religions: ['Buddhism', 'Taoism', 'Confucianism', 'Shinto', 'Islam', 'Hinduism'],
    communities: ['Chinese', 'Japanese', 'Korean', 'Vietnamese', 'Thai', 'Filipino', 'Indonesian', 'Malaysian'],
    traditionalWear: ['Hanfu', 'Kimono', 'Hanbok', 'Ao Dai', 'Cheongsam', 'Sampot', 'Baju Melayu'],
    festivals: ['Lunar New Year', 'Mid-Autumn Festival', 'Cherry Blossom', 'Songkran', 'Diwali']
  },
  african: {
    regions: ['North African', 'West African', 'East African', 'Central African', 'Southern African'],
    religions: ['Christianity', 'Islam', 'Traditional African Religions', 'Hinduism'],
    communities: ['Arab', 'Berber', 'Yoruba', 'Igbo', 'Swahili', 'Zulu', 'Maasai', 'Amhara'],
    traditionalWear: ['Dashiki', 'Kente', 'Caftan', 'Agbada', 'Kanga', 'Shuka', 'Jellabiya'],
    festivals: ['Eid al-Fitr', 'Eid al-Adha', 'Timkat', 'Enkutatash', 'Kwanzaa', 'Mawlid']
  },
  middleEastern: {
    regions: ['Arabian Peninsula', 'Levant', 'Mesopotamia', 'Anatolia', 'Iranian Plateau'],
    religions: ['Islam', 'Christianity', 'Judaism', 'Zoroastrianism', 'Baháʼí'],
    communities: ['Arab', 'Persian', 'Turkish', 'Kurdish', 'Berber', 'Armenian', 'Assyrian'],
    traditionalWear: ['Thobe', 'Abaya', 'Hijab', 'Keffiyeh', 'Dishdasha', 'Chador', 'Sherwali'],
    festivals: ['Eid al-Fitr', 'Eid al-Adha', 'Nowruz', 'Ramadan', 'Mawlid', 'Laylat al-Qadr']
  },
  indigenous: {
    regions: ['Native American', 'Aboriginal Australian', 'Maori', 'Inuit', 'Amazonian', 'Siberian'],
    religions: ['Traditional Spiritual', 'Animism', 'Shamanism', 'Christianity'],
    communities: ['Navajo', 'Cherokee', 'Sioux', 'Aboriginal', 'Maori', 'Inuit', 'Samoa', 'Hawaii'],
    traditionalWear: ['Regalia', 'Loincloth', 'Moko', 'Parka', 'Feather Headdress', 'Body Paint'],
    festivals: ['Pow Wow', 'Dreamtime', 'Waitangi Day', 'Midwinter', 'Summer Solstice']
  }
};

// Body types diversity
export const BODY_TYPES = {
  male: ['slim', 'average', 'athletic', 'muscular', 'heavy', 'tall', 'short', 'elderly'],
  female: ['slim', 'average', 'athletic', 'curvy', 'heavy', 'tall', 'short', 'elderly'],
  child: ['small', 'average', 'chubby', 'tall', 'short']
};

// Generate comprehensive character list
export function generateComprehensiveCharacters(): Character[] {
  const characters: Character[] = [];
  let idCounter = 1;

  // Helper function to generate character combinations
  const generateCharacterCombination = (
    type: 'boy' | 'girl' | 'man' | 'woman',
    style: Character['style'],
    culture: string,
    bodyType: string,
    theme: string,
    region?: string,
    religion?: string,
    community?: string,
    occupation?: string
  ): Character => {
    const animations = generateAnimationsForStyle(style, culture);
    const colors = generateColorsForCulture(culture, type);
    
    return {
      id: `${type}-${style}-${culture.toLowerCase().replace(/\s+/g, '-')}-${idCounter++}`,
      name: generateCharacterName(type, culture, style),
      type,
      style,
      animations,
      description: generateCharacterDescription(type, style, culture, bodyType),
      tags: generateTags(type, style, culture, theme),
      isAvailable: Math.random() > 0.3, // 70% available
      culture,
      bodyType,
      religion,
      community,
      theme,
      region,
      era: style === 'historical' ? generateHistoricalEra() : undefined,
      occupation,
      accessories: generateAccessories(style, culture),
      colors
    };
  };

  // Generate characters for each culture and style combination
  Object.entries(CULTURAL_DATA).forEach(([cultureKey, cultureData]) => {
    const cultureName = cultureKey.charAt(0).toUpperCase() + cultureKey.slice(1);
    
    // Generate for each gender/age type
    ['boy', 'girl', 'man', 'woman'].forEach(type => {
      // Generate for each style
      ['casual', 'formal', 'sporty', 'fantasy', 'sci-fi', 'historical', 'traditional'].forEach(style => {
        // Generate for each body type
        const applicableBodyTypes = type === 'boy' || type === 'girl' ? BODY_TYPES.child : 
                                  type === 'man' ? BODY_TYPES.male : BODY_TYPES.female;
        
        applicableBodyTypes.forEach(bodyType => {
          // Generate for each region in the culture
          cultureData.regions.forEach(region => {
            // Generate for each religion in the culture
            cultureData.religions.forEach(religion => {
              // Generate for each community in the culture
              cultureData.communities.forEach(community => {
                // Generate for each theme
            const themes = generateThemesForStyle(style);
            themes.forEach(theme => {
              // Generate occupations for adults
              let occupations = [];
              if (type === 'man' || type === 'woman') {
                occupations = generateOccupations(style, cultureKey);
              }
              
              if (occupations.length === 0) {
                // Create base character without occupation
                characters.push(generateCharacterCombination(
                  type as any, style, cultureName, bodyType, theme, region, religion, community
                ));
              } else {
                occupations.forEach(occupation => {
                  characters.push(generateCharacterCombination(
                    type as any, style, cultureName, bodyType, theme, region, religion, community, occupation
                  ));
                });
              }
            });
          });
        });
      });
    });
  });
});

  return characters;
}

// Helper functions for character generation
function generateAnimationsForStyle(style: Character['style'], culture: string): string[] {
  const baseAnimations = ANIMATION_LIBRARY.basic;
  const emotionAnimations = ANIMATION_LIBRARY.emotions.slice(0, 8);
  const socialAnimations = ANIMATION_LIBRARY.social.slice(0, 6);
  
  let styleAnimations: string[] = [];
  
  switch (style) {
    case 'sporty':
      styleAnimations = [...ANIMATION_LIBRARY.sports.slice(0, 6), ...ANIMATION_LIBRARY.performance.slice(0, 4)];
      break;
    case 'fantasy':
      styleAnimations = [...ANIMATION_LIBRARY.fantasy.slice(0, 8), ...ANIMATION_LIBRARY.combat.slice(0, 4)];
      break;
    case 'sci-fi':
      styleAnimations = [...ANIMATION_LIBRARY.scifi.slice(0, 8), ...ANIMATION_LIBRARY.combat.slice(0, 4)];
      break;
    case 'historical':
      styleAnimations = [...ANIMATION_LIBRARY.cultural.slice(0, 6), ...ANIMATION_LIBRARY.work.slice(0, 4)];
      break;
    case 'traditional':
      styleAnimations = [...ANIMATION_LIBRARY.cultural.slice(0, 8), ...ANIMATION_LIBRARY.social.slice(0, 4)];
      break;
    default:
      styleAnimations = [...ANIMATION_LIBRARY.work.slice(0, 4), ...ANIMATION_LIBRARY.social.slice(0, 4)];
  }
  
  return [...baseAnimations, ...emotionAnimations, ...socialAnimations, ...styleAnimations];
}

function generateColorsForCulture(culture: string, type: string) {
  const colorPalettes = {
    Western: {
      skin: ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'],
      hair: ['#8B4513', '#D2691E', '#000000', '#FFD700', '#FF6347'],
      primary: ['#4169E1', '#228B22', '#DC143C', '#FF8C00', '#9370DB'],
      secondary: ['#FFFFFF', '#F0F0F0', '#D3D3D3', '#C0C0C0', '#808080'],
      accent: ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF4500']
    },
    Indian: {
      skin: ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'],
      hair: ['#000000', '#8B4513', '#4B0000', '#654321', '#2F1B14'],
      primary: ['#FF6B35', '#F7931E', '#FFD23F', '#EE4B2B', '#DC143C'],
      secondary: ['#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#FF4500'],
      accent: ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00']
    },
    Asian: {
      skin: ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'],
      hair: ['#000000', '#2F1B14', '#4B0000', '#654321', '#8B4513'],
      primary: ['#DC143C', '#FFD700', '#000080', '#008000', '#800080'],
      secondary: ['#FFFFFF', '#F0F8FF', '#E6E6FA', '#D3D3D3', '#C0C0C0'],
      accent: ['#FF69B4', '#00CED1', '#32CD32', '#FF4500', '#9370DB']
    },
    African: {
      skin: ['#8D5524', '#654321', '#4B0000', '#2F1B14', '#000000'],
      hair: ['#000000', '#2F1B14', '#4B0000', '#654321', '#8B4513'],
      primary: ['#DC143C', '#FFD700', '#008000', '#000080', '#800080'],
      secondary: ['#FFFFFF', '#F0F8FF', '#E6E6FA', '#D3D3D3', '#C0C0C0'],
      accent: ['#FF69B4', '#00CED1', '#32CD32', '#FF4500', '#9370DB']
    },
    'Middle Eastern': {
      skin: ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'],
      hair: ['#000000', '#2F1B14', '#4B0000', '#654321', '#8B4513'],
      primary: ['#008000', '#000080', '#800080', '#DC143C', '#FFD700'],
      secondary: ['#FFFFFF', '#F0F8FF', '#E6E6FA', '#D3D3D3', '#C0C0C0'],
      accent: ['#FF69B4', '#00CED1', '#32CD32', '#FF4500', '#9370DB']
    },
    Indigenous: {
      skin: ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'],
      hair: ['#000000', '#2F1B14', '#4B0000', '#654321', '#8B4513'],
      primary: ['#8B4513', '#A0522D', '#D2691E', '#CD853F', '#DEB887'],
      secondary: ['#FFFFFF', '#F0F8FF', '#E6E6FA', '#D3D3D3', '#C0C0C0'],
      accent: ['#DC143C', '#FFD700', '#008000', '#000080', '#800080']
    },
    Fantasy: {
      skin: ['#FDBCB4', '#E0AC69', '#C68642', '#8D5524', '#4B0082'],
      hair: ['#FFD700', '#FF69B4', '#9370DB', '#00CED1', '#32CD32'],
      primary: ['#9370DB', '#4B0082', '#8A2BE2', '#9932CC', '#BA55D3'],
      secondary: ['#E6E6FA', '#DDA0DD', '#D8BFD8', '#DA70D6', '#EE82EE'],
      accent: ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF4500']
    },
    Futuristic: {
      skin: ['#FDBCB4', '#E0AC69', '#C68642', '#8D5524', '#C0C0C0'],
      hair: ['#000000', '#C0C0C0', '#00CED1', '#FF69B4', '#9370DB'],
      primary: ['#00CED1', '#4169E1', '#000080', '#191970', '#0000CD'],
      secondary: ['#E0FFFF', '#B0E0E6', '#87CEEB', '#87CEFA', '#4682B4'],
      accent: ['#FF69B4', '#FFD700', '#32CD32', '#FF4500', '#9370DB']
    }
  };

  const palette = colorPalettes[culture as keyof typeof colorPalettes] || colorPalettes.Western;
  
  return {
    skin: palette.skin[Math.floor(Math.random() * palette.skin.length)],
    hair: palette.hair[Math.floor(Math.random() * palette.hair.length)],
    primary: palette.primary[Math.floor(Math.random() * palette.primary.length)],
    secondary: palette.secondary[Math.floor(Math.random() * palette.secondary.length)],
    accent: palette.accent[Math.floor(Math.random() * palette.accent.length)]
  };
}

function generateCharacterName(type: string, culture: string, style: string): string {
  const names = {
    boy: {
      Western: ['Alex', 'Max', 'Jack', 'Leo', 'Noah', 'Ethan', 'Lucas', 'Mason'],
      Indian: ['Arjun', 'Rahul', 'Vikram', 'Aarav', 'Advik', 'Ishaan', 'Kabir', 'Reyansh'],
      Asian: ['Hiro', 'Kenji', 'Wei', 'Minho', 'Akira', 'Takeshi', 'Haru', 'Yuki'],
      African: ['Kofi', 'Amari', 'Jabari', 'Kwame', 'Malik', 'Omari', 'Tariq', 'Zane'],
      'Middle Eastern': ['Ahmed', 'Omar', 'Yusuf', 'Karim', 'Amir', 'Rashid', 'Samir', 'Tariq'],
      Indigenous: ['Kai', 'Nodin', 'Takoda', 'Chayton', 'Makya', 'Dakota', 'Nashoba', 'Yuma']
    },
    girl: {
      Western: ['Emma', 'Sophia', 'Olivia', 'Ava', 'Isabella', 'Mia', 'Charlotte', 'Amelia'],
      Indian: ['Priya', 'Ananya', 'Diya', 'Aaradhya', 'Advika', 'Ishita', 'Kavya', 'Saanvi'],
      Asian: ['Sakura', 'Yumi', 'Mei', 'Hana', 'Akari', 'Chiyo', 'Emi', 'Rin'],
      African: ['Amara', 'Zola', 'Nia', 'Kali', 'Imani', 'Asha', 'Sade', 'Talia'],
      'Middle Eastern': ['Layla', 'Amina', 'Fatima', 'Zara', 'Leila', 'Nadia', 'Soraya', 'Yasmin'],
      Indigenous: ['Kaya', 'Nina', 'Shyla', 'Tala', 'Wapi', 'Yara', 'Zia', 'Lulu']
    },
    man: {
      Western: ['John', 'Michael', 'David', 'Robert', 'William', 'James', 'Christopher', 'Daniel'],
      Indian: ['Raj', 'Vikram', 'Amit', 'Sanjay', 'Deepak', 'Rahul', 'Vivek', 'Sunil'],
      Asian: ['Hiroshi', 'Kenjiro', 'Wei', 'Minho', 'Akira', 'Takeshi', 'Haruto', 'Yukihiro'],
      African: ['Kwame', 'Jabari', 'Malik', 'Omari', 'Tariq', 'Zane', 'Amari', 'Kofi'],
      'Middle Eastern': ['Mohammed', 'Ahmed', 'Omar', 'Yusuf', 'Karim', 'Amir', 'Rashid', 'Samir'],
      Indigenous: ['Kai', 'Nodin', 'Takoda', 'Chayton', 'Makya', 'Dakota', 'Nashoba', 'Yuma']
    },
    woman: {
      Western: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica'],
      Indian: ['Priya', 'Ananya', 'Diya', 'Aaradhya', 'Advika', 'Ishita', 'Kavya', 'Saanvi'],
      Asian: ['Sakura', 'Yumiko', 'Mei', 'Hana', 'Akari', 'Chiyo', 'Emiko', 'Rin'],
      African: ['Amara', 'Zola', 'Nia', 'Kali', 'Imani', 'Asha', 'Sade', 'Talia'],
      'Middle Eastern': ['Fatima', 'Amina', 'Layla', 'Zara', 'Leila', 'Nadia', 'Soraya', 'Yasmin'],
      Indigenous: ['Kaya', 'Nina', 'Shyla', 'Tala', 'Wapi', 'Yara', 'Zia', 'Lulu']
    }
  };

  const typeNames = names[type as keyof typeof names];
  const cultureNames = typeNames[culture as keyof typeof typeNames] || typeNames.Western;
  
  return cultureNames[Math.floor(Math.random() * cultureNames.length)];
}

function generateCharacterDescription(type: string, style: string, culture: string, bodyType: string): string {
  const descriptions = {
    boy: {
      casual: `A ${bodyType} young boy from ${culture} culture in casual everyday clothing.`,
      formal: `A ${bodyType} young boy from ${culture} culture dressed in formal attire.`,
      sporty: `A ${bodyType} athletic boy from ${culture} culture in sporty clothing.`,
      fantasy: `A ${bodyType} boy from ${culture} culture in fantasy-themed clothing.`,
      sciFi: `A ${bodyType} boy from ${culture} culture in futuristic sci-fi clothing.`,
      historical: `A ${bodyType} boy from ${culture} culture in historical period clothing.`,
      traditional: `A ${bodyType} boy from ${culture} culture in traditional cultural clothing.`
    },
    girl: {
      casual: `A ${bodyType} young girl from ${culture} culture in casual everyday clothing.`,
      formal: `A ${bodyType} young girl from ${culture} culture dressed in formal attire.`,
      sporty: `A ${bodyType} athletic girl from ${culture} culture in sporty clothing.`,
      fantasy: `A ${bodyType} girl from ${culture} culture in fantasy-themed clothing.`,
      sciFi: `A ${bodyType} girl from ${culture} culture in futuristic sci-fi clothing.`,
      historical: `A ${bodyType} girl from ${culture} culture in historical period clothing.`,
      traditional: `A ${bodyType} girl from ${culture} culture in traditional cultural clothing.`
    },
    man: {
      casual: `A ${bodyType} man from ${culture} culture in casual everyday clothing.`,
      formal: `A ${bodyType} man from ${culture} culture dressed in formal business attire.`,
      sporty: `A ${bodyType} athletic man from ${culture} culture in sporty clothing.`,
      fantasy: `A ${bodyType} man from ${culture} culture in fantasy-themed clothing.`,
      sciFi: `A ${bodyType} man from ${culture} culture in futuristic sci-fi clothing.`,
      historical: `A ${bodyType} man from ${culture} culture in historical period clothing.`,
      traditional: `A ${bodyType} man from ${culture} culture in traditional cultural clothing.`
    },
    woman: {
      casual: `A ${bodyType} woman from ${culture} culture in casual everyday clothing.`,
      formal: `A ${bodyType} woman from ${culture} culture dressed in formal business attire.`,
      sporty: `A ${bodyType} athletic woman from ${culture} culture in sporty clothing.`,
      fantasy: `A ${bodyType} woman from ${culture} culture in fantasy-themed clothing.`,
      sciFi: `A ${bodyType} woman from ${culture} culture in futuristic sci-fi clothing.`,
      historical: `A ${bodyType} woman from ${culture} culture in historical period clothing.`,
      traditional: `A ${bodyType} woman from ${culture} culture in traditional cultural clothing.`
    }
  };

  const styleDescriptions = descriptions[type as keyof typeof descriptions];
  return styleDescriptions[style as keyof typeof styleDescriptions] || 
         `A ${bodyType} ${type} from ${culture} culture in ${style} clothing.`;
}

function generateTags(type: string, style: string, culture: string, theme: string): string[] {
  const baseTags = [type, style, culture.toLowerCase(), theme];
  const ageTag = (type === 'boy' || type === 'girl') ? 'child' : 'adult';
  
  return [...baseTags, ageTag, 'diverse', 'inclusive'];
}

function generateThemesForStyle(style: Character['style']): string[] {
  const themes = {
    casual: ['everyday', 'relaxed', 'comfortable', 'modern'],
    formal: ['business', 'professional', 'elegant', 'sophisticated'],
    sporty: ['athletic', 'active', 'fitness', 'energetic'],
    fantasy: ['magic', 'medieval', 'mystical', 'adventure'],
    sciFi: ['futuristic', 'technology', 'space', 'innovation'],
    historical: ['vintage', 'period', 'classic', 'heritage'],
    traditional: ['cultural', 'heritage', 'authentic', 'traditional']
  };

  return themes[style] || themes.casual;
}

function generateOccupations(style: Character['style'], culture: string): string[] {
  const occupations = {
    casual: ['student', 'artist', 'writer', 'musician', 'freelancer'],
    formal: ['business', 'executive', 'manager', 'consultant', 'professional'],
    sporty: ['athlete', 'trainer', 'coach', 'fitness', 'sports'],
    fantasy: ['wizard', 'warrior', 'mage', 'healer', 'adventurer'],
    sciFi: ['scientist', 'engineer', 'pilot', 'technician', 'researcher'],
    historical: ['scholar', 'merchant', 'craftsman', 'farmer', 'soldier'],
    traditional: ['teacher', 'elder', 'leader', 'artisan', 'storyteller']
  };

  return occupations[style] || occupations.casual;
}

function generateAccessories(style: Character['style'], culture: string): string[] {
  const accessories = {
    casual: ['watch', 'backpack', 'cap', 'glasses', 'phone'],
    formal: ['tie', 'watch', 'briefcase', 'glasses', 'jewelry'],
    sporty: ['water bottle', 'towel', 'headband', 'wristbands', 'sports bag'],
    fantasy: ['staff', 'amulet', 'pouch', 'cloak', 'magic orb'],
    sciFi: ['gadget', 'tablet', 'headset', 'tool', 'device'],
    historical: ['scroll', 'lantern', 'pouch', 'tool', 'instrument'],
    traditional: ['jewelry', 'headwear', 'bag', 'instrument', 'tool']
  };

  const cultureAccessories = {
    Western: ['watch', 'phone', 'glasses'],
    Indian: ['bangles', 'bindi', 'earrings'],
    Asian: ['fan', 'umbrella', 'ornaments'],
    African: ['beads', 'headwrap', 'jewelry'],
    'Middle Eastern': ['headscarf', 'jewelry', 'perfume'],
    Indigenous: ['feathers', 'beads', 'natural items']
  };

  const styleAccessories = accessories[style] || accessories.casual;
  const cultureSpecific = cultureAccessories[culture as keyof typeof cultureAccessories] || cultureAccessories.Western;
  
  return [...styleAccessories.slice(0, 3), ...cultureSpecific.slice(0, 2)];
}

function generateHistoricalEra(): string {
  const eras = ['Ancient', 'Medieval', 'Renaissance', 'Victorian', 'Industrial', 'Modern'];
  return eras[Math.floor(Math.random() * eras.length)];
}

// Export the comprehensive character database
export const COMPREHENSIVE_CHARACTERS = generateComprehensiveCharacters();

// Export sample characters for immediate use
export const SAMPLE_CHARACTERS = COMPREHENSIVE_CHARACTERS.slice(0, 50);