// Enhanced Animation System with Style-Specific Animations
// Integrates comprehensive animations for each character style and outfit combination

import { CharacterAnimationSystem, AnimationConfig, AnimationKeyframe } from './animationSystem';
import { 
  StyleAnimation, 
  STYLE_SPECIFIC_ANIMATIONS, 
  ANIMATION_COMBINATIONS,
  getAnimationsForStyle,
  getAnimationsForCombination,
  getCompatibleAnimations,
  generateCSSAnimation,
  generateAllStyleAnimationsCSS,
  getAnimationById,
  getAnimationsByCategory,
  getAnimationsByDifficulty,
  searchAnimations
} from './style-specific-animations';

export interface EnhancedAnimationConfig extends AnimationConfig {
  style: string;
  category: string;
  outfit?: string;
  culture?: string;
  specialEffects?: string[];
  soundEffects?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface CharacterAnimationProfile {
  characterType: 'boy' | 'girl' | 'man' | 'woman';
  style: string;
  outfit?: string;
  culture?: string;
  availableAnimations: StyleAnimation[];
  recommendedAnimations: StyleAnimation[];
  unlockedAnimations: string[];
  favorites: string[];
}

export class EnhancedCharacterAnimationSystem extends CharacterAnimationSystem {
  private characterProfile: CharacterAnimationProfile;
  private styleSpecificAnimations: Map<string, StyleAnimation> = new Map();
  private animationHistory: string[] = [];
  private favorites: Set<string> = new Set();

  constructor(characterElement: HTMLElement, profile: CharacterAnimationProfile) {
    super(characterElement);
    this.characterProfile = profile;
    this.initializeStyleAnimations();
  }

  // Initialize style-specific animations
  private initializeStyleAnimations(): void {
    // Load all style-specific animations
    Object.values(STYLE_SPECIFIC_ANIMATIONS).forEach(animations => {
      animations.forEach(animation => {
        this.styleSpecificAnimations.set(animation.id, animation);
      });
    });

    // Inject CSS for all style-specific animations
    this.injectStyleAnimationCSS();
  }

  // Inject CSS for style-specific animations
  private injectStyleAnimationCSS(): void {
    const css = generateAllStyleAnimationsCSS();
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  }

  // Play style-specific animation
  async playStyleAnimation(animationId: string, config: Partial<EnhancedAnimationConfig> = {}): Promise<void> {
    const animation = this.styleSpecificAnimations.get(animationId);
    if (!animation) {
      console.warn(`Style-specific animation "${animationId}" not found`);
      return;
    }

    // Check if animation is compatible with character
    if (!animation.compatibleWith.includes(this.characterProfile.characterType)) {
      console.warn(`Animation "${animationId}" is not compatible with ${this.characterProfile.characterType} characters`);
      return;
    }

    // Check outfit requirements
    if (animation.outfitRequirements && this.characterProfile.outfit) {
      const hasRequiredOutfit = animation.outfitRequirements.some(req => 
        this.characterProfile.outfit?.toLowerCase().includes(req.toLowerCase())
      );
      if (!hasRequiredOutfit) {
        console.warn(`Animation "${animationId}" requires specific outfit: ${animation.outfitRequirements.join(', ')}`);
        return;
      }
    }

    const enhancedConfig: EnhancedAnimationConfig = {
      name: animation.name,
      duration: config.duration || animation.duration * 1000, // Convert to milliseconds
      easing: config.easing || animation.easing,
      iterations: config.iterations || animation.iterations,
      direction: config.direction || 'normal',
      fill: config.fill || 'forwards',
      delay: config.delay || 0,
      style: animation.style,
      category: animation.category,
      outfit: this.characterProfile.outfit,
      culture: this.characterProfile.culture,
      specialEffects: config.specialEffects || animation.specialEffects,
      soundEffects: config.soundEffects || animation.soundEffects,
      difficulty: animation.difficulty,
      tags: animation.tags
    };

    // Add to history
    this.addToHistory(animationId);

    // Apply special effects
    this.applySpecialEffects(enhancedConfig.specialEffects);

    // Play the animation
    return this.playAnimationWithKeyframes(animationId, enhancedConfig);
  }

  // Play animation with custom keyframes
  private async playAnimationWithKeyframes(animationId: string, config: EnhancedAnimationConfig): Promise<void> {
    const animation = this.styleSpecificAnimations.get(animationId);
    if (!animation) return;

    const keyframes = animation.keyframes.map(kf => ({
      transform: kf.properties.transform,
      opacity: kf.properties.opacity,
      filter: kf.properties.filter,
      clipPath: kf.properties.clipPath,
      offset: kf.percentage / 100
    }));

    try {
      const webAnimation = this.characterElement.animate(keyframes, {
        duration: config.duration,
        easing: config.easing,
        iterations: typeof config.iterations === 'number' ? config.iterations : Infinity,
        direction: config.direction as AnimationPlaybackDirection,
        fill: config.fill as FillMode,
        delay: config.delay
      });

      await webAnimation.finished;
    } catch (error) {
      console.error('Style-specific animation failed:', error);
    }
  }

  // Apply special effects
  private applySpecialEffects(effects?: string[]): void {
    if (!effects) return;

    effects.forEach(effect => {
      switch (effect) {
        case 'glow':
          this.characterElement.style.filter = 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))';
          break;
        case 'sparkle':
          this.addSparkleEffect();
          break;
        case 'cultural-patterns':
          this.addCulturalPatterns();
          break;
        case 'tribal-marks':
          this.addTribalMarks();
          break;
        case 'silk-flow':
          this.addSilkFlowEffect();
          break;
        case 'lantern-glow':
          this.addLanternGlowEffect();
          break;
        case 'feather-effects':
          this.addFeatherEffects();
          break;
        case 'spirit-eagles':
          this.addSpiritEaglesEffect();
          break;
      }
    });
  }

  // Add sparkle effect
  private addSparkleEffect(): void {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-effect';
    sparkle.style.cssText = `
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, #FFD700 0%, transparent 70%);
      border-radius: 50%;
      animation: sparkle 1s ease-in-out infinite;
    `;
    
    const sparkleCSS = document.createElement('style');
    sparkleCSS.textContent = `
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: translateX(-50%) scale(0); }
        50% { opacity: 1; transform: translateX(-50%) scale(1); }
      }
    `;
    
    document.head.appendChild(sparkleCSS);
    this.characterElement.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
      sparkleCSS.remove();
    }, 3000);
  }

  // Add cultural patterns effect
  private addCulturalPatterns(): void {
    this.characterElement.style.backgroundImage = `
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 215, 0, 0.1) 10px,
        rgba(255, 215, 0, 0.1) 20px
      )
    `;
  }

  // Add tribal marks effect
  private addTribalMarks(): void {
    const marks = document.createElement('div');
    marks.className = 'tribal-marks';
    marks.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(45deg, rgba(139, 69, 19, 0.3) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(139, 69, 19, 0.3) 25%, transparent 25%);
      background-size: 20px 20px;
      pointer-events: none;
    `;
    this.characterElement.appendChild(marks);
    
    setTimeout(() => marks.remove(), 5000);
  }

  // Add silk flow effect
  private addSilkFlowEffect(): void {
    this.characterElement.style.animation += ', silk-flow 3s ease-in-out infinite';
    
    const silkCSS = document.createElement('style');
    silkCSS.textContent = `
      @keyframes silk-flow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-5px) rotate(2deg); }
      }
    `;
    document.head.appendChild(silkCSS);
    
    setTimeout(() => silkCSS.remove(), 5000);
  }

  // Add lantern glow effect
  private addLanternGlowEffect(): void {
    this.characterElement.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
    this.characterElement.style.animation += ', lantern-glow 2s ease-in-out infinite alternate';
    
    const lanternCSS = document.createElement('style');
    lanternCSS.textContent = `
      @keyframes lantern-glow {
        0% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.6); }
        100% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.9); }
      }
    `;
    document.head.appendChild(lanternCSS);
    
    setTimeout(() => {
      lanternCSS.remove();
      this.characterElement.style.boxShadow = '';
    }, 5000);
  }

  // Add feather effects
  private addFeatherEffects(): void {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const feather = document.createElement('div');
        feather.className = 'feather-effect';
        feather.style.cssText = `
          position: absolute;
          top: -20px;
          left: ${Math.random() * 100}%;
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, #8B4513 0%, #DEB887 100%);
          border-radius: 0 100% 0 100%;
          animation: feather-fall 3s ease-in-out forwards;
        `;
        
        const featherCSS = document.createElement('style');
        featherCSS.textContent = `
          @keyframes feather-fall {
            0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
          }
        `;
        
        document.head.appendChild(featherCSS);
        this.characterElement.appendChild(feather);
        
        setTimeout(() => {
          feather.remove();
          featherCSS.remove();
        }, 3000);
      }, i * 200);
    }
  }

  // Add spirit eagles effect
  private addSpiritEaglesEffect(): void {
    const eagle = document.createElement('div');
    eagle.className = 'spirit-eagle';
    eagle.style.cssText = `
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 20px;
      background: linear-gradient(45deg, #FFFFFF 0%, #87CEEB 100%);
      clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
      animation: eagle-fly 4s ease-in-out forwards;
    `;
    
    const eagleCSS = document.createElement('style');
    eagleCSS.textContent = `
      @keyframes eagle-fly {
        0% { transform: translateX(-50%) translateY(0px) scale(0); opacity: 0; }
        20% { transform: translateX(-50%) translateY(-30px) scale(1); opacity: 1; }
        80% { transform: translateX(-50%) translateY(-80px) scale(1); opacity: 1; }
        100% { transform: translateX(-50%) translateY(-120px) scale(0); opacity: 0; }
      }
    `;
    
    document.head.appendChild(eagleCSS);
    this.characterElement.appendChild(eagle);
    
    setTimeout(() => {
      eagle.remove();
      eagleCSS.remove();
    }, 4000);
  }

  // Get character's available animations
  getAvailableAnimations(): StyleAnimation[] {
    return getCompatibleAnimations(
      this.characterProfile.characterType,
      this.characterProfile.style,
      this.characterProfile.outfit,
      this.characterProfile.culture
    );
  }

  // Get recommended animations for character
  getRecommendedAnimations(): StyleAnimation[] {
    const available = this.getAvailableAnimations();
    
    // Prioritize animations that match the character's style and outfit
    const combination = getAnimationsForCombination(
      this.characterProfile.style,
      this.characterProfile.outfit || '',
      this.characterProfile.culture
    );
    
    if (combination) {
      return available.filter(animation => 
        combination.animations.includes(animation.id)
      );
    }
    
    // Return beginner-level animations as default recommendations
    return available.filter(animation => animation.difficulty === 'beginner');
  }

  // Get animations by category
  getAnimationsByCategory(category: string): StyleAnimation[] {
    return getAnimationsByCategory(this.characterProfile.style, category);
  }

  // Get animations by difficulty
  getAnimationsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): StyleAnimation[] {
    return getAnimationsByDifficulty(this.characterProfile.style, difficulty);
  }

  // Search animations
  searchAnimations(query: string): StyleAnimation[] {
    return searchAnimations(query).filter(animation => 
      animation.compatibleWith.includes(this.characterProfile.characterType)
    );
  }

  // Add animation to favorites
  addToFavorites(animationId: string): void {
    this.favorites.add(animationId);
    this.characterProfile.favorites = Array.from(this.favorites);
  }

  // Remove animation from favorites
  removeFromFavorites(animationId: string): void {
    this.favorites.delete(animationId);
    this.characterProfile.favorites = Array.from(this.favorites);
  }

  // Get favorite animations
  getFavoriteAnimations(): StyleAnimation[] {
    return Array.from(this.favorites)
      .map(id => this.styleSpecificAnimations.get(id))
      .filter(Boolean) as StyleAnimation[];
  }

  // Add to animation history
  private addToHistory(animationId: string): void {
    this.animationHistory.unshift(animationId);
    if (this.animationHistory.length > 50) {
      this.animationHistory = this.animationHistory.slice(0, 50);
    }
  }

  // Get animation history
  getAnimationHistory(): StyleAnimation[] {
    return this.animationHistory
      .map(id => this.styleSpecificAnimations.get(id))
      .filter(Boolean) as StyleAnimation[];
  }

  // Get recently used animations
  getRecentAnimations(count: number = 10): StyleAnimation[] {
    return this.getAnimationHistory().slice(0, count);
  }

  // Create animation sequence
  async playAnimationSequence(animationIds: string[]): Promise<void> {
    for (const animationId of animationIds) {
      await this.playStyleAnimation(animationId);
      await new Promise(resolve => setTimeout(resolve, 200)); // Small delay between animations
    }
  }

  // Create animation blend (transition between animations)
  async blendAnimations(fromAnimationId: string, toAnimationId: string, duration: number = 1000): Promise<void> {
    const fromAnimation = this.styleSpecificAnimations.get(fromAnimationId);
    const toAnimation = this.styleSpecificAnimations.get(toAnimationId);
    
    if (!fromAnimation || !toAnimation) return;

    // Create blended keyframes
    const blendedKeyframes = [];
    
    for (let i = 0; i <= 10; i++) {
      const progress = i / 10;
      const fromKeyframe = fromAnimation.keyframes[Math.floor(progress * (fromAnimation.keyframes.length - 1))];
      const toKeyframe = toAnimation.keyframes[Math.floor(progress * (toAnimation.keyframes.length - 1))];
      
      if (fromKeyframe && toKeyframe) {
        blendedKeyframes.push({
          transform: this.interpolateTransform(fromKeyframe.properties.transform, toKeyframe.properties.transform, progress),
          opacity: this.interpolateValue(fromKeyframe.properties.opacity || 1, toKeyframe.properties.opacity || 1, progress),
          filter: this.interpolateFilter(fromKeyframe.properties.filter, toKeyframe.properties.filter, progress),
          offset: progress
        });
      }
    }

    try {
      const webAnimation = this.characterElement.animate(blendedKeyframes, {
        duration: duration,
        easing: 'ease-in-out',
        iterations: 1,
        fill: 'forwards'
      });

      await webAnimation.finished;
    } catch (error) {
      console.error('Animation blend failed:', error);
    }
  }

  // Helper methods for interpolation
  private interpolateTransform(from: string = '', to: string = '', progress: number): string {
    // Simple transform interpolation (can be enhanced)
    return progress < 0.5 ? from : to;
  }

  private interpolateValue(from: number, to: number, progress: number): number {
    return from + (to - from) * progress;
  }

  private interpolateFilter(from: string = '', to: string = '', progress: number): string {
    // Simple filter interpolation (can be enhanced)
    return progress < 0.5 ? from : to;
  }

  // Update character profile
  updateCharacterProfile(profile: Partial<CharacterAnimationProfile>): void {
    this.characterProfile = { ...this.characterProfile, ...profile };
  }

  // Get character profile
  getCharacterProfile(): CharacterAnimationProfile {
    return { ...this.characterProfile };
  }

  // Reset all effects
  resetEffects(): void {
    this.characterElement.style.filter = '';
    this.characterElement.style.backgroundImage = '';
    this.characterElement.style.boxShadow = '';
    this.characterElement.style.animation = '';
    
    // Remove any effect elements
    const effects = this.characterElement.querySelectorAll('.sparkle-effect, .tribal-marks, .feather-effect, .spirit-eagle');
    effects.forEach(effect => effect.remove());
  }
}

// Factory function to create enhanced animation system
export function createEnhancedAnimationSystem(
  characterElement: HTMLElement,
  characterType: 'boy' | 'girl' | 'man' | 'woman',
  style: string,
  outfit?: string,
  culture?: string
): EnhancedCharacterAnimationSystem {
  const profile: CharacterAnimationProfile = {
    characterType,
    style,
    outfit,
    culture,
    availableAnimations: [],
    recommendedAnimations: [],
    unlockedAnimations: [],
    favorites: []
  };

  return new EnhancedCharacterAnimationSystem(characterElement, profile);
}

// Utility functions for animation management
export function getAnimationStats(): {
  totalAnimations: number;
  animationsByStyle: Record<string, number>;
  animationsByCategory: Record<string, number>;
  animationsByDifficulty: Record<string, number>;
} {
  const allAnimations = Object.values(STYLE_SPECIFIC_ANIMATIONS).flat();
  
  const animationsByStyle: Record<string, number> = {};
  const animationsByCategory: Record<string, number> = {};
  const animationsByDifficulty: Record<string, number> = {};
  
  allAnimations.forEach(animation => {
    animationsByStyle[animation.style] = (animationsByStyle[animation.style] || 0) + 1;
    animationsByCategory[animation.category] = (animationsByCategory[animation.category] || 0) + 1;
    animationsByDifficulty[animation.difficulty] = (animationsByDifficulty[animation.difficulty] || 0) + 1;
  });
  
  return {
    totalAnimations: allAnimations.length,
    animationsByStyle,
    animationsByCategory,
    animationsByDifficulty
  };
}

export function getAnimationCompatibilityMatrix(): Record<string, string[]> {
  const matrix: Record<string, string[]> = {};
  
  Object.entries(STYLE_SPECIFIC_ANIMATIONS).forEach(([style, animations]) => {
    matrix[style] = [];
    animations.forEach(animation => {
      animation.compatibleWith.forEach(characterType => {
        if (!matrix[style].includes(characterType)) {
          matrix[style].push(characterType);
        }
      });
    });
  });
  
  return matrix;
}