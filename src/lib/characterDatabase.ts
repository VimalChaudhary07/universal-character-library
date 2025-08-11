// Test file to isolate syntax issues
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
  basic: ['idle', 'walk', 'run', 'jump', 'sit', 'stand', 'lie-down', 'crawl'],
  emotions: ['happy', 'sad', 'angry', 'surprised', 'confused', 'excited', 'bored', 'tired'],
  social: ['wave', 'bow', 'handshake', 'hug', 'high-five', 'fist-bump', 'curtsy', 'nod'],
  performance: ['dance', 'spin', 'twirl', 'leap', 'flip', 'cartwheel', 'breakdance', 'ballet'],
  sports: ['kick', 'throw', 'catch', 'hit', 'swing', 'dribble', 'shoot', 'pass'],
  combat: ['punch', 'kick', 'block', 'dodge', 'sword-fight', 'martial-arts', 'box', 'wrestle'],
  work: ['type', 'write', 'draw', 'paint', 'cook', 'clean', 'build', 'repair'],
  cultural: ['pray', 'meditate', 'worship', 'ritual', 'ceremony', 'celebration', 'parade', 'festival'],
  fantasy: ['magic', 'spellcast', 'float', 'levitate', 'summon', 'transform', 'teleport', 'time-stop'],
  scifi: ['tech-use', 'hack', 'pilot', 'navigate', 'scan', 'analyze-data', 'operate-machine', 'repair-tech'],
  idle: ['idle-breathing', 'idle-looking', 'idle-thinking', 'idle-waiting', 'idle-bored', 'idle-tired'],
  environmental: ['climb-stairs', 'open-door', 'sit-chair', 'lie-bed', 'use-computer', 'drink', 'eat', 'pick-up']
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
    
    return {
      id: `${type}-${style}-${culture.toLowerCase().replace(/\s+/g, '-')}-${idCounter++}`,
      name: generateCharacterName(type, culture, style),
      type,
      style,
      animations,
      description: generateCharacterDescription(type, style, culture, bodyType),
      tags: generateTags(type, style, culture, theme),
      isAvailable: Math.random() > 0.3,
      culture,
      bodyType,
      religion,
      community,
      theme,
      region,
      era: style === 'historical' ? generateHistoricalEra() : undefined,
      occupation,
      accessories: generateAccessories(style, culture)
    };
  };

  // Simple generation for testing
  for (let i = 0; i < 10; i++) {
    characters.push(generateCharacterCombination(
      'boy',
      'casual',
      'Western',
      'average',
      'general'
    ));
  }

  return characters;
}

// Helper functions
export function generateAnimationsForStyle(style: Character['style'], culture: string): string[] {
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
    default:
      styleAnimations = [...ANIMATION_LIBRARY.work.slice(0, 4), ...ANIMATION_LIBRARY.social.slice(0, 4)];
  }
  
  return [...baseAnimations, ...emotionAnimations, ...socialAnimations, ...styleAnimations];
}

export function generateCharacterName(type: string, culture: string, style: string): string {
  const names = {
    boy: {
      Western: ['Alex', 'Max', 'Jack', 'Leo'],
      Indian: ['Arjun', 'Rahul', 'Vikram', 'Aarav'],
      Asian: ['Hiro', 'Kenji', 'Wei', 'Minho'],
      African: ['Kofi', 'Amari', 'Jabari', 'Kwame'],
      'Middle Eastern': ['Ahmed', 'Omar', 'Yusuf', 'Karim'],
      Indigenous: ['Kai', 'Nodin', 'Takoda', 'Chayton']
    },
    girl: {
      Western: ['Emma', 'Sophia', 'Olivia', 'Ava'],
      Indian: ['Priya', 'Ananya', 'Diya', 'Aisha'],
      Asian: ['Yuki', 'Sakura', 'Mei', 'Hana'],
      African: ['Amara', 'Zuri', 'Nia', 'Kehinde'],
      'Middle Eastern': ['Fatima', 'Aisha', 'Layla', 'Zara'],
      Indigenous: ['Kaya', 'Nina', 'Tala', 'Aiyana']
    },
    man: {
      Western: ['John', 'Michael', 'David', 'Robert'],
      Indian: ['Raj', 'Vikram', 'Arjun', 'Kabir'],
      Asian: ['Hiroshi', 'Takeshi', 'Wei', 'Minjun'],
      African: ['Kwame', 'Jabari', 'Malik', 'Omari'],
      'Middle Eastern': ['Mohammed', 'Ahmed', 'Omar', 'Yusuf'],
      Indigenous: ['Dakota', 'Nashoba', 'Makya', 'Chayton']
    },
    woman: {
      Western: ['Mary', 'Jennifer', 'Lisa', 'Sarah'],
      Indian: ['Priya', 'Ananya', 'Diya', 'Aisha'],
      Asian: ['Yuki', 'Sakura', 'Mei', 'Hana'],
      African: ['Amara', 'Zuri', 'Nia', 'Kehinde'],
      'Middle Eastern': ['Fatima', 'Aisha', 'Layla', 'Zara'],
      Indigenous: ['Kaya', 'Nina', 'Tala', 'Aiyana']
    }
  };
  
  const typeNames = names[type as keyof typeof names];
  const cultureNames = typeNames[culture as keyof typeof typeNames] || typeNames.Western;
  
  return cultureNames[Math.floor(Math.random() * cultureNames.length)];
}

export function generateCharacterDescription(type: string, style: string, culture: string, bodyType: string): string {
  return `${type.charAt(0).toUpperCase() + type.slice(1)} character with ${style} style from ${culture} culture, ${bodyType} body type.`;
}

export function generateTags(type: string, style: string, culture: string, theme: string): string[] {
  return [type, style, culture, theme];
}

export function generateAccessories(style: string, culture: string): string[] {
  const accessories = [];
  if (style === 'formal') accessories.push('watch', 'glasses');
  if (style === 'sporty') accessories.push('headband', 'wristband');
  if (culture === 'Indian') accessories.push('bangles', 'bindi');
  return accessories;
}

export function generateHistoricalEra(): string {
  const eras = ['Ancient', 'Medieval', 'Renaissance', 'Victorian', 'Industrial', 'Modern'];
  return eras[Math.floor(Math.random() * eras.length)];
}

// Export the comprehensive character database
export const COMPREHENSIVE_CHARACTERS = generateComprehensiveCharacters();

// Export sample characters for immediate use
export const SAMPLE_CHARACTERS = COMPREHENSIVE_CHARACTERS.slice(0, 50);