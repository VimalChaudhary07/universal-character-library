// Enhanced Customization System for Universal Character Library
// Comprehensive customization options for skin tone, hair, clothing, accessories, and more

export interface SkinToneOption {
  id: string;
  name: string;
  value: string;
  category: 'light' | 'medium' | 'dark' | 'olive' | 'tan' | 'deep';
  description: string;
}

export interface HairTypeOption {
  id: string;
  name: string;
  value: string;
  category: 'straight' | 'wavy' | 'curly' | 'braided' | 'spiky' | 'long' | 'short' | 'bald';
  description: string;
  compatibleWith: ('boy' | 'girl' | 'man' | 'woman')[];
}

export interface HairColorOption {
  id: string;
  name: string;
  value: string;
  category: 'natural' | 'dyed' | 'fantasy' | 'gray' | 'special';
  description: string;
}

export interface ClothingOption {
  id: string;
  name: string;
  category: 'top' | 'bottom' | 'dress' | 'uniform' | 'costume' | 'traditional';
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional';
  culture?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
  compatibleWith: ('boy' | 'girl' | 'man' | 'woman')[];
}

export interface AccessoryOption {
  id: string;
  name: string;
  category: 'headwear' | 'eyewear' | 'jewelry' | 'bags' | 'tech' | 'cultural' | 'weapon' | 'tool';
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional';
  culture?: string;
  description: string;
  compatibleWith: ('boy' | 'girl' | 'man' | 'woman')[];
  position: 'head' | 'face' | 'neck' | 'chest' | 'waist' | 'hands' | 'feet';
}

export interface FootwearOption {
  id: string;
  name: string;
  category: 'sneakers' | 'boots' | 'sandals' | 'formal' | 'athletic' | 'special' | 'traditional';
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional';
  culture?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
  compatibleWith: ('boy' | 'girl' | 'man' | 'woman')[];
}

export interface PropOption {
  id: string;
  name: string;
  category: 'weapon' | 'tool' | 'instrument' | 'tech' | 'sports' | 'food' | 'book' | 'cultural';
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional';
  culture?: string;
  description: string;
  compatibleWith: ('boy' | 'girl' | 'man' | 'woman')[];
  position: 'left-hand' | 'right-hand' | 'both-hands' | 'back' | 'waist' | 'shoulder';
}

export interface BackgroundOption {
  id: string;
  name: string;
  type: 'solid' | 'gradient' | 'pattern' | 'scene' | 'transparent';
  value: string;
  description: string;
  category: 'simple' | 'nature' | 'urban' | 'fantasy' | 'sci-fi' | 'abstract';
}

export interface CharacterCustomization {
  skinTone: SkinToneOption;
  hairType: HairTypeOption;
  hairColor: HairColorOption;
  clothing: {
    top: ClothingOption | null;
    bottom: ClothingOption | null;
    dress: ClothingOption | null;
  };
  accessories: AccessoryOption[];
  footwear: FootwearOption;
  props: PropOption[];
  background: BackgroundOption;
  bodyType: 'slim' | 'average' | 'athletic' | 'muscular' | 'heavy' | 'tall' | 'short' | 'elderly';
  expression: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'confused' | 'excited' | 'bored';
  pose: 'standing' | 'sitting' | 'walking' | 'running' | 'jumping' | 'dancing' | 'fighting' | 'working';
}

// Comprehensive skin tone options
export const SKIN_TONE_OPTIONS: SkinToneOption[] = [
  // Light tones
  { id: 'skin-porcelain', name: 'Porcelain', value: '#FDBCB4', category: 'light', description: 'Very fair skin tone' },
  { id: 'skin-ivory', name: 'Ivory', value: '#F1C27D', category: 'light', description: 'Light fair skin tone' },
  { id: 'skin-light-beige', name: 'Light Beige', value: '#E0AC69', category: 'light', description: 'Light beige skin tone' },
  
  // Medium tones
  { id: 'skin-medium-beige', name: 'Medium Beige', value: '#C68642', category: 'medium', description: 'Medium beige skin tone' },
  { id: 'skin-tan', name: 'Tan', value: '#8D5524', category: 'tan', description: 'Tanned skin tone' },
  { id: 'skin-olive-light', name: 'Light Olive', value: '#C19A6B', category: 'olive', description: 'Light olive skin tone' },
  
  // Olive tones
  { id: 'skin-olive-medium', name: 'Medium Olive', value: '#A0826D', category: 'olive', description: 'Medium olive skin tone' },
  { id: 'skin-olive-dark', name: 'Dark Olive', value: '#8B7355', category: 'olive', description: 'Dark olive skin tone' },
  
  // Dark tones
  { id: 'skin-caramel', name: 'Caramel', value: '#7D5A50', category: 'dark', description: 'Caramel skin tone' },
  { id: 'skin-mocha', name: 'Mocha', value: '#6B4423', category: 'dark', description: 'Mocha skin tone' },
  { id: 'skin-chocolate', name: 'Chocolate', value: '#4B2C20', category: 'dark', description: 'Chocolate skin tone' },
  { id: 'skin-espresso', name: 'Espresso', value: '#2F1B14', category: 'deep', description: 'Very dark skin tone' },
  { id: 'skin-deep-brown', name: 'Deep Brown', value: '#1A0E08', category: 'deep', description: 'Deep brown skin tone' }
];

// Comprehensive hair type options
export const HAIR_TYPE_OPTIONS: HairTypeOption[] = [
  { id: 'hair-straight-short', name: 'Straight Short', value: 'straight-short', category: 'straight', description: 'Short straight hair', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'hair-straight-medium', name: 'Straight Medium', value: 'straight-medium', category: 'straight', description: 'Medium length straight hair', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'hair-straight-long', name: 'Straight Long', value: 'straight-long', category: 'long', description: 'Long straight hair', compatibleWith: ['girl', 'woman'] },
  
  { id: 'hair-wavy-short', name: 'Wavy Short', value: 'wavy-short', category: 'wavy', description: 'Short wavy hair', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'hair-wavy-medium', name: 'Wavy Medium', value: 'wavy-medium', category: 'wavy', description: 'Medium length wavy hair', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'hair-wavy-long', name: 'Wavy Long', value: 'wavy-long', category: 'long', description: 'Long wavy hair', compatibleWith: ['girl', 'woman'] },
  
  { id: 'hair-curly-short', name: 'Curly Short', value: 'curly-short', category: 'curly', description: 'Short curly hair', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'hair-curly-medium', name: 'Curly Medium', value: 'curly-medium', category: 'curly', description: 'Medium length curly hair', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'hair-curly-long', name: 'Curly Long', value: 'curly-long', category: 'long', description: 'Long curly hair', compatibleWith: ['girl', 'woman'] },
  { id: 'hair-afro', name: 'Afro', value: 'afro', category: 'curly', description: 'Afro hairstyle', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  { id: 'hair-braided-cornrows', name: 'Cornrows', value: 'cornrows', category: 'braided', description: 'Cornrow braids', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'hair-braided-box', name: 'Box Braids', value: 'box-braids', category: 'braided', description: 'Box braids', compatibleWith: ['girl', 'woman'] },
  { id: 'hair-braided-french', name: 'French Braids', value: 'french-braids', category: 'braided', description: 'French braids', compatibleWith: ['girl', 'woman'] },
  
  { id: 'hair-spiky-short', name: 'Spiky Short', value: 'spiky-short', category: 'spiky', description: 'Short spiky hair', compatibleWith: ['boy', 'man'] },
  { id: 'hair-spiky-mohawk', name: 'Mohawk', value: 'mohawk', category: 'spiky', description: 'Mohawk hairstyle', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  { id: 'hair-bald', name: 'Bald', value: 'bald', category: 'bald', description: 'No hair', compatibleWith: ['man', 'woman'] },
  { id: 'hair-buzz-cut', name: 'Buzz Cut', value: 'buzz-cut', category: 'short', description: 'Very short buzz cut', compatibleWith: ['boy', 'man'] },
  { id: 'hair-ponytail', name: 'Ponytail', value: 'ponytail', category: 'long', description: 'Ponytail hairstyle', compatibleWith: ['girl', 'woman'] },
  { id: 'hair-bun', name: 'Bun', value: 'bun', category: 'long', description: 'Bun hairstyle', compatibleWith: ['girl', 'woman'] }
];

// Comprehensive hair color options
export const HAIR_COLOR_OPTIONS: HairColorOption[] = [
  // Natural colors
  { id: 'hair-black', name: 'Black', value: '#000000', category: 'natural', description: 'Natural black hair' },
  { id: 'hair-dark-brown', name: 'Dark Brown', value: '#2F1B14', category: 'natural', description: 'Dark brown hair' },
  { id: 'hair-medium-brown', name: 'Medium Brown', value: '#4B2C20', category: 'natural', description: 'Medium brown hair' },
  { id: 'hair-light-brown', name: 'Light Brown', value: '#8B4513', category: 'natural', description: 'Light brown hair' },
  { id: 'hair-ash-brown', name: 'Ash Brown', value: '#654321', category: 'natural', description: 'Ash brown hair' },
  { id: 'hair-blonde', name: 'Blonde', value: '#FFD700', category: 'natural', description: 'Natural blonde hair' },
  { id: 'hair-ash-blonde', name: 'Ash Blonde', value: '#F0E68C', category: 'natural', description: 'Ash blonde hair' },
  { id: 'hair-platinum-blonde', name: 'Platinum Blonde', value: '#FAFAD2', category: 'natural', description: 'Platinum blonde hair' },
  { id: 'hair-red', name: 'Red', value: '#DC143C', category: 'natural', description: 'Natural red hair' },
  { id: 'hair-auburn', name: 'Auburn', value: '#CD5C5C', category: 'natural', description: 'Auburn hair' },
  { id: 'hair-strawberry-blonde', name: 'Strawberry Blonde', value: '#FFB6C1', category: 'natural', description: 'Strawberry blonde hair' },
  
  // Dyed colors
  { id: 'hair-pink', name: 'Pink', value: '#FF69B4', category: 'dyed', description: 'Pink dyed hair' },
  { id: 'hair-blue', name: 'Blue', value: '#4169E1', category: 'dyed', description: 'Blue dyed hair' },
  { id: 'hair-green', name: 'Green', value: '#32CD32', category: 'dyed', description: 'Green dyed hair' },
  { id: 'hair-purple', name: 'Purple', value: '#9370DB', category: 'dyed', description: 'Purple dyed hair' },
  { id: 'hair-orange', name: 'Orange', value: '#FF8C00', category: 'dyed', description: 'Orange dyed hair' },
  { id: 'hair-teal', name: 'Teal', value: '#00CED1', category: 'dyed', description: 'Teal dyed hair' },
  { id: 'hair-lavender', name: 'Lavender', value: '#E6E6FA', category: 'dyed', description: 'Lavender dyed hair' },
  
  // Fantasy colors
  { id: 'hair-rainbow', name: 'Rainbow', value: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)', category: 'fantasy', description: 'Rainbow colored hair' },
  { id: 'hair-galaxy', name: 'Galaxy', value: 'linear-gradient(to bottom, #4B0082, #0000FF, #00FF00, #FFFF00, #FF7F00, #FF0000)', category: 'fantasy', description: 'Galaxy themed hair' },
  { id: 'hair-fire', name: 'Fire', value: 'linear-gradient(to top, #FF4500, #FFD700, #FF6347)', category: 'fantasy', description: 'Fire themed hair' },
  { id: 'hair-ocean', name: 'Ocean', value: 'linear-gradient(to bottom, #000080, #4169E1, #00CED1, #40E0D0)', category: 'fantasy', description: 'Ocean themed hair' },
  
  // Gray colors
  { id: 'hair-silver', name: 'Silver', value: '#C0C0C0', category: 'gray', description: 'Silver hair' },
  { id: 'hair-gray', name: 'Gray', value: '#808080', category: 'gray', description: 'Gray hair' },
  { id: 'hair-white', name: 'White', value: '#FFFFFF', category: 'gray', description: 'White hair' },
  
  // Special colors
  { id: 'hair-neon-pink', name: 'Neon Pink', value: '#FF1493', category: 'special', description: 'Neon pink hair' },
  { id: 'hair-neon-green', name: 'Neon Green', value: '#00FF00', category: 'special', description: 'Neon green hair' },
  { id: 'hair-neon-blue', name: 'Neon Blue', value: '#00BFFF', category: 'special', description: 'Neon blue hair' },
  { id: 'hair-holographic', name: 'Holographic', value: 'linear-gradient(45deg, #FF69B4, #00CED1, #FFD700, #9370DB)', category: 'special', description: 'Holographic hair' }
];

// Comprehensive clothing options
export const CLOTHING_OPTIONS: ClothingOption[] = [
  // Casual tops
  { id: 'clothing-tshirt-basic', name: 'Basic T-Shirt', category: 'top', style: 'casual', colors: { primary: '#4169E1', secondary: '#FFFFFF', accent: '#000000' }, description: 'Basic cotton t-shirt', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-tshirt-graphic', name: 'Graphic T-Shirt', category: 'top', style: 'casual', colors: { primary: '#FF69B4', secondary: '#FFFFFF', accent: '#000000' }, description: 'T-shirt with graphic design', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-shirt-casual', name: 'Casual Shirt', category: 'top', style: 'casual', colors: { primary: '#32CD32', secondary: '#FFFFFF', accent: '#000000' }, description: 'Casual button-up shirt', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-hoodie', name: 'Hoodie', category: 'top', style: 'casual', colors: { primary: '#808080', secondary: '#FFFFFF', accent: '#000000' }, description: 'Comfortable hoodie', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-sweater', name: 'Sweater', category: 'top', style: 'casual', colors: { primary: '#DC143C', secondary: '#FFFFFF', accent: '#000000' }, description: 'Warm sweater', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Casual bottoms
  { id: 'clothing-jeans', name: 'Jeans', category: 'bottom', style: 'casual', colors: { primary: '#000080', secondary: '#4169E1', accent: '#C0C0C0' }, description: 'Classic denim jeans', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-shorts-casual', name: 'Casual Shorts', category: 'bottom', style: 'casual', colors: { primary: '#228B22', secondary: '#FFFFFF', accent: '#000000' }, description: 'Casual shorts', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-skirt-casual', name: 'Casual Skirt', category: 'bottom', style: 'casual', colors: { primary: '#FF69B4', secondary: '#FFFFFF', accent: '#000000' }, description: 'Casual skirt', compatibleWith: ['girl', 'woman'] },
  { id: 'clothing-leggings', name: 'Leggings', category: 'bottom', style: 'casual', colors: { primary: '#000000', secondary: '#808080', accent: '#FFFFFF' }, description: 'Comfortable leggings', compatibleWith: ['girl', 'woman'] },
  
  // Formal wear
  { id: 'clothing-suit-formal', name: 'Formal Suit', category: 'top', style: 'formal', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FFD700' }, description: 'Formal business suit', compatibleWith: ['man', 'woman'] },
  { id: 'clothing-dress-formal', name: 'Formal Dress', category: 'dress', style: 'formal', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FFD700' }, description: 'Elegant formal dress', compatibleWith: ['girl', 'woman'] },
  { id: 'clothing-shirt-formal', name: 'Formal Shirt', category: 'top', style: 'formal', colors: { primary: '#FFFFFF', secondary: '#000000', accent: '#C0C0C0' }, description: 'Formal dress shirt', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-pants-formal', name: 'Formal Pants', category: 'bottom', style: 'formal', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#C0C0C0' }, description: 'Formal dress pants', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Sporty wear
  { id: 'clothing-jersey-sports', name: 'Sports Jersey', category: 'top', style: 'sporty', colors: { primary: '#FF6B35', secondary: '#FFFFFF', accent: '#000000' }, description: 'Athletic jersey', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-shorts-sports', name: 'Sports Shorts', category: 'bottom', style: 'sporty', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FF6B35' }, description: 'Athletic shorts', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-tank-top', name: 'Tank Top', category: 'top', style: 'sporty', colors: { primary: '#00CED1', secondary: '#FFFFFF', accent: '#000000' }, description: 'Athletic tank top', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Fantasy wear
  { id: 'clothing-robe-mage', name: 'Mage Robe', category: 'top', style: 'fantasy', colors: { primary: '#9370DB', secondary: '#4B0082', accent: '#FFD700' }, description: 'Mystical mage robe', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-armor-knight', name: 'Knight Armor', category: 'top', style: 'fantasy', colors: { primary: '#C0C0C0', secondary: '#808080', accent: '#FFD700' }, description: 'Shining knight armor', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-dress-princess', name: 'Princess Dress', category: 'dress', style: 'fantasy', colors: { primary: '#FF69B4', secondary: '#FFD700', accent: '#FFFFFF' }, description: 'Elegant princess dress', compatibleWith: ['girl', 'woman'] },
  
  // Sci-fi wear
  { id: 'clothing-suit-spaceship', name: 'Spacesuit', category: 'top', style: 'sci-fi', colors: { primary: '#FFFFFF', secondary: '#C0C0C0', accent: '#00CED1' }, description: 'Futuristic spacesuit', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-uniform-cyber', name: 'Cyber Uniform', category: 'top', style: 'sci-fi', colors: { primary: '#000000', secondary: '#00CED1', accent: '#FF69B4' }, description: 'Cyberpunk uniform', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Historical wear
  { id: 'clothing-toga-roman', name: 'Roman Toga', category: 'dress', style: 'historical', culture: 'Roman', colors: { primary: '#FFFFFF', secondary: '#FFD700', accent: '#DC143C' }, description: 'Ancient Roman toga', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-kimono-japanese', name: 'Kimono', category: 'dress', style: 'historical', culture: 'Japanese', colors: { primary: '#DC143C', secondary: '#FFD700', accent: '#FFFFFF' }, description: 'Traditional Japanese kimono', compatibleWith: ['girl', 'woman'] },
  { id: 'clothing-sari-indian', name: 'Sari', category: 'dress', style: 'traditional', culture: 'Indian', colors: { primary: '#FF6B35', secondary: '#FFD700', accent: '#9400D3' }, description: 'Traditional Indian sari', compatibleWith: ['girl', 'woman'] },
  { id: 'clothing-thobe-arabic', name: 'Thobe', category: 'top', style: 'traditional', culture: 'Arabic', colors: { primary: '#FFFFFF', secondary: '#000000', accent: '#FFD700' }, description: 'Traditional Arabic thobe', compatibleWith: ['boy', 'man'] },
  
  // Traditional wear from various cultures
  { id: 'clothing-hanfu-chinese', name: 'Hanfu', category: 'dress', style: 'traditional', culture: 'Chinese', colors: { primary: '#DC143C', secondary: '#FFD700', accent: '#000000' }, description: 'Traditional Chinese hanfu', compatibleWith: ['girl', 'woman'] },
  { id: 'clothing-ao-dai-vietnamese', name: 'Ao Dai', category: 'dress', style: 'traditional', culture: 'Vietnamese', colors: { primary: '#FFD700', secondary: '#FF69B4', accent: '#FFFFFF' }, description: 'Traditional Vietnamese ao dai', compatibleWith: ['girl', 'woman'] },
  { id: 'clothing-dashiki-african', name: 'Dashiki', category: 'top', style: 'traditional', culture: 'African', colors: { primary: '#FFD700', secondary: '#DC143C', accent: '#00CED1' }, description: 'Traditional African dashiki', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'clothing-regalia-native', name: 'Native Regalia', category: 'top', style: 'traditional', culture: 'Native American', colors: { primary: '#8B4513', secondary: '#FFD700', accent: '#DC143C' }, description: 'Native American regalia', compatibleWith: ['boy', 'girl', 'man', 'woman'] }
];

// Comprehensive accessory options
export const ACCESSORY_OPTIONS: AccessoryOption[] = [
  // Headwear
  { id: 'accessory-cap-baseball', name: 'Baseball Cap', category: 'headwear', style: 'casual', description: 'Classic baseball cap', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'head' },
  { id: 'accessory-beanie', name: 'Beanie', category: 'headwear', style: 'casual', description: 'Warm beanie hat', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'head' },
  { id: 'accessory-fedora', name: 'Fedora', category: 'headwear', style: 'formal', description: 'Classic fedora hat', compatibleWith: ['man', 'woman'], position: 'head' },
  { id: 'accessory-crown', name: 'Crown', category: 'headwear', style: 'fantasy', description: 'Royal crown', compatibleWith: ['girl', 'woman'], position: 'head' },
  { id: 'accessory-helmet-knight', name: 'Knight Helmet', category: 'headwear', style: 'fantasy', description: 'Protective knight helmet', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'head' },
  { id: 'accessory-turban', name: 'Turban', category: 'headwear', style: 'traditional', culture: 'Indian', description: 'Traditional turban', compatibleWith: ['man', 'woman'], position: 'head' },
  { id: 'accessory-hijab', name: 'Hijab', category: 'headwear', style: 'traditional', culture: 'Middle Eastern', description: 'Traditional hijab', compatibleWith: ['girl', 'woman'], position: 'head' },
  
  // Eyewear
  { id: 'accessory-glasses', name: 'Glasses', category: 'eyewear', style: 'casual', description: 'Prescription glasses', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'face' },
  { id: 'accessory-sunglasses', name: 'Sunglasses', category: 'eyewear', style: 'casual', description: 'Cool sunglasses', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'face' },
  { id: 'accessory-goggles', name: 'Goggles', category: 'eyewear', style: 'sporty', description: 'Protective goggles', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'face' },
  { id: 'accessory-monocle', name: 'Monocle', category: 'eyewear', style: 'historical', description: 'Vintage monocle', compatibleWith: ['man', 'woman'], position: 'face' },
  
  // Jewelry
  { id: 'accessory-necklace-simple', name: 'Simple Necklace', category: 'jewelry', style: 'casual', description: 'Simple necklace', compatibleWith: ['girl', 'woman'], position: 'neck' },
  { id: 'accessory-necklace-pearl', name: 'Pearl Necklace', category: 'jewelry', style: 'formal', description: 'Elegant pearl necklace', compatibleWith: ['girl', 'woman'], position: 'neck' },
  { id: 'accessory-necklace-gold', name: 'Gold Chain', category: 'jewelry', style: 'casual', description: 'Gold chain necklace', compatibleWith: ['boy', 'man'], position: 'neck' },
  { id: 'accessory-earrings-simple', name: 'Simple Earrings', category: 'jewelry', style: 'casual', description: 'Simple earrings', compatibleWith: ['girl', 'woman'], position: 'face' },
  { id: 'accessory-earrings-dangling', name: 'Dangling Earrings', category: 'jewelry', style: 'formal', description: 'Dangling earrings', compatibleWith: ['girl', 'woman'], position: 'face' },
  { id: 'accessory-bracelet', name: 'Bracelet', category: 'jewelry', style: 'casual', description: 'Decorative bracelet', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' },
  { id: 'accessory-ring', name: 'Ring', category: 'jewelry', style: 'casual', description: 'Decorative ring', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' },
  
  // Bags
  { id: 'accessory-backpack', name: 'Backpack', category: 'bags', style: 'casual', description: 'Practical backpack', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'back' },
  { id: 'accessory-purse', name: 'Purse', category: 'bags', style: 'formal', description: 'Elegant purse', compatibleWith: ['girl', 'woman'], position: 'hands' },
  { id: 'accessory-messenger-bag', name: 'Messenger Bag', category: 'bags', style: 'casual', description: 'Messenger bag', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'waist' },
  
  // Tech accessories
  { id: 'accessory-headphones', name: 'Headphones', category: 'tech', style: 'casual', description: 'Music headphones', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'head' },
  { id: 'accessory-smartwatch', name: 'Smartwatch', category: 'tech', style: 'casual', description: 'Smart fitness watch', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' },
  { id: 'accessory-vr-headset', name: 'VR Headset', category: 'tech', style: 'sci-fi', description: 'Virtual reality headset', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'head' },
  
  // Cultural accessories
  { id: 'accessory-feather-headdress', name: 'Feather Headdress', category: 'cultural', style: 'traditional', culture: 'Native American', description: 'Traditional feather headdress', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'head' },
  { id: 'accessory-maori-tattoo', name: 'Maori Tattoo', category: 'cultural', style: 'traditional', culture: 'Maori', description: 'Traditional Maori face tattoo', compatibleWith: ['man', 'woman'], position: 'face' },
  { id: 'accessory-bindi', name: 'Bindi', category: 'cultural', style: 'traditional', culture: 'Indian', description: 'Traditional bindi', compatibleWith: ['girl', 'woman'], position: 'face' },
  
  // Weapons
  { id: 'accessory-sword-fantasy', name: 'Fantasy Sword', category: 'weapon', style: 'fantasy', description: 'Magical fantasy sword', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' },
  { id: 'accessory-bow-arrow', name: 'Bow and Arrow', category: 'weapon', style: 'fantasy', description: 'Archery bow and arrows', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' },
  { id: 'accessory-lightsaber', name: 'Lightsaber', category: 'weapon', style: 'sci-fi', description: 'Lightsaber weapon', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' },
  
  // Tools
  { id: 'accessory-wrench', name: 'Wrench', category: 'tool', style: 'casual', description: 'Mechanic wrench', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' },
  { id: 'accessory-paintbrush', name: 'Paintbrush', category: 'tool', style: 'casual', description: 'Artist paintbrush', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' },
  { id: 'accessory-microphone', name: 'Microphone', category: 'tool', style: 'casual', description: 'Singing microphone', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'hands' }
];

// Comprehensive footwear options
export const FOOTWEAR_OPTIONS: FootwearOption[] = [
  // Sneakers
  { id: 'footwear-sneakers-casual', name: 'Casual Sneakers', category: 'sneakers', style: 'casual', colors: { primary: '#FFFFFF', secondary: '#000000', accent: '#FF69B4' }, description: 'Comfortable casual sneakers', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'footwear-sneakers-running', name: 'Running Shoes', category: 'sneakers', style: 'sporty', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#00CED1' }, description: 'Athletic running shoes', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'footwear-sneakers-high-top', name: 'High-Top Sneakers', category: 'sneakers', style: 'casual', colors: { primary: '#FFFFFF', secondary: '#FF69B4', accent: '#000000' }, description: 'Fashion high-top sneakers', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Boots
  { id: 'footwear-boots-combat', name: 'Combat Boots', category: 'boots', style: 'casual', colors: { primary: '#000000', secondary: '#808080', accent: '#C0C0C0' }, description: 'Tough combat boots', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'footwear-boots-rain', name: 'Rain Boots', category: 'boots', style: 'casual', colors: { primary: '#FF69B4', secondary: '#FFFFFF', accent: '#000000' }, description: 'Waterproof rain boots', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'footwear-boots-cowboy', name: 'Cowboy Boots', category: 'boots', style: 'casual', colors: { primary: '#8B4513', secondary: '#FFD700', accent: '#000000' }, description: 'Classic cowboy boots', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'footwear-boots-winter', name: 'Winter Boots', category: 'boots', style: 'casual', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#C0C0C0' }, description: 'Warm winter boots', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Sandals
  { id: 'footwear-sandals-flip-flops', name: 'Flip-Flops', category: 'sandals', style: 'casual', colors: { primary: '#FF69B4', secondary: '#FFFFFF', accent: '#000000' }, description: 'Casual flip-flops', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'footwear-sandals-formal', name: 'Formal Sandals', category: 'sandals', style: 'formal', colors: { primary: '#000000', secondary: '#FFD700', accent: '#FFFFFF' }, description: 'Elegant formal sandals', compatibleWith: ['girl', 'woman'] },
  { id: 'footwear-sandals-sports', name: 'Sports Sandals', category: 'sandals', style: 'sporty', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#00CED1' }, description: 'Athletic sports sandals', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Formal footwear
  { id: 'footwear-formal-shoes', name: 'Formal Shoes', category: 'formal', style: 'formal', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FFD700' }, description: 'Classic formal shoes', compatibleWith: ['boy', 'man'] },
  { id: 'footwear-formal-heels', name: 'High Heels', category: 'formal', style: 'formal', colors: { primary: '#000000', secondary: '#FF69B4', accent: '#FFD700' }, description: 'Elegant high heels', compatibleWith: ['girl', 'woman'] },
  { id: 'footwear-formal-loafers', name: 'Loafers', category: 'formal', style: 'formal', colors: { primary: '#8B4513', secondary: '#000000', accent: '#FFD700' }, description: 'Comfortable loafers', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Athletic footwear
  { id: 'footwear-athletic-cleats', name: 'Cleats', category: 'athletic', style: 'sporty', colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#00CED1' }, description: 'Sports cleats', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'footwear-athletic-basketball', name: 'Basketball Shoes', category: 'athletic', style: 'sporty', colors: { primary: '#FF6B35', secondary: '#FFFFFF', accent: '#000000' }, description: 'Basketball athletic shoes', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Special footwear
  { id: 'footwear-special-ballet', name: 'Ballet Shoes', category: 'special', style: 'formal', colors: { primary: '#FF69B4', secondary: '#FFFFFF', accent: '#FFD700' }, description: 'Ballet dance shoes', compatibleWith: ['girl', 'woman'] },
  { id: 'footwear-special-roller-skates', name: 'Roller Skates', category: 'special', style: 'casual', colors: { primary: '#FF69B4', secondary: '#FFFFFF', accent: '#000000' }, description: 'Fun roller skates', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  
  // Traditional footwear
  { id: 'footwear-traditional-geta', name: 'Geta', category: 'traditional', style: 'traditional', culture: 'Japanese', colors: { primary: '#8B4513', secondary: '#000000', accent: '#FFFFFF' }, description: 'Traditional Japanese geta', compatibleWith: ['boy', 'girl', 'man', 'woman'] },
  { id: 'footwear-traditional-mojari', name: 'Mojari', category: 'traditional', style: 'traditional', culture: 'Indian', colors: { primary: '#FFD700', secondary: '#FF6B35', accent: '#9400D3' }, description: 'Traditional Indian mojari', compatibleWith: ['boy', 'girl', 'man', 'woman'] }
];

// Comprehensive prop options
export const PROP_OPTIONS: PropOption[] = [
  // Weapons
  { id: 'prop-sword-knight', name: 'Knight Sword', category: 'weapon', style: 'fantasy', description: 'Medieval knight sword', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-bow-arrow', name: 'Bow and Arrow', category: 'weapon', style: 'fantasy', description: 'Archery bow and arrows', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-lightsaber', name: 'Lightsaber', category: 'weapon', style: 'sci-fi', description: 'Jedi lightsaber', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-laser-gun', name: 'Laser Gun', category: 'weapon', style: 'sci-fi', description: 'Futuristic laser gun', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-magic-wand', name: 'Magic Wand', category: 'weapon', style: 'fantasy', description: 'Magic wizard wand', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-shield', name: 'Shield', category: 'weapon', style: 'fantasy', description: 'Protective shield', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'left-hand' },
  
  // Tools
  { id: 'prop-hammer', name: 'Hammer', category: 'tool', style: 'casual', description: 'Construction hammer', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-wrench', name: 'Wrench', category: 'tool', style: 'casual', description: 'Mechanic wrench', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-paintbrush', name: 'Paintbrush', category: 'tool', style: 'casual', description: 'Artist paintbrush', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-camera', name: 'Camera', category: 'tool', style: 'casual', description: 'Photography camera', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-microphone', name: 'Microphone', category: 'tool', style: 'casual', description: 'Singing microphone', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-laptop', name: 'Laptop', category: 'tool', style: 'casual', description: 'Computer laptop', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  
  // Instruments
  { id: 'prop-guitar', name: 'Guitar', category: 'instrument', style: 'casual', description: 'Acoustic guitar', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-piano-keyboard', name: 'Piano Keyboard', category: 'instrument', style: 'casual', description: 'Portable piano keyboard', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-violin', name: 'Violin', category: 'instrument', style: 'formal', description: 'Classical violin', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-drumsticks', name: 'Drumsticks', category: 'instrument', style: 'casual', description: 'Drum drumsticks', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-saxophone', name: 'Saxophone', category: 'instrument', style: 'casual', description: 'Jazz saxophone', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  
  // Tech props
  { id: 'prop-smartphone', name: 'Smartphone', category: 'tech', style: 'casual', description: 'Modern smartphone', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-tablet', name: 'Tablet', category: 'tech', style: 'casual', description: 'Tablet computer', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-drone-controller', name: 'Drone Controller', category: 'tech', style: 'casual', description: 'Remote drone controller', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  
  // Sports props
  { id: 'prop-basketball', name: 'Basketball', category: 'sports', style: 'sporty', description: 'Basketball ball', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-football', name: 'Football', category: 'sports', style: 'sporty', description: 'American football', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-soccer-ball', name: 'Soccer Ball', category: 'sports', style: 'sporty', description: 'Soccer football', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-tennis-racket', name: 'Tennis Racket', category: 'sports', style: 'sporty', description: 'Tennis racket', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-golf-clubs', name: 'Golf Clubs', category: 'sports', style: 'sporty', description: 'Golf club set', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  
  // Food props
  { id: 'prop-pizza', name: 'Pizza Slice', category: 'food', style: 'casual', description: 'Slice of pizza', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-coffee-cup', name: 'Coffee Cup', category: 'food', style: 'casual', description: 'Coffee cup', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-ice-cream', name: 'Ice Cream Cone', category: 'food', style: 'casual', description: 'Ice cream cone', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'right-hand' },
  { id: 'prop-hamburger', name: 'Hamburger', category: 'food', style: 'casual', description: 'Hamburger', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  
  // Book props
  { id: 'prop-book', name: 'Book', category: 'book', style: 'casual', description: 'Reading book', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-scroll', name: 'Ancient Scroll', category: 'book', style: 'fantasy', description: 'Ancient magic scroll', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-tablet-stone', name: 'Stone Tablet', category: 'book', style: 'historical', description: 'Ancient stone tablet', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  
  // Cultural props
  { id: 'prop-fan-japanese', name: 'Japanese Fan', category: 'cultural', style: 'traditional', culture: 'Japanese', description: 'Traditional Japanese fan', compatibleWith: ['girl', 'woman'], position: 'right-hand' },
  { id: 'prop-umbrella-asian', name: 'Asian Umbrella', category: 'cultural', style: 'traditional', culture: 'Asian', description: 'Traditional Asian umbrella', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-drum-african', name: 'African Drum', category: 'cultural', style: 'traditional', culture: 'African', description: 'Traditional African drum', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' },
  { id: 'prop-flute-native', name: 'Native Flute', category: 'cultural', style: 'traditional', culture: 'Native American', description: 'Traditional Native American flute', compatibleWith: ['boy', 'girl', 'man', 'woman'], position: 'both-hands' }
];

// Comprehensive background options
export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  // Solid backgrounds
  { id: 'bg-solid-white', name: 'White', type: 'solid', value: '#FFFFFF', description: 'Pure white background', category: 'simple' },
  { id: 'bg-solid-black', name: 'Black', type: 'solid', value: '#000000', description: 'Pure black background', category: 'simple' },
  { id: 'bg-solid-gray', name: 'Gray', type: 'solid', value: '#808080', description: 'Neutral gray background', category: 'simple' },
  { id: 'bg-solid-blue', name: 'Blue', type: 'solid', value: '#4169E1', description: 'Sky blue background', category: 'simple' },
  { id: 'bg-solid-green', name: 'Green', type: 'solid', value: '#32CD32', description: 'Forest green background', category: 'simple' },
  { id: 'bg-solid-red', name: 'Red', type: 'solid', value: '#DC143C', description: 'Vibrant red background', category: 'simple' },
  { id: 'bg-solid-yellow', name: 'Yellow', type: 'solid', value: '#FFD700', description: 'Sunny yellow background', category: 'simple' },
  { id: 'bg-solid-purple', name: 'Purple', type: 'solid', value: '#9370DB', description: 'Royal purple background', category: 'simple' },
  { id: 'bg-solid-pink', name: 'Pink', type: 'solid', value: '#FF69B4', description: 'Pretty pink background', category: 'simple' },
  { id: 'bg-solid-orange', name: 'Orange', type: 'solid', value: '#FF8C00', description: 'Bright orange background', category: 'simple' },
  
  // Gradient backgrounds
  { id: 'bg-gradient-sunset', name: 'Sunset', type: 'gradient', value: 'linear-gradient(to bottom, #FF6B35, #FFD700, #FF69B4)', description: 'Beautiful sunset gradient', category: 'nature' },
  { id: 'bg-gradient-ocean', name: 'Ocean', type: 'gradient', value: 'linear-gradient(to bottom, #000080, #4169E1, #00CED1)', description: 'Deep ocean gradient', category: 'nature' },
  { id: 'bg-gradient-forest', name: 'Forest', type: 'gradient', value: 'linear-gradient(to bottom, #228B22, #32CD32, #90EE90)', description: 'Lush forest gradient', category: 'nature' },
  { id: 'bg-gradient-galaxy', name: 'Galaxy', type: 'gradient', value: 'linear-gradient(to bottom, #000000, #4B0082, #9370DB)', description: 'Space galaxy gradient', category: 'fantasy' },
  { id: 'bg-gradient-neon', name: 'Neon', type: 'gradient', value: 'linear-gradient(45deg, #FF1493, #00CED1, #FFD700)', description: 'Neon lights gradient', category: 'abstract' },
  { id: 'bg-gradient-rainbow', name: 'Rainbow', type: 'gradient', value: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)', description: 'Colorful rainbow gradient', category: 'abstract' },
  
  // Pattern backgrounds
  { id: 'bg-pattern-dots', name: 'Polka Dots', type: 'pattern', value: 'radial-gradient(circle, #000000 10%, transparent 10%)', description: 'Classic polka dot pattern', category: 'simple' },
  { id: 'bg-pattern-stripes', name: 'Stripes', type: 'pattern', value: 'repeating-linear-gradient(45deg, #000000, #000000 10px, #FFFFFF 10px, #FFFFFF 20px)', description: 'Diagonal stripe pattern', category: 'simple' },
  { id: 'bg-pattern-checkerboard', name: 'Checkerboard', type: 'pattern', value: 'repeating-conic-gradient(#000000 0deg 90deg, #FFFFFF 90deg 180deg)', description: 'Classic checkerboard pattern', category: 'simple' },
  { id: 'bg-pattern-circuit', name: 'Circuit Board', type: 'pattern', value: 'linear-gradient(90deg, #00CED1 50%, transparent 50%), linear-gradient(#00CED1 50%, transparent 50%)', description: 'Tech circuit board pattern', category: 'sci-fi' },
  { id: 'bg-pattern-magic', name: 'Magic Runes', type: 'pattern', value: 'radial-gradient(circle, #9370DB 2%, transparent 2%)', description: 'Mystical magic rune pattern', category: 'fantasy' },
  
  // Scene backgrounds
  { id: 'bg-scene-park', name: 'Park', type: 'scene', value: 'url(/backgrounds/park.jpg)', description: 'Peaceful park scene', category: 'nature' },
  { id: 'bg-scene-beach', name: 'Beach', type: 'scene', value: 'url(/backgrounds/beach.jpg)', description: 'Sunny beach scene', category: 'nature' },
  { id: 'bg-scene-city', name: 'City', type: 'scene', value: 'url(/backgrounds/city.jpg)', description: 'Urban city scene', category: 'urban' },
  { id: 'bg-scene-space', name: 'Space', type: 'scene', value: 'url(/backgrounds/space.jpg)', description: 'Outer space scene', category: 'sci-fi' },
  { id: 'bg-scene-castle', name: 'Castle', type: 'scene', value: 'url(/backgrounds/castle.jpg)', description: 'Medieval castle scene', category: 'fantasy' },
  { id: 'bg-scene-office', name: 'Office', type: 'scene', value: 'url(/backgrounds/office.jpg)', description: 'Modern office scene', category: 'urban' },
  
  // Transparent background
  { id: 'bg-transparent', name: 'Transparent', type: 'transparent', value: 'transparent', description: 'No background (transparent)', category: 'simple' }
];

// Helper functions for customization
export function getCompatibleOptions<T extends { compatibleWith: string[] }>(
  options: T[],
  characterType: 'boy' | 'girl' | 'man' | 'woman'
): T[] {
  return options.filter(option => option.compatibleWith.includes(characterType));
}

export function getOptionsByCategory<T extends { category: string }>(
  options: T[],
  category: string
): T[] {
  return options.filter(option => option.category === category);
}

export function getOptionsByStyle<T extends { style: string }>(
  options: T[],
  style: string
): T[] {
  return options.filter(option => option.style === style);
}

export function getOptionsByCulture<T extends { culture?: string }>(
  options: T[],
  culture: string
): T[] {
  return options.filter(option => option.culture === culture);
}

export function createDefaultCustomization(
  characterType: 'boy' | 'girl' | 'man' | 'woman',
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional'
): CharacterCustomization {
  return {
    skinTone: SKIN_TONE_OPTIONS[0],
    hairType: HAIR_TYPE_OPTIONS[0],
    hairColor: HAIR_COLOR_OPTIONS[0],
    clothing: {
      top: CLOTHING_OPTIONS.find(c => c.style === style && c.category === 'top') || null,
      bottom: CLOTHING_OPTIONS.find(c => c.style === style && c.category === 'bottom') || null,
      dress: CLOTHING_OPTIONS.find(c => c.style === style && c.category === 'dress') || null,
    },
    accessories: [],
    footwear: FOOTWEAR_OPTIONS.find(f => f.style === style) || FOOTWEAR_OPTIONS[0],
    props: [],
    background: BACKGROUND_OPTIONS[0],
    bodyType: 'average',
    expression: 'neutral',
    pose: 'standing'
  };
}

export function validateCustomization(customization: CharacterCustomization): boolean {
  // Basic validation
  if (!customization.skinTone || !customization.hairType || !customization.hairColor) {
    return false;
  }
  
  if (!customization.footwear) {
    return false;
  }
  
  if (!customization.background) {
    return false;
  }
  
  // Validate clothing compatibility
  if (customization.clothing.top && !customization.clothing.top.compatibleWith.includes(customization.bodyType as any)) {
    return false;
  }
  
  // Validate accessories compatibility
  for (const accessory of customization.accessories) {
    if (!accessory.compatibleWith.includes(customization.bodyType as any)) {
      return false;
    }
  }
  
  // Validate footwear compatibility
  if (!customization.footwear.compatibleWith.includes(customization.bodyType as any)) {
    return false;
  }
  
  // Validate props compatibility
  for (const prop of customization.props) {
    if (!prop.compatibleWith.includes(customization.bodyType as any)) {
      return false;
    }
  }
  
  return true;
}

export function applyCustomizationToCSS(customization: CharacterCustomization): Record<string, string> {
  const cssVariables: Record<string, string> = {};
  
  // Apply skin tone
  cssVariables['--character-skin-color'] = customization.skinTone.value;
  
  // Apply hair color
  cssVariables['--character-hair-color'] = customization.hairColor.value;
  
  // Apply clothing colors
  if (customization.clothing.top) {
    cssVariables['--character-shirt-color'] = customization.clothing.top.colors.primary;
    cssVariables['--character-primary-color'] = customization.clothing.top.colors.primary;
    cssVariables['--character-secondary-color'] = customization.clothing.top.colors.secondary;
    cssVariables['--character-accent-color'] = customization.clothing.top.colors.accent;
  }
  
  if (customization.clothing.bottom) {
    cssVariables['--character-pants-color'] = customization.clothing.bottom.colors.primary;
  }
  
  if (customization.clothing.dress) {
    cssVariables['--character-shirt-color'] = customization.clothing.dress.colors.primary;
    cssVariables['--character-primary-color'] = customization.clothing.dress.colors.primary;
    cssVariables['--character-secondary-color'] = customization.clothing.dress.colors.secondary;
    cssVariables['--character-accent-color'] = customization.clothing.dress.colors.accent;
  }
  
  // Apply footwear colors
  cssVariables['--character-shoes-color'] = customization.footwear.colors.primary;
  
  // Apply background
  if (customization.background.type === 'solid') {
    cssVariables['--character-background-color'] = customization.background.value;
  }
  
  return cssVariables;
}