// Style-Specific Animation System
// Comprehensive animations for each character style and outfit combination

export interface StyleAnimation {
  id: string;
  name: string;
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional';
  category: 'basic' | 'emotional' | 'social' | 'performance' | 'sports' | 'combat' | 'work' | 'cultural' | 'fantasy' | 'scifi' | 'environmental';
  description: string;
  duration: number; // in seconds
  iterations: number | 'infinite';
  easing: string;
  keyframes: Keyframe[];
  compatibleWith: ('boy' | 'girl' | 'man' | 'woman')[];
  outfitRequirements?: string[];
  culturalContext?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface Keyframe {
  percentage: number; // 0-100
  properties: {
    transform?: string;
    opacity?: number;
    filter?: string;
    clipPath?: string;
    [key: string]: any;
  };
}

export interface AnimationCombination {
  style: string;
  outfit: string;
  culture?: string;
  animations: string[];
  specialEffects?: string[];
  soundEffects?: string[];
}

// Comprehensive style-specific animations
export const STYLE_SPECIFIC_ANIMATIONS: Record<string, StyleAnimation[]> = {
  casual: [
    // Basic casual animations
    {
      id: 'casual-walk-relaxed',
      name: 'Relaxed Walk',
      style: 'casual',
      category: 'basic',
      description: 'Casual relaxed walking animation',
      duration: 2,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px)' } },
        { percentage: 25, properties: { transform: 'translateX(20px) translateY(-5px)' } },
        { percentage: 50, properties: { transform: 'translateX(40px) translateY(0px)' } },
        { percentage: 75, properties: { transform: 'translateX(60px) translateY(-5px)' } },
        { percentage: 100, properties: { transform: 'translateX(80px) translateY(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'beginner',
      tags: ['movement', 'walking', 'relaxed']
    },
    {
      id: 'casual-idle-phone',
      name: 'Phone Check',
      style: 'casual',
      category: 'basic',
      description: 'Checking phone while standing',
      duration: 3,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateY(0px) rotate(0deg)' } },
        { percentage: 20, properties: { transform: 'translateY(-10px) rotate(-5deg)' } },
        { percentage: 40, properties: { transform: 'translateY(-5px) rotate(0deg)' } },
        { percentage: 60, properties: { transform: 'translateY(-15px) rotate(5deg)' } },
        { percentage: 80, properties: { transform: 'translateY(-5px) rotate(0deg)' } },
        { percentage: 100, properties: { transform: 'translateY(0px) rotate(0deg)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'beginner',
      tags: ['idle', 'phone', 'modern']
    },
    {
      id: 'casual-wave-friendly',
      name: 'Friendly Wave',
      style: 'casual',
      category: 'social',
      description: 'Friendly hand wave greeting',
      duration: 1.5,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'rotate(0deg)' } },
        { percentage: 25, properties: { transform: 'rotate(-20deg)' } },
        { percentage: 50, properties: { transform: 'rotate(20deg)' } },
        { percentage: 75, properties: { transform: 'rotate(-10deg)' } },
        { percentage: 100, properties: { transform: 'rotate(0deg)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'beginner',
      tags: ['greeting', 'wave', 'friendly']
    },
    {
      id: 'casual-dance-party',
      name: 'Party Dance',
      style: 'casual',
      category: 'performance',
      description: 'Casual party dancing moves',
      duration: 4,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateY(0px) rotate(0deg) scale(1)' } },
        { percentage: 12.5, properties: { transform: 'translateY(-10px) rotate(5deg) scale(1.05)' } },
        { percentage: 25, properties: { transform: 'translateY(0px) rotate(-5deg) scale(1)' } },
        { percentage: 37.5, properties: { transform: 'translateY(-15px) rotate(5deg) scale(1.05)' } },
        { percentage: 50, properties: { transform: 'translateY(0px) rotate(-5deg) scale(1)' } },
        { percentage: 62.5, properties: { transform: 'translateY(-10px) rotate(5deg) scale(1.05)' } },
        { percentage: 75, properties: { transform: 'translateY(0px) rotate(-5deg) scale(1)' } },
        { percentage: 87.5, properties: { transform: 'translateY(-5px) rotate(0deg) scale(1.02)' } },
        { percentage: 100, properties: { transform: 'translateY(0px) rotate(0deg) scale(1)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['dance', 'party', 'fun']
    }
  ],

  formal: [
    // Formal animations
    {
      id: 'formal-walk-elegant',
      name: 'Elegant Walk',
      style: 'formal',
      category: 'basic',
      description: 'Elegant formal walking posture',
      duration: 3,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px)' } },
        { percentage: 25, properties: { transform: 'translateX(15px) translateY(-3px)' } },
        { percentage: 50, properties: { transform: 'translateX(30px) translateY(0px)' } },
        { percentage: 75, properties: { transform: 'translateX(45px) translateY(-3px)' } },
        { percentage: 100, properties: { transform: 'translateX(60px) translateY(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['movement', 'walking', 'elegant']
    },
    {
      id: 'formal-bow-respectful',
      name: 'Respectful Bow',
      style: 'formal',
      category: 'social',
      description: 'Formal respectful bow',
      duration: 2,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'rotate(0deg)' } },
        { percentage: 30, properties: { transform: 'rotate(15deg)' } },
        { percentage: 60, properties: { transform: 'rotate(30deg)' } },
        { percentage: 100, properties: { transform: 'rotate(0deg)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'beginner',
      tags: ['greeting', 'bow', 'respect']
    },
    {
      id: 'formal-handshake-business',
      name: 'Business Handshake',
      style: 'formal',
      category: 'social',
      description: 'Professional business handshake',
      duration: 2.5,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px)' } },
        { percentage: 20, properties: { transform: 'translateX(10px) translateY(-5px)' } },
        { percentage: 40, properties: { transform: 'translateX(20px) translateY(0px)' } },
        { percentage: 60, properties: { transform: 'translateX(20px) translateY(-5px)' } },
        { percentage: 80, properties: { transform: 'translateX(10px) translateY(0px)' } },
        { percentage: 100, properties: { transform: 'translateX(0px) translateY(0px)' } }
      ],
      compatibleWith: ['man', 'woman'],
      difficulty: 'intermediate',
      tags: ['greeting', 'handshake', 'business']
    },
    {
      id: 'formal-dance-waltz',
      name: 'Waltz Dance',
      style: 'formal',
      category: 'performance',
      description: 'Elegant waltz dancing',
      duration: 6,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px) rotate(0deg)' } },
        { percentage: 12.5, properties: { transform: 'translateX(20px) translateY(-10px) rotate(45deg)' } },
        { percentage: 25, properties: { transform: 'translateX(40px) translateY(0px) rotate(90deg)' } },
        { percentage: 37.5, properties: { transform: 'translateX(20px) translateY(10px) rotate(135deg)' } },
        { percentage: 50, properties: { transform: 'translateX(0px) translateY(0px) rotate(180deg)' } },
        { percentage: 62.5, properties: { transform: 'translateX(-20px) translateY(-10px) rotate(225deg)' } },
        { percentage: 75, properties: { transform: 'translateX(-40px) translateY(0px) rotate(270deg)' } },
        { percentage: 87.5, properties: { transform: 'translateX(-20px) translateY(10px) rotate(315deg)' } },
        { percentage: 100, properties: { transform: 'translateX(0px) translateY(0px) rotate(360deg)' } }
      ],
      compatibleWith: ['girl', 'woman'],
      difficulty: 'advanced',
      tags: ['dance', 'waltz', 'elegant']
    }
  ],

  sporty: [
    // Sporty animations
    {
      id: 'sporty-run-athletic',
      name: 'Athletic Run',
      style: 'sporty',
      category: 'basic',
      description: 'Fast athletic running',
      duration: 1,
      iterations: 'infinite',
      easing: 'linear',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px)' } },
        { percentage: 25, properties: { transform: 'translateX(30px) translateY(-15px)' } },
        { percentage: 50, properties: { transform: 'translateX(60px) translateY(0px)' } },
        { percentage: 75, properties: { transform: 'translateX(90px) translateY(-15px)' } },
        { percentage: 100, properties: { transform: 'translateX(120px) translateY(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['running', 'athletic', 'fast']
    },
    {
      id: 'sporty-jump-high',
      name: 'High Jump',
      style: 'sporty',
      category: 'sports',
      description: 'Athletic high jump',
      duration: 1.5,
      iterations: 1,
      easing: 'ease-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateY(0px)' } },
        { percentage: 30, properties: { transform: 'translateY(-20px)' } },
        { percentage: 60, properties: { transform: 'translateY(-60px)' } },
        { percentage: 80, properties: { transform: 'translateY(-30px)' } },
        { percentage: 100, properties: { transform: 'translateY(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['jump', 'athletic', 'sports']
    },
    {
      id: 'sporty-kick-soccer',
      name: 'Soccer Kick',
      style: 'sporty',
      category: 'sports',
      description: 'Powerful soccer kick',
      duration: 1.2,
      iterations: 1,
      easing: 'ease-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'rotate(0deg) translateX(0px)' } },
        { percentage: 30, properties: { transform: 'rotate(-45deg) translateX(-10px)' } },
        { percentage: 60, properties: { transform: 'rotate(45deg) translateX(20px)' } },
        { percentage: 100, properties: { transform: 'rotate(0deg) translateX(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['kick', 'soccer', 'sports']
    },
    {
      id: 'sporty-dance-breakdance',
      name: 'Breakdance',
      style: 'sporty',
      category: 'performance',
      description: 'Energetic breakdance moves',
      duration: 3,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'rotate(0deg) translateY(0px)' } },
        { percentage: 20, properties: { transform: 'rotate(180deg) translateY(-20px)' } },
        { percentage: 40, properties: { transform: 'rotate(360deg) translateY(0px)' } },
        { percentage: 60, properties: { transform: 'rotate(540deg) translateY(-30px)' } },
        { percentage: 80, properties: { transform: 'rotate(720deg) translateY(0px)' } },
        { percentage: 100, properties: { transform: 'rotate(1080deg) translateY(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'advanced',
      tags: ['dance', 'breakdance', 'athletic']
    }
  ],

  fantasy: [
    // Fantasy animations
    {
      id: 'fantasy-walk-magical',
      name: 'Magical Walk',
      style: 'fantasy',
      category: 'basic',
      description: 'Floating magical walk',
      duration: 2.5,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px)', filter: 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.5))' } },
        { percentage: 25, properties: { transform: 'translateX(20px) translateY(-10px)', filter: 'drop-shadow(0 0 20px rgba(138, 43, 226, 0.8))' } },
        { percentage: 50, properties: { transform: 'translateX(40px) translateY(-5px)', filter: 'drop-shadow(0 0 15px rgba(138, 43, 226, 0.6))' } },
        { percentage: 75, properties: { transform: 'translateX(60px) translateY(-15px)', filter: 'drop-shadow(0 0 25px rgba(138, 43, 226, 0.9))' } },
        { percentage: 100, properties: { transform: 'translateX(80px) translateY(-10px)', filter: 'drop-shadow(0 0 20px rgba(138, 43, 226, 0.7))' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['walking', 'magical', 'floating']
    },
    {
      id: 'fantasy-cast-spell',
      name: 'Cast Spell',
      style: 'fantasy',
      category: 'fantasy',
      description: 'Magical spell casting',
      duration: 2,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'scale(1) rotate(0deg)', filter: 'brightness(1)' } },
        { percentage: 30, properties: { transform: 'scale(1.1) rotate(10deg)', filter: 'brightness(1.2)' } },
        { percentage: 60, properties: { transform: 'scale(1.3) rotate(-10deg)', filter: 'brightness(1.5)' } },
        { percentage: 80, properties: { transform: 'scale(1.1) rotate(5deg)', filter: 'brightness(1.2)' } },
        { percentage: 100, properties: { transform: 'scale(1) rotate(0deg)', filter: 'brightness(1)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['magic', 'spell', 'fantasy']
    },
    {
      id: 'fantasy-fly-mystical',
      name: 'Mystical Flight',
      style: 'fantasy',
      category: 'fantasy',
      description: 'Magical flying animation',
      duration: 4,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateY(0px) translateX(0px)', filter: 'drop-shadow(0 0 20px rgba(138, 43, 226, 0.6))' } },
        { percentage: 25, properties: { transform: 'translateY(-30px) translateX(20px)', filter: 'drop-shadow(0 0 30px rgba(138, 43, 226, 0.8))' } },
        { percentage: 50, properties: { transform: 'translateY(-50px) translateX(0px)', filter: 'drop-shadow(0 0 40px rgba(138, 43, 226, 1))' } },
        { percentage: 75, properties: { transform: 'translateY(-30px) translateX(-20px)', filter: 'drop-shadow(0 0 30px rgba(138, 43, 226, 0.8))' } },
        { percentage: 100, properties: { transform: 'translateY(0px) translateX(0px)', filter: 'drop-shadow(0 0 20px rgba(138, 43, 226, 0.6))' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'advanced',
      tags: ['flying', 'magical', 'fantasy']
    },
    {
      id: 'fantasy-dance-enchanted',
      name: 'Enchanted Dance',
      style: 'fantasy',
      category: 'performance',
      description: 'Magical enchanted dance',
      duration: 5,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'scale(1) rotate(0deg)', filter: 'hue-rotate(0deg) brightness(1)' } },
        { percentage: 20, properties: { transform: 'scale(1.1) rotate(72deg)', filter: 'hue-rotate(72deg) brightness(1.2)' } },
        { percentage: 40, properties: { transform: 'scale(1.2) rotate(144deg)', filter: 'hue-rotate(144deg) brightness(1.3)' } },
        { percentage: 60, properties: { transform: 'scale(1.1) rotate(216deg)', filter: 'hue-rotate(216deg) brightness(1.2)' } },
        { percentage: 80, properties: { transform: 'scale(1.05) rotate(288deg)', filter: 'hue-rotate(288deg) brightness(1.1)' } },
        { percentage: 100, properties: { transform: 'scale(1) rotate(360deg)', filter: 'hue-rotate(360deg) brightness(1)' } }
      ],
      compatibleWith: ['girl', 'woman'],
      difficulty: 'advanced',
      tags: ['dance', 'enchanted', 'magical']
    }
  ],

  'sci-fi': [
    // Sci-fi animations
    {
      id: 'scifi-walk-futuristic',
      name: 'Futuristic Walk',
      style: 'sci-fi',
      category: 'basic',
      description: 'Futuristic robotic walk',
      duration: 2,
      iterations: 'infinite',
      easing: 'linear',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px)', filter: 'hue-rotate(0deg)' } },
        { percentage: 25, properties: { transform: 'translateX(25px) translateY(-5px)', filter: 'hue-rotate(90deg)' } },
        { percentage: 50, properties: { transform: 'translateX(50px) translateY(0px)', filter: 'hue-rotate(180deg)' } },
        { percentage: 75, properties: { transform: 'translateX(75px) translateY(-5px)', filter: 'hue-rotate(270deg)' } },
        { percentage: 100, properties: { transform: 'translateX(100px) translateY(0px)', filter: 'hue-rotate(360deg)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['walking', 'futuristic', 'robotic']
    },
    {
      id: 'scifi-hologram-project',
      name: 'Hologram Project',
      style: 'sci-fi',
      category: 'scifi',
      description: 'Holographic projection',
      duration: 3,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'scale(0.5)', opacity: 0.3, filter: 'blur(5px)' } },
        { percentage: 30, properties: { transform: 'scale(0.8)', opacity: 0.6, filter: 'blur(2px)' } },
        { percentage: 60, properties: { transform: 'scale(1.1)', opacity: 0.9, filter: 'blur(0px)' } },
        { percentage: 80, properties: { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' } },
        { percentage: 100, properties: { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['hologram', 'projection', 'tech']
    },
    {
      id: 'scifi-teleport-digital',
      name: 'Digital Teleport',
      style: 'sci-fi',
      category: 'scifi',
      description: 'Digital teleportation effect',
      duration: 2,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' } },
        { percentage: 30, properties: { transform: 'scale(0.8)', opacity: 0.7, filter: 'blur(2px)' } },
        { percentage: 60, properties: { transform: 'scale(0.3)', opacity: 0.3, filter: 'blur(10px)' } },
        { percentage: 80, properties: { transform: 'scale(0.8)', opacity: 0.7, filter: 'blur(2px)' } },
        { percentage: 100, properties: { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'advanced',
      tags: ['teleport', 'digital', 'scifi']
    },
    {
      id: 'scifi-dance-cyber',
      name: 'Cyber Dance',
      style: 'sci-fi',
      category: 'performance',
      description: 'Cyberpunk dance moves',
      duration: 3.5,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'scale(1) rotate(0deg)', filter: 'hue-rotate(0deg) contrast(1)' } },
        { percentage: 14.28, properties: { transform: 'scale(1.1) rotate(51.4deg)', filter: 'hue-rotate(51.4deg) contrast(1.2)' } },
        { percentage: 28.56, properties: { transform: 'scale(0.9) rotate(102.8deg)', filter: 'hue-rotate(102.8deg) contrast(0.8)' } },
        { percentage: 42.84, properties: { transform: 'scale(1.2) rotate(154.2deg)', filter: 'hue-rotate(154.2deg) contrast(1.3)' } },
        { percentage: 57.12, properties: { transform: 'scale(0.8) rotate(205.6deg)', filter: 'hue-rotate(205.6deg) contrast(0.7)' } },
        { percentage: 71.4, properties: { transform: 'scale(1.1) rotate(257deg)', filter: 'hue-rotate(257deg) contrast(1.1)' } },
        { percentage: 85.68, properties: { transform: 'scale(0.95) rotate(308.4deg)', filter: 'hue-rotate(308.4deg) contrast(0.9)' } },
        { percentage: 100, properties: { transform: 'scale(1) rotate(360deg)', filter: 'hue-rotate(360deg) contrast(1)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'advanced',
      tags: ['dance', 'cyberpunk', 'tech']
    }
  ],

  historical: [
    // Historical animations
    {
      id: 'historical-walk-noble',
      name: 'Noble Walk',
      style: 'historical',
      category: 'basic',
      description: 'Noble historical walking',
      duration: 3,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px)' } },
        { percentage: 25, properties: { transform: 'translateX(15px) translateY(-2px)' } },
        { percentage: 50, properties: { transform: 'translateX(30px) translateY(0px)' } },
        { percentage: 75, properties: { transform: 'translateX(45px) translateY(-2px)' } },
        { percentage: 100, properties: { transform: 'translateX(60px) translateY(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['walking', 'noble', 'historical']
    },
    {
      id: 'historical-bow-royal',
      name: 'Royal Bow',
      style: 'historical',
      category: 'social',
      description: 'Royal court bow',
      duration: 2.5,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'rotate(0deg)' } },
        { percentage: 40, properties: { transform: 'rotate(45deg)' } },
        { percentage: 80, properties: { transform: 'rotate(45deg)' } },
        { percentage: 100, properties: { transform: 'rotate(0deg)' } }
      ],
      compatibleWith: ['boy', 'man'],
      difficulty: 'intermediate',
      tags: ['bow', 'royal', 'historical']
    },
    {
      id: 'historical-curtsey-graceful',
      name: 'Graceful Curtsey',
      style: 'historical',
      category: 'social',
      description: 'Graceful curtsey',
      duration: 2.5,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateY(0px)' } },
        { percentage: 40, properties: { transform: 'translateY(20px)' } },
        { percentage: 80, properties: { transform: 'translateY(20px)' } },
        { percentage: 100, properties: { transform: 'translateY(0px)' } }
      ],
      compatibleWith: ['girl', 'woman'],
      difficulty: 'intermediate',
      tags: ['curtsey', 'graceful', 'historical']
    },
    {
      id: 'historical-dance-minuet',
      name: 'Minuet Dance',
      style: 'historical',
      category: 'performance',
      description: 'Classical minuet dance',
      duration: 8,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px) rotate(0deg)' } },
        { percentage: 12.5, properties: { transform: 'translateX(30px) translateY(-15px) rotate(45deg)' } },
        { percentage: 25, properties: { transform: 'translateX(60px) translateY(0px) rotate(90deg)' } },
        { percentage: 37.5, properties: { transform: 'translateX(30px) translateY(15px) rotate(135deg)' } },
        { percentage: 50, properties: { transform: 'translateX(0px) translateY(0px) rotate(180deg)' } },
        { percentage: 62.5, properties: { transform: 'translateX(-30px) translateY(-15px) rotate(225deg)' } },
        { percentage: 75, properties: { transform: 'translateX(-60px) translateY(0px) rotate(270deg)' } },
        { percentage: 87.5, properties: { transform: 'translateX(-30px) translateY(15px) rotate(315deg)' } },
        { percentage: 100, properties: { transform: 'translateX(0px) translateY(0px) rotate(360deg)' } }
      ],
      compatibleWith: ['girl', 'woman'],
      difficulty: 'advanced',
      tags: ['dance', 'minuet', 'classical']
    }
  ],

  traditional: [
    // Traditional animations
    {
      id: 'traditional-walk-cultural',
      name: 'Cultural Walk',
      style: 'traditional',
      category: 'basic',
      description: 'Traditional cultural walking',
      duration: 2.5,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px)' } },
        { percentage: 25, properties: { transform: 'translateX(18px) translateY(-3px)' } },
        { percentage: 50, properties: { transform: 'translateX(36px) translateY(0px)' } },
        { percentage: 75, properties: { transform: 'translateX(54px) translateY(-3px)' } },
        { percentage: 100, properties: { transform: 'translateX(72px) translateY(0px)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['walking', 'cultural', 'traditional']
    },
    {
      id: 'traditional-bow-respect',
      name: 'Cultural Bow',
      style: 'traditional',
      category: 'social',
      description: 'Traditional respectful bow',
      duration: 2,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'rotate(0deg)' } },
        { percentage: 50, properties: { transform: 'rotate(30deg)' } },
        { percentage: 100, properties: { transform: 'rotate(0deg)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'beginner',
      tags: ['bow', 'respect', 'traditional']
    },
    {
      id: 'traditional-dance-folk',
      name: 'Folk Dance',
      style: 'traditional',
      category: 'cultural',
      description: 'Traditional folk dance',
      duration: 4,
      iterations: 'infinite',
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'translateX(0px) translateY(0px) rotate(0deg)' } },
        { percentage: 20, properties: { transform: 'translateX(25px) translateY(-20px) rotate(72deg)' } },
        { percentage: 40, properties: { transform: 'translateX(0px) translateY(-30px) rotate(144deg)' } },
        { percentage: 60, properties: { transform: 'translateX(-25px) translateY(-20px) rotate(216deg)' } },
        { percentage: 80, properties: { transform: 'translateX(0px) translateY(-10px) rotate(288deg)' } },
        { percentage: 100, properties: { transform: 'translateX(0px) translateY(0px) rotate(360deg)' } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'intermediate',
      tags: ['dance', 'folk', 'traditional']
    },
    {
      id: 'traditional-ceremony-ritual',
      name: 'Ceremonial Ritual',
      style: 'traditional',
      category: 'cultural',
      description: 'Traditional ceremonial ritual',
      duration: 6,
      iterations: 1,
      easing: 'ease-in-out',
      keyframes: [
        { percentage: 0, properties: { transform: 'scale(1) rotate(0deg)', opacity: 1 } },
        { percentage: 16.66, properties: { transform: 'scale(1.1) rotate(60deg)', opacity: 0.9 } },
        { percentage: 33.33, properties: { transform: 'scale(1.2) rotate(120deg)', opacity: 0.8 } },
        { percentage: 50, properties: { transform: 'scale(1.3) rotate(180deg)', opacity: 0.7 } },
        { percentage: 66.66, properties: { transform: 'scale(1.2) rotate(240deg)', opacity: 0.8 } },
        { percentage: 83.33, properties: { transform: 'scale(1.1) rotate(300deg)', opacity: 0.9 } },
        { percentage: 100, properties: { transform: 'scale(1) rotate(360deg)', opacity: 1 } }
      ],
      compatibleWith: ['boy', 'girl', 'man', 'woman'],
      difficulty: 'advanced',
      tags: ['ceremony', 'ritual', 'traditional']
    }
  ]
};

// Animation combinations for specific outfit and style pairings
export const ANIMATION_COMBINATIONS: AnimationCombination[] = [
  // Casual combinations
  {
    style: 'casual',
    outfit: 'tshirt',
    animations: ['casual-walk-relaxed', 'casual-idle-phone', 'casual-wave-friendly', 'casual-dance-party']
  },
  {
    style: 'casual',
    outfit: 'jeans',
    animations: ['casual-walk-relaxed', 'casual-dance-party']
  },
  
  // Formal combinations
  {
    style: 'formal',
    outfit: 'suit',
    animations: ['formal-walk-elegant', 'formal-bow-respectful', 'formal-handshake-business', 'formal-dance-waltz']
  },
  {
    style: 'formal',
    outfit: 'dress',
    animations: ['formal-walk-elegant', 'formal-dance-waltz']
  },
  
  // Sporty combinations
  {
    style: 'sporty',
    outfit: 'jersey',
    animations: ['sporty-run-athletic', 'sporty-jump-high', 'sporty-kick-soccer', 'sporty-dance-breakdance']
  },
  {
    style: 'sporty',
    outfit: 'shorts',
    animations: ['sporty-run-athletic', 'sporty-jump-high']
  },
  
  // Fantasy combinations
  {
    style: 'fantasy',
    outfit: 'robe',
    animations: ['fantasy-walk-magical', 'fantasy-cast-spell', 'fantasy-fly-mystical', 'fantasy-dance-enchanted']
  },
  {
    style: 'fantasy',
    outfit: 'armor',
    animations: ['fantasy-walk-magical', 'fantasy-cast-spell']
  },
  
  // Sci-fi combinations
  {
    style: 'sci-fi',
    outfit: 'spacesuit',
    animations: ['scifi-walk-futuristic', 'scifi-hologram-project', 'scifi-teleport-digital', 'scifi-dance-cyber']
  },
  {
    style: 'sci-fi',
    outfit: 'cyber-uniform',
    animations: ['scifi-walk-futuristic', 'scifi-dance-cyber']
  },
  
  // Historical combinations
  {
    style: 'historical',
    outfit: 'toga',
    animations: ['historical-walk-noble', 'historical-bow-royal', 'historical-curtsey-graceful', 'historical-dance-minuet']
  },
  {
    style: 'historical',
    outfit: 'kimono',
    animations: ['historical-walk-noble', 'historical-curtsey-graceful', 'historical-dance-minuet']
  },
  
  // Traditional combinations
  {
    style: 'traditional',
    outfit: 'sari',
    animations: ['traditional-walk-cultural', 'traditional-bow-respect', 'traditional-dance-folk', 'traditional-ceremony-ritual']
  },
  {
    style: 'traditional',
    outfit: 'thobe',
    animations: ['traditional-walk-cultural', 'traditional-bow-respect']
  },
  
  // Cultural-specific combinations
  {
    style: 'traditional',
    outfit: 'dashiki',
    culture: 'African',
    animations: ['traditional-walk-cultural', 'traditional-dance-folk', 'traditional-ceremony-ritual'],
    specialEffects: ['cultural-patterns', 'tribal-marks']
  },
  {
    style: 'traditional',
    outfit: 'hanfu',
    culture: 'Chinese',
    animations: ['traditional-walk-cultural', 'traditional-dance-folk'],
    specialEffects: ['silk-flow', 'lantern-glow']
  },
  {
    style: 'traditional',
    outfit: 'regalia',
    culture: 'Native American',
    animations: ['traditional-walk-cultural', 'traditional-ceremony-ritual'],
    specialEffects: ['feather-effects', 'spirit-eagles']
  }
];

// Helper functions
export function getAnimationsForStyle(style: string): StyleAnimation[] {
  return STYLE_SPECIFIC_ANIMATIONS[style] || [];
}

export function getAnimationsForCombination(style: string, outfit: string, culture?: string): AnimationCombination | null {
  return ANIMATION_COMBINATIONS.find(combo => 
    combo.style === style && 
    combo.outfit === outfit && 
    (!culture || combo.culture === culture)
  ) || null;
}

export function getCompatibleAnimations(
  characterType: 'boy' | 'girl' | 'man' | 'woman',
  style: string,
  outfit?: string,
  culture?: string
): StyleAnimation[] {
  const styleAnimations = getAnimationsForStyle(style);
  const compatibleAnimations = styleAnimations.filter(animation => 
    animation.compatibleWith.includes(characterType)
  );
  
  if (outfit) {
    const combination = getAnimationsForCombination(style, outfit, culture);
    if (combination) {
      const comboAnimationIds = combination.animations;
      return compatibleAnimations.filter(animation => 
        comboAnimationIds.includes(animation.id)
      );
    }
  }
  
  return compatibleAnimations;
}

export function generateCSSAnimation(animation: StyleAnimation): string {
  const keyframeRules = animation.keyframes.map(keyframe => {
    const properties = Object.entries(keyframe.properties)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
    return `${keyframe.percentage}% { ${properties} }`;
  }).join('\n    ');
  
  return `
@keyframes ${animation.id} {
  ${keyframeRules}
}

.${animation.id} {
  animation: ${animation.id} ${animation.duration}s ${animation.easing} ${animation.iterations === 'infinite' ? 'infinite' : animation.iterations};
}
  `.trim();
}

export function generateAllStyleAnimationsCSS(): string {
  let css = '';
  
  Object.values(STYLE_SPECIFIC_ANIMATIONS).forEach(animations => {
    animations.forEach(animation => {
      css += generateCSSAnimation(animation) + '\n\n';
    });
  });
  
  return css;
}

export function getAnimationById(id: string): StyleAnimation | null {
  for (const animations of Object.values(STYLE_SPECIFIC_ANIMATIONS)) {
    const animation = animations.find(a => a.id === id);
    if (animation) return animation;
  }
  return null;
}

export function getAnimationsByCategory(style: string, category: string): StyleAnimation[] {
  const styleAnimations = getAnimationsForStyle(style);
  return styleAnimations.filter(animation => animation.category === category);
}

export function getAnimationsByDifficulty(style: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): StyleAnimation[] {
  const styleAnimations = getAnimationsForStyle(style);
  return styleAnimations.filter(animation => animation.difficulty === difficulty);
}

export function searchAnimations(query: string): StyleAnimation[] {
  const results: StyleAnimation[] = [];
  const lowercaseQuery = query.toLowerCase();
  
  Object.values(STYLE_SPECIFIC_ANIMATIONS).forEach(animations => {
    animations.forEach(animation => {
      if (
        animation.name.toLowerCase().includes(lowercaseQuery) ||
        animation.description.toLowerCase().includes(lowercaseQuery) ||
        animation.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      ) {
        results.push(animation);
      }
    });
  });
  
  return results;
}