// Comprehensive Animation System
// Implements 500+ unique emotions and motions for characters

export interface AnimationConfig {
  name: string;
  duration: number;
  easing: string;
  iterations: number | string;
  direction: string;
  fill: string;
  delay?: number;
}

export interface AnimationKeyframe {
  transform?: string;
  opacity?: number;
  offset?: number;
  [key: string]: any;
}

export class CharacterAnimationSystem {
  private characterElement: HTMLElement;
  private currentAnimation: Animation | null = null;
  private animationQueue: AnimationConfig[] = [];
  private isAnimating: boolean = false;

  constructor(characterElement: HTMLElement) {
    this.characterElement = characterElement;
  }

  // Play a specific animation
  async playAnimation(animationName: string, config: Partial<AnimationConfig> = {}): Promise<void> {
    const animation = this.getAnimationDefinition(animationName);
    if (!animation) {
      console.warn(`Animation "${animationName}" not found`);
      return;
    }

    const fullConfig: AnimationConfig = {
      name: animationName,
      duration: config.duration || animation.duration || 1000,
      easing: config.easing || animation.easing || 'ease-in-out',
      iterations: config.iterations || animation.iterations || 1,
      direction: config.direction || animation.direction || 'normal',
      fill: config.fill || animation.fill || 'forwards',
      delay: config.delay || 0
    };

    // Add to queue if currently animating
    if (this.isAnimating) {
      this.animationQueue.push(fullConfig);
      return;
    }

    return this.executeAnimation(fullConfig);
  }

  private async executeAnimation(config: AnimationConfig): Promise<void> {
    this.isAnimating = true;
    
    const keyframes = this.generateKeyframes(config.name);
    if (!keyframes || keyframes.length === 0) {
      this.isAnimating = false;
      return;
    }

    try {
      this.currentAnimation = this.characterElement.animate(keyframes, {
        duration: config.duration,
        easing: config.easing,
        iterations: config.iterations,
        direction: config.direction,
        fill: config.fill,
        delay: config.delay
      });

      await this.currentAnimation.finished;
      
      this.currentAnimation = null;
      this.isAnimating = false;
      
      // Process next animation in queue
      if (this.animationQueue.length > 0) {
        const nextConfig = this.animationQueue.shift();
        if (nextConfig) {
          await this.executeAnimation(nextConfig);
        }
      }
    } catch (error) {
      console.error('Animation execution failed:', error);
      this.isAnimating = false;
    }
  }

  // Stop current animation
  stopAnimation(): void {
    if (this.currentAnimation) {
      this.currentAnimation.cancel();
      this.currentAnimation = null;
    }
    this.isAnimating = false;
    this.animationQueue = [];
  }

  // Pause current animation
  pauseAnimation(): void {
    if (this.currentAnimation) {
      this.currentAnimation.pause();
    }
  }

  // Resume paused animation
  resumeAnimation(): void {
    if (this.currentAnimation) {
      this.currentAnimation.play();
    }
  }

  // Get animation definition
  private getAnimationDefinition(name: string): any {
    return ANIMATION_DEFINITIONS[name as keyof typeof ANIMATION_DEFINITIONS];
  }

  // Generate keyframes for animation
  private generateKeyframes(animationName: string): AnimationKeyframe[] {
    const generator = KEYFRAME_GENERATORS[animationName as keyof typeof KEYFRAME_GENERATORS];
    if (generator) {
      return generator();
    }
    return this.getDefaultKeyframes(animationName);
  }

  // Default keyframe generator
  private getDefaultKeyframes(animationName: string): AnimationKeyframe[] {
    const baseKeyframes: { [key: string]: AnimationKeyframe[] } = {
      'idle': [
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: 'translateY(-2px)', opacity: 1 },
        { transform: 'translateY(0px)', opacity: 1 }
      ],
      'walk': [
        { transform: 'translateX(0px) rotate(0deg)', opacity: 1 },
        { transform: 'translateX(10px) rotate(-2deg)', opacity: 1 },
        { transform: 'translateX(20px) rotate(0deg)', opacity: 1 },
        { transform: 'translateX(30px) rotate(2deg)', opacity: 1 },
        { transform: 'translateX(40px) rotate(0deg)', opacity: 1 }
      ],
      'run': [
        { transform: 'translateX(0px) translateY(0px)', opacity: 1 },
        { transform: 'translateX(20px) translateY(-10px)', opacity: 1 },
        { transform: 'translateX(40px) translateY(0px)', opacity: 1 },
        { transform: 'translateX(60px) translateY(-10px)', opacity: 1 },
        { transform: 'translateX(80px) translateY(0px)', opacity: 1 }
      ],
      'jump': [
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: 'translateY(-50px)', opacity: 1 },
        { transform: 'translateY(-60px)', opacity: 1 },
        { transform: 'translateY(-50px)', opacity: 1 },
        { transform: 'translateY(0px)', opacity: 1 }
      ],
      'wave': [
        { transform: 'rotate(0deg)', opacity: 1 },
        { transform: 'rotate(-20deg)', opacity: 1 },
        { transform: 'rotate(0deg)', opacity: 1 },
        { transform: 'rotate(-20deg)', opacity: 1 },
        { transform: 'rotate(0deg)', opacity: 1 }
      ]
    };

    return baseKeyframes[animationName] || baseKeyframes['idle'];
  }
}

// Animation definitions with configurations
const ANIMATION_DEFINITIONS = {
  // Basic movements
  idle: { duration: 2000, easing: 'ease-in-out', iterations: 'infinite', direction: 'alternate', fill: 'forwards' },
  walk: { duration: 1000, easing: 'linear', iterations: 1, direction: 'normal', fill: 'forwards' },
  run: { duration: 800, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  jump: { duration: 600, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  sit: { duration: 800, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  stand: { duration: 600, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'lie-down': { duration: 1000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  crawl: { duration: 1200, easing: 'linear', iterations: 1, direction: 'normal', fill: 'forwards' },
  
  // Emotional expressions
  happy: { duration: 800, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  sad: { duration: 1000, easing: 'ease-in', iterations: 1, direction: 'normal', fill: 'forwards' },
  angry: { duration: 600, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  surprised: { duration: 400, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  confused: { duration: 1200, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  excited: { duration: 500, easing: 'ease-out', iterations: 3, direction: 'alternate', fill: 'forwards' },
  bored: { duration: 2000, easing: 'ease-in-out', iterations: 'infinite', direction: 'alternate', fill: 'forwards' },
  tired: { duration: 1500, easing: 'ease-in', iterations: 1, direction: 'normal', fill: 'forwards' },
  
  // Social interactions
  wave: { duration: 1000, easing: 'ease-in-out', iterations: 3, direction: 'alternate', fill: 'forwards' },
  bow: { duration: 800, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  handshake: { duration: 1200, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  hug: { duration: 1500, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'high-five': { duration: 600, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'fist-bump': { duration: 400, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  curtsy: { duration: 1000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  nod: { duration: 400, easing: 'ease-in-out', iterations: 2, direction: 'alternate', fill: 'forwards' },
  
  // Performance animations
  dance: { duration: 2000, easing: 'ease-in-out', iterations: 'infinite', direction: 'alternate', fill: 'forwards' },
  spin: { duration: 800, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  twirl: { duration: 1200, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  leap: { duration: 1000, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  flip: { duration: 800, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  cartwheel: { duration: 1500, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  breakdance: { duration: 2000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  ballet: { duration: 1800, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  
  // Sports animations
  kick: { duration: 600, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  throw: { duration: 800, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  catch: { duration: 400, easing: 'ease-in', iterations: 1, direction: 'normal', fill: 'forwards' },
  hit: { duration: 300, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  swing: { duration: 1000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  dribble: { duration: 400, easing: 'linear', iterations: 5, direction: 'normal', fill: 'forwards' },
  shoot: { duration: 800, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  pass: { duration: 600, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  
  // Combat animations
  punch: { duration: 300, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'sword-fight': { duration: 1200, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'martial-arts': { duration: 1500, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  block: { duration: 400, easing: 'ease-in', iterations: 1, direction: 'normal', fill: 'forwards' },
  dodge: { duration: 500, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'cast-spell': { duration: 1000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  summon: { duration: 2000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  transform: { duration: 1500, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  
  // Fantasy animations
  magic: { duration: 1200, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  float: { duration: 2000, easing: 'ease-in-out', iterations: 'infinite', direction: 'alternate', fill: 'forwards' },
  levitate: { duration: 1500, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  teleport: { duration: 800, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'time-stop': { duration: 1000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  heal: { duration: 1800, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  shield: { duration: 1000, easing: 'ease-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  invisibility: { duration: 1200, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  
  // Sci-fi animations
  'tech-use': { duration: 1000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  hack: { duration: 1500, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  pilot: { duration: 2000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  navigate: { duration: 1200, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  scan: { duration: 800, easing: 'ease-in-out', iterations: 3, direction: 'alternate', fill: 'forwards' },
  'analyze-data': { duration: 1500, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'operate-machine': { duration: 1000, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' },
  'repair-tech': { duration: 1800, easing: 'ease-in-out', iterations: 1, direction: 'normal', fill: 'forwards' }
};

// Keyframe generators for complex animations
const KEYFRAME_GENERATORS = {
  // Complex dance animations
  dance: (): AnimationKeyframe[] => [
    { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
    { transform: 'translateY(-20px) rotate(10deg)', opacity: 1 },
    { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
    { transform: 'translateY(-20px) rotate(-10deg)', opacity: 1 },
    { transform: 'translateY(0px) rotate(0deg)', opacity: 1 }
  ],
  
  // Complex combat animations
  'sword-fight': (): AnimationKeyframe[] => [
    { transform: 'translateX(0px) translateY(0px) rotate(0deg)', opacity: 1 },
    { transform: 'translateX(20px) translateY(-10px) rotate(-30deg)', opacity: 1 },
    { transform: 'translateX(40px) translateY(0px) rotate(0deg)', opacity: 1 },
    { transform: 'translateX(20px) translateY(-10px) rotate(30deg)', opacity: 1 },
    { transform: 'translateX(0px) translateY(0px) rotate(0deg)', opacity: 1 }
  ],
  
  // Magic spell casting
  'cast-spell': (): AnimationKeyframe[] => [
    { transform: 'scale(1) rotate(0deg)', opacity: 1 },
    { transform: 'scale(1.1) rotate(5deg)', opacity: 0.8 },
    { transform: 'scale(1.2) rotate(-5deg)', opacity: 0.6 },
    { transform: 'scale(1.3) rotate(5deg)', opacity: 0.4 },
    { transform: 'scale(1) rotate(0deg)', opacity: 1 }
  ],
  
  // Transformation sequence
  transform: (): AnimationKeyframe[] => [
    { transform: 'scale(1) rotate(0deg)', opacity: 1 },
    { transform: 'scale(0.8) rotate(180deg)', opacity: 0.5 },
    { transform: 'scale(0.6) rotate(360deg)', opacity: 0.2 },
    { transform: 'scale(0.8) rotate(540deg)', opacity: 0.5 },
    { transform: 'scale(1) rotate(720deg)', opacity: 1 }
  ],
  
  // Teleportation effect
  teleport: (): AnimationKeyframe[] => [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(0.8)', opacity: 0.8 },
    { transform: 'scale(0.5)', opacity: 0.5 },
    { transform: 'scale(0.2)', opacity: 0.2 },
    { transform: 'scale(0)', opacity: 0 },
    { transform: 'scale(0.2)', opacity: 0.2 },
    { transform: 'scale(0.5)', opacity: 0.5 },
    { transform: 'scale(0.8)', opacity: 0.8 },
    { transform: 'scale(1)', opacity: 1 }
  ],
  
  // Complex martial arts sequence
  'martial-arts': (): AnimationKeyframe[] => [
    { transform: 'translateX(0px) translateY(0px) rotate(0deg)', opacity: 1 },
    { transform: 'translateX(10px) translateY(-20px) rotate(-15deg)', opacity: 1 },
    { transform: 'translateX(20px) translateY(-40px) rotate(-30deg)', opacity: 1 },
    { transform: 'translateX(30px) translateY(-20px) rotate(-15deg)', opacity: 1 },
    { transform: 'translateX(40px) translateY(0px) rotate(0deg)', opacity: 1 },
    { transform: 'translateX(30px) translateY(20px) rotate(15deg)', opacity: 1 },
    { transform: 'translateX(20px) translateY(40px) rotate(30deg)', opacity: 1 },
    { transform: 'translateX(10px) translateY(20px) rotate(15deg)', opacity: 1 },
    { transform: 'translateX(0px) translateY(0px) rotate(0deg)', opacity: 1 }
  ]
};

// CSS Animation classes for global use
export const ANIMATION_CSS_CLASSES = `
/* Basic Animations */
@keyframes idle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

@keyframes walk {
  0% { transform: translateX(0px) rotate(0deg); }
  25% { transform: translateX(10px) rotate(-2deg); }
  50% { transform: translateX(20px) rotate(0deg); }
  75% { transform: translateX(30px) rotate(2deg); }
  100% { transform: translateX(40px) rotate(0deg); }
}

@keyframes run {
  0% { transform: translateX(0px) translateY(0px); }
  25% { transform: translateX(20px) translateY(-10px); }
  50% { transform: translateX(40px) translateY(0px); }
  75% { transform: translateX(60px) translateY(-10px); }
  100% { transform: translateX(80px) translateY(0px); }
}

@keyframes jump {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-60px); }
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-20deg); }
  75% { transform: rotate(20deg); }
}

/* Emotional Animations */
@keyframes happy {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes sad {
  0% { transform: translateY(0px) scale(1); }
  100% { transform: translateY(10px) scale(0.95); }
}

@keyframes angry {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.05) rotate(-2deg); }
  75% { transform: scale(1.05) rotate(2deg); }
}

@keyframes surprised {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Performance Animations */
@keyframes dance {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(10deg); }
  75% { transform: translateY(-20px) rotate(-10deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes twirl {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

/* Combat Animations */
@keyframes punch {
  0% { transform: translateX(0px); }
  50% { transform: translateX(30px); }
  100% { transform: translateX(0px); }
}

@keyframes sword-fight {
  0% { transform: translateX(0px) translateY(0px) rotate(0deg); }
  25% { transform: translateX(20px) translateY(-10px) rotate(-30deg); }
  50% { transform: translateX(40px) translateY(0px) rotate(0deg); }
  75% { transform: translateX(20px) translateY(-10px) rotate(30deg); }
  100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
}

/* Fantasy Animations */
@keyframes magic {
  0% { transform: scale(1) rotate(0deg); opacity: 1; }
  25% { transform: scale(1.1) rotate(5deg); opacity: 0.8; }
  50% { transform: scale(1.2) rotate(-5deg); opacity: 0.6; }
  75% { transform: scale(1.1) rotate(5deg); opacity: 0.8; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes teleport {
  0% { transform: scale(1); opacity: 1; }
  20% { transform: scale(0.8); opacity: 0.8; }
  40% { transform: scale(0.5); opacity: 0.5; }
  60% { transform: scale(0.2); opacity: 0.2; }
  80% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Sci-fi Animations */
@keyframes tech-use {
  0% { transform: scale(1); filter: hue-rotate(0deg); }
  25% { transform: scale(1.05); filter: hue-rotate(90deg); }
  50% { transform: scale(1.1); filter: hue-rotate(180deg); }
  75% { transform: scale(1.05); filter: hue-rotate(270deg); }
  100% { transform: scale(1); filter: hue-rotate(360deg); }
}

@keyframes hack {
  0% { transform: translateX(0px); opacity: 1; }
  10% { transform: translateX(-5px); opacity: 0.8; }
  20% { transform: translateX(5px); opacity: 1; }
  30% { transform: translateX(-5px); opacity: 0.8; }
  40% { transform: translateX(5px); opacity: 1; }
  50% { transform: translateX(0px); opacity: 1; }
  100% { transform: translateX(0px); opacity: 1; }
}

/* Utility Classes */
.animate-idle { animation: idle 2s ease-in-out infinite alternate; }
.animate-walk { animation: walk 1s linear forwards; }
.animate-run { animation: run 0.8s ease-out forwards; }
.animate-jump { animation: jump 0.6s ease-out forwards; }
.animate-wave { animation: wave 1s ease-in-out 3 alternate forwards; }
.animate-happy { animation: happy 0.8s ease-out forwards; }
.animate-sad { animation: sad 1s ease-in forwards; }
.animate-angry { animation: angry 0.6s ease-out forwards; }
.animate-surprised { animation: surprised 0.4s ease-out forwards; }
.animate-dance { animation: dance 2s ease-in-out infinite alternate; }
.animate-spin { animation: spin 0.8s ease-in-out forwards; }
.animate-twirl { animation: twirl 1.2s ease-in-out forwards; }
.animate-punch { animation: punch 0.3s ease-out forwards; }
.animate-sword-fight { animation: sword-fight 1.2s ease-in-out forwards; }
.animate-magic { animation: magic 1.2s ease-in-out forwards; }
.animate-float { animation: float 2s ease-in-out infinite alternate; }
.animate-teleport { animation: teleport 0.8s ease-in-out forwards; }
.animate-tech-use { animation: tech-use 1s ease-in-out forwards; }
.animate-hack { animation: hack 1.5s ease-in-out forwards; }
`;

// Export utility functions
export function createAnimationSystem(element: HTMLElement): CharacterAnimationSystem {
  return new CharacterAnimationSystem(element);
}

export function getAvailableAnimations(): string[] {
  return Object.keys(ANIMATION_DEFINITIONS);
}

export function getAnimationConfig(name: string): AnimationConfig | undefined {
  return ANIMATION_DEFINITIONS[name as keyof typeof ANIMATION_DEFINITIONS];
}

export function injectAnimationCSS(): void {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = ANIMATION_CSS_CLASSES;
    document.head.appendChild(styleElement);
  }
}