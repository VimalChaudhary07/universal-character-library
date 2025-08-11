"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Settings, 
  Volume2,
  VolumeX,
  Eye,
  Zap
} from "lucide-react";
import { createAnimationSystem, getAvailableAnimations, getAnimationConfig, injectAnimationCSS } from "@/lib/animationSystem";

interface CharacterPreviewProps {
  characterName: string;
  characterType: 'boy' | 'girl' | 'man' | 'woman';
  characterStyle: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional';
  animations: string[];
  svgContent?: string;
  colors?: {
    skin?: string;
    hair?: string;
    shirt?: string;
    pants?: string;
    shoes?: string;
  };
  className?: string;
}

// Default comprehensive animations from the animation system
const defaultAnimations = getAvailableAnimations().slice(0, 20); // Show first 20 for UI

export default function CharacterPreview({ 
  characterName, 
  characterType, 
  characterStyle,
  animations = defaultAnimations,
  svgContent,
  colors,
  className = "" 
}: CharacterPreviewProps) {
  const [currentAnimation, setCurrentAnimation] = useState<string>(animations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const characterRef = useRef<HTMLDivElement>(null);
  const animationSystemRef = useRef<any>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  const defaultColors = {
    skin: colors?.skin || '#FDBCB4',
    hair: colors?.hair || '#8B4513',
    shirt: colors?.shirt || '#4169E1',
    pants: colors?.pants || '#2F4F4F',
    shoes: colors?.shoes || '#000000'
  };

  // Initialize animation system and inject CSS
  useEffect(() => {
    injectAnimationCSS();
    
    if (characterRef.current) {
      animationSystemRef.current = createAnimationSystem(characterRef.current);
    }
  }, []);

  // Handle animation playback
  useEffect(() => {
    if (isPlaying && animationSystemRef.current) {
      const config = getAnimationConfig(currentAnimation);
      if (config) {
        animationSystemRef.current.playAnimation(currentAnimation, {
          ...config,
          duration: config.duration / playbackSpeed,
          iterations: config.iterations === 'infinite' ? Infinity : config.iterations
        });
      }
      startProgressAnimation();
    } else {
      stopProgressAnimation();
      if (animationSystemRef.current) {
        animationSystemRef.current.stopAnimation();
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentAnimation, playbackSpeed]);

  const startProgressAnimation = () => {
    if (!isPlaying) return;
    
    const config = getAnimationConfig(currentAnimation);
    if (!config) return;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp - pausedTimeRef.current;
      }
      
      const elapsed = (timestamp - startTimeRef.current) * playbackSpeed;
      const duration = config.duration;
      const currentProgress = (elapsed % duration) / duration;
      
      setProgress(currentProgress * 100);
      
      if (config.iterations === 'infinite' || elapsed < duration * (typeof config.iterations === 'number' ? config.iterations : 1)) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        setProgress(100);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopProgressAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
    if (!isPlaying) {
      setProgress(0);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (animationRef.current && startTimeRef.current) {
      pausedTimeRef.current = (performance.now() - startTimeRef.current) * playbackSpeed;
    }
    if (animationSystemRef.current) {
      animationSystemRef.current.pauseAnimation();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    stopProgressAnimation();
    if (animationSystemRef.current) {
      animationSystemRef.current.stopAnimation();
    }
    setProgress(0);
  };

  const handleReset = () => {
    handleStop();
    setProgress(0);
  };

  const handleAnimationChange = (animationName: string) => {
    setCurrentAnimation(animationName);
    handleReset();
  };

  const handleSpeedChange = (value: number[]) => {
    setPlaybackSpeed(value[0]);
  };

  const getCharacterEmoji = () => {
    switch (characterType) {
      case 'boy': return '👦';
      case 'girl': return '👧';
      case 'man': return '👨';
      case 'woman': return '👩';
      default: return '👤';
    }
  };

  return (
    <Card className={`w-full ${className}`} role="region" aria-label={`${characterName} character preview`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg" id={`character-title-${characterName.replace(/\s+/g, '-')}`}>
            {characterName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1" aria-label={`Character style: ${characterStyle}`}>
              <Zap className="w-4 h-4" />
              <span className="sr-only">Character style: </span>
              {characterStyle}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowControls(!showControls)}
              aria-label={showControls ? "Hide controls" : "Show controls"}
              aria-expanded={showControls}
              aria-controls={`character-controls-${characterName.replace(/\s+/g, '-')}`}
            >
              <Settings className="w-4 h-4" />
              <span className="sr-only">{showControls ? "Hide" : "Show"} controls</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Character Display */}
        <div 
          className="relative aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center overflow-hidden"
          role="img"
          aria-label={`${characterName} character showing ${currentAnimation} animation`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              isPlaying ? handlePause() : handlePlay();
            }
          }}
        >
          <div 
            ref={characterRef}
            className="w-full h-full flex items-center justify-center transition-all duration-300"
            style={{
              transform: `scale(${1 + Math.sin(progress * Math.PI / 50) * 0.1})`,
              filter: isPlaying ? 'brightness(1.1)' : 'brightness(1)'
            }}
            aria-hidden="true"
          >
            {svgContent ? (
              <div 
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: svgContent }}
                style={{
                  '--skin-color': defaultColors.skin,
                  '--hair-color': defaultColors.hair,
                  '--shirt-color': defaultColors.shirt,
                  '--pants-color': defaultColors.pants,
                  '--shoes-color': defaultColors.shoes,
                } as React.CSSProperties}
              />
            ) : (
              <div className="text-8xl">
                {getCharacterEmoji()}
              </div>
            )}
          </div>
          
          {/* Animation Status Overlay */}
          <div className="absolute top-2 left-2">
            <Badge 
              variant={isPlaying ? "default" : "secondary"} 
              className="gap-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {isPlaying ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span className="sr-only">Animation status: </span>
              {currentAnimation}
            </Badge>
          </div>

          {/* Progress Ring */}
          <div className="absolute bottom-2 right-2">
            <div className="relative w-12 h-12" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Animation progress: ${Math.round(progress)}%`}>
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-muted opacity-30"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-primary transition-all duration-300"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium" aria-hidden="true">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Animation Controls */}
        {showControls && (
          <div 
            className="space-y-4"
            id={`character-controls-${characterName.replace(/\s+/g, '-')}`}
            role="group"
            aria-label="Animation controls"
          >
            {/* Animation Selector */}
            <div className="space-y-2">
              <label htmlFor={`animation-select-${characterName.replace(/\s+/g, '-')}`} className="text-sm font-medium">
                Animation ({animations.length} available)
              </label>
              <Select 
                value={currentAnimation} 
                onValueChange={handleAnimationChange}
              >
                <SelectTrigger 
                  id={`animation-select-${characterName.replace(/\s+/g, '-')}`}
                  aria-label="Select animation"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {animations.slice(0, 50).map((animation) => (
                    <SelectItem key={animation} value={animation}>
                      {animation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2" role="group" aria-label="Playback controls">
              <Button
                size="sm"
                variant={isPlaying ? "secondary" : "default"}
                onClick={isPlaying ? handlePause : handlePlay}
                disabled={animations.length === 0}
                aria-label={isPlaying ? "Pause animation" : "Play animation"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleStop}
                disabled={!isPlaying && progress === 0}
                aria-label="Stop animation"
              >
                <Square className="w-4 h-4" />
                <span className="sr-only">Stop</span>
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                aria-label="Reset animation"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="sr-only">Reset</span>
              </Button>

              <div className="flex-1" aria-hidden="true" />

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                aria-pressed={isMuted}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
              </Button>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={`speed-control-${characterName.replace(/\s+/g, '-')}`} className="text-sm font-medium">
                  Playback Speed
                </label>
                <span className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
                  {playbackSpeed}x
                </span>
              </div>
              <Slider
                id={`speed-control-${characterName.replace(/\s+/g, '-')}`}
                value={[playbackSpeed]}
                onValueChange={handleSpeedChange}
                min={0.25}
                max={3}
                step={0.25}
                className="w-full"
                aria-label="Playback speed"
              />
            </div>

            {/* Animation Info */}
            <div className="text-xs text-muted-foreground space-y-1" aria-live="polite" aria-atomic="true">
              <div className="flex justify-between">
                <span>Current Animation:</span>
                <span className="font-medium">{currentAnimation}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Available:</span>
                <span className="font-medium">{animations.length} animations</span>
              </div>
              <div className="flex justify-between">
                <span>Character Style:</span>
                <span className="font-medium">{characterStyle}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}