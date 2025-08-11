// SVG Character Management System
// This module handles loading and managing SVG content for characters

export interface SVGCharacter {
  id: string;
  type: 'boy' | 'girl' | 'man' | 'woman';
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional' | 'holiday' | 'sports' | 'occupational';
  svgContent: string;
  cssVariables?: Record<string, string>;
  animations: string[];
}

// Import all available SVG characters
const importSVGCharacters = async (): Promise<SVGCharacter[]> => {
  const svgCharacters: SVGCharacter[] = [];

  // Boy characters
  try {
    const boyCasualSVG = await import("@/characters/boy/casual/svg/base.svg?raw");
    svgCharacters.push({
      id: 'boy-casual',
      type: 'boy',
      style: 'casual',
      svgContent: boyCasualSVG.default,
      animations: ['idle', 'walk', 'wave', 'jump', 'run']
    });
  } catch (error) {
    console.warn('Failed to load boy casual SVG:', error);
  }

  try {
    const boySportsSVG = await import("@/characters/boy/sports/svg/base.svg?raw");
    svgCharacters.push({
      id: 'boy-sports',
      type: 'boy',
      style: 'sports',
      svgContent: boySportsSVG.default,
      animations: ['idle', 'run', 'kick', 'throw', 'jump']
    });
  } catch (error) {
    console.warn('Failed to load boy sports SVG:', error);
  }

  // Girl characters
  try {
    const girlSportySVG = await import("@/characters/girl/sporty/svg/base.svg?raw");
    svgCharacters.push({
      id: 'girl-sporty',
      type: 'girl',
      style: 'sporty',
      svgContent: girlSportySVG.default,
      animations: ['idle', 'walk', 'dance', 'jump', 'run']
    });
  } catch (error) {
    console.warn('Failed to load girl sporty SVG:', error);
  }

  try {
    const girlTraditionalSVG = await import("@/characters/girl/traditional/svg/base.svg?raw");
    svgCharacters.push({
      id: 'girl-traditional',
      type: 'girl',
      style: 'traditional',
      svgContent: girlTraditionalSVG.default,
      animations: ['idle', 'walk', 'bow', 'dance', 'wave']
    });
  } catch (error) {
    console.warn('Failed to load girl traditional SVG:', error);
  }

  try {
    const girlHolidaySVG = await import("@/characters/girl/holiday/svg/base.svg?raw");
    svgCharacters.push({
      id: 'girl-holiday',
      type: 'girl',
      style: 'holiday',
      svgContent: girlHolidaySVG.default,
      animations: ['idle', 'dance', 'celebrate', 'wave', 'jump']
    });
  } catch (error) {
    console.warn('Failed to load girl holiday SVG:', error);
  }

  // Man characters
  try {
    const manFormalSVG = await import("@/characters/man/formal/svg/base.svg?raw");
    svgCharacters.push({
      id: 'man-formal',
      type: 'man',
      style: 'formal',
      svgContent: manFormalSVG.default,
      animations: ['idle', 'walk', 'bow', 'handshake', 'wave']
    });
  } catch (error) {
    console.warn('Failed to load man formal SVG:', error);
  }

  try {
    const manTraditionalSVG = await import("@/characters/man/traditional/svg/base.svg?raw");
    svgCharacters.push({
      id: 'man-traditional',
      type: 'man',
      style: 'traditional',
      svgContent: manTraditionalSVG.default,
      animations: ['idle', 'walk', 'bow', 'meditate', 'wave']
    });
  } catch (error) {
    console.warn('Failed to load man traditional SVG:', error);
  }

  try {
    const manSciFiSVG = await import("@/characters/man/sci-fi/svg/base.svg?raw");
    svgCharacters.push({
      id: 'man-sci-fi',
      type: 'man',
      style: 'sci-fi',
      svgContent: manSciFiSVG.default,
      animations: ['idle', 'walk', 'tech-use', 'scan', 'hover']
    });
  } catch (error) {
    console.warn('Failed to load man sci-fi SVG:', error);
  }

  // Woman characters
  try {
    const womanFantasySVG = await import("@/characters/woman/fantasy/svg/base.svg?raw");
    svgCharacters.push({
      id: 'woman-fantasy',
      type: 'woman',
      style: 'fantasy',
      svgContent: womanFantasySVG.default,
      animations: ['idle', 'walk', 'magic', 'float', 'spellcast']
    });
  } catch (error) {
    console.warn('Failed to load woman fantasy SVG:', error);
  }

  try {
    const womanTraditionalSVG = await import("@/characters/woman/traditional/svg/base.svg?raw");
    svgCharacters.push({
      id: 'woman-traditional',
      type: 'woman',
      style: 'traditional',
      svgContent: womanTraditionalSVG.default,
      animations: ['idle', 'walk', 'dance', 'bow', 'wave']
    });
  } catch (error) {
    console.warn('Failed to load woman traditional SVG:', error);
  }

  try {
    const womanHistoricalSVG = await import("@/characters/woman/historical/svg/base.svg?raw");
    svgCharacters.push({
      id: 'woman-historical',
      type: 'woman',
      style: 'historical',
      svgContent: womanHistoricalSVG.default,
      animations: ['idle', 'walk', 'curtsy', 'dance', 'wave']
    });
  } catch (error) {
    console.warn('Failed to load woman historical SVG:', error);
  }

  try {
    const womanOccupationalSVG = await import("@/characters/woman/occupational/svg/base.svg?raw");
    svgCharacters.push({
      id: 'woman-occupational',
      type: 'woman',
      style: 'occupational',
      svgContent: womanOccupationalSVG.default,
      animations: ['idle', 'walk', 'work', 'type', 'write']
    });
  } catch (error) {
    console.warn('Failed to load woman occupational SVG:', error);
  }

  return svgCharacters;
};

// Cache for loaded SVG characters
let svgCharactersCache: SVGCharacter[] | null = null;
let isLoadingSVGs = false;

// Get SVG characters with caching
export const getSVGCharacters = async (): Promise<SVGCharacter[]> => {
  if (svgCharactersCache) {
    return svgCharactersCache;
  }

  if (isLoadingSVGs) {
    // Wait for loading to complete
    return new Promise((resolve) => {
      const checkCache = () => {
        if (svgCharactersCache) {
          resolve(svgCharactersCache);
        } else {
          setTimeout(checkCache, 100);
        }
      };
      checkCache();
    });
  }

  isLoadingSVGs = true;
  try {
    svgCharactersCache = await importSVGCharacters();
    return svgCharactersCache;
  } catch (error) {
    console.error('Failed to load SVG characters:', error);
    return [];
  } finally {
    isLoadingSVGs = false;
  }
};

// Get SVG content for a specific character type and style
export const getSVGContent = async (
  type: 'boy' | 'girl' | 'man' | 'woman',
  style: string
): Promise<string | null> => {
  const svgCharacters = await getSVGCharacters();
  const character = svgCharacters.find(
    char => char.type === type && char.style === style
  );
  return character?.svgContent || null;
};

// Get all available character combinations
export const getAvailableCharacterCombinations = async (): Promise<Array<{
  type: 'boy' | 'girl' | 'man' | 'woman';
  style: string;
  hasSVG: boolean;
}>> => {
  const svgCharacters = await getSVGCharacters();
  
  const allCombinations: Array<{
    type: 'boy' | 'girl' | 'man' | 'woman';
    style: string;
    hasSVG: boolean;
  }> = [];

  const types: Array<'boy' | 'girl' | 'man' | 'woman'> = ['boy', 'girl', 'man', 'woman'];
  const styles = ['casual', 'formal', 'sporty', 'fantasy', 'sci-fi', 'historical', 'traditional', 'holiday', 'sports', 'occupational'];

  types.forEach(type => {
    styles.forEach(style => {
      const hasSVG = svgCharacters.some(char => char.type === type && char.style === style);
      allCombinations.push({ type, style, hasSVG });
    });
  });

  return allCombinations;
};

// Enhanced character with SVG content
export interface EnhancedCharacter {
  id: string;
  name: string;
  type: 'boy' | 'girl' | 'man' | 'woman';
  style: string;
  culture: string;
  bodyType: string;
  theme: string;
  animations: string[];
  description: string;
  tags: string[];
  isAvailable: boolean;
  svgContent?: string;
  hasSVG: boolean;
  region?: string;
  religion?: string;
  community?: string;
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

// Enhance character database with SVG content
export const enhanceCharactersWithSVG = async (
  characters: any[]
): Promise<EnhancedCharacter[]> => {
  const svgCharacters = await getSVGCharacters();
  
  return characters.map(character => {
    // Find matching SVG character
    const svgCharacter = svgCharacters.find(
      svgChar => 
        svgChar.type === character.type && 
        svgChar.style === character.style
    );

    return {
      ...character,
      svgContent: svgCharacter?.svgContent,
      hasSVG: !!svgCharacter,
      animations: svgCharacter?.animations || character.animations || []
    };
  });
};

// Generate placeholder SVG content for characters without SVG
export const generatePlaceholderSVG = (
  type: 'boy' | 'girl' | 'man' | 'woman',
  style: string,
  name: string
): string => {
  const colors = {
    boy: '#4169E1',
    girl: '#FF69B4',
    man: '#2F4F4F',
    woman: '#8B4513'
  };

  const color = colors[type] || '#666666';

  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f8f9fa" rx="10"/>
      
      <!-- Character Icon -->
      <circle cx="100" cy="80" r="30" fill="${color}" opacity="0.3"/>
      <path d="M100 110 L100 160 M70 130 L130 130" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
      
      <!-- Style Badge -->
      <rect x="10" y="10" width="60" height="20" fill="${color}" rx="10"/>
      <text x="40" y="24" text-anchor="middle" fill="white" font-size="10" font-weight="bold">
        ${style}
      </text>
      
      <!-- Type Badge -->
      <rect x="130" y="10" width="60" height="20" fill="${color}" rx="10"/>
      <text x="160" y="24" text-anchor="middle" fill="white" font-size="10" font-weight="bold">
        ${type}
      </text>
      
      <!-- Name -->
      <text x="100" y="185" text-anchor="middle" fill="${color}" font-size="12" font-weight="bold">
        ${name}
      </text>
    </svg>
  `;
};