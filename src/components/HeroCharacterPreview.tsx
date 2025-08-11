"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Download, Eye } from "lucide-react";
import CharacterPreview from "./CharacterPreview";
import { SAMPLE_CHARACTERS } from "@/lib/characterDatabase";

// Import SVG characters for hero preview
import BoyCasualSVG from "@/characters/boy/casual/svg/base.svg?raw";
import GirlSportySVG from "@/characters/girl/sporty/svg/base.svg?raw";
import ManFormalSVG from "@/characters/man/formal/svg/base.svg?raw";
import WomanFantasySVG from "@/characters/woman/fantasy/svg/base.svg?raw";

// Enhanced sample characters with SVG content
const heroCharacters = SAMPLE_CHARACTERS.slice(0, 4).map((char, index) => {
  let svgContent = null;
  
  switch (index) {
    case 0:
      svgContent = BoyCasualSVG;
      break;
    case 1:
      svgContent = GirlSportySVG;
      break;
    case 2:
      svgContent = ManFormalSVG;
      break;
    case 3:
      svgContent = WomanFantasySVG;
      break;
  }
  
  return {
    ...char,
    svgContent,
    isAvailable: true // Ensure hero characters are available
  };
});

export default function HeroCharacterPreview() {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

  const selectedCharacter = heroCharacters[selectedCharacterIndex];
  const animations = selectedCharacter?.animations || ['idle', 'walk', 'wave', 'jump'];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentAnimationIndex((prev) => (prev + 1) % animations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, animations.length]);

  const handleCharacterChange = (index: number) => {
    setSelectedCharacterIndex(index);
    setCurrentAnimationIndex(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Character Preview */}
        <div className="order-2 lg:order-1">
          <Card className="border-none shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="aspect-square max-w-md mx-auto">
                {selectedCharacter && (
                  <CharacterPreview
                    characterName={selectedCharacter.name}
                    characterType={selectedCharacter.type}
                    characterStyle={selectedCharacter.style as any}
                    animations={animations}
                    svgContent={selectedCharacter.svgContent}
                    isPlaying={isAutoPlay}
                    animationSpeed={1}
                    scale={1.2}
                    className="border-0 shadow-none bg-transparent"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Character Info and Controls */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-4">
              Live Preview
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Meet Our Characters
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Experience the power of our animated character library with this interactive preview. 
              Each character comes with unique animations and customization options.
            </p>
          </div>

          {/* Character Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Choose Character</h3>
            <div className="grid grid-cols-2 gap-3">
              {heroCharacters.map((character, index) => (
                <Button
                  key={character.id}
                  variant={selectedCharacterIndex === index ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => handleCharacterChange(index)}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    {character.svgContent ? (
                      <div 
                        className="w-8 h-8"
                        dangerouslySetInnerHTML={{ __html: character.svgContent }}
                      />
                    ) : (
                      <div className="text-2xl">🎨</div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{character.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {character.type} • {character.style}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Animation Controls */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Animation Controls</h3>
            <div className="flex items-center gap-3">
              <Button
                variant={isAutoPlay ? "default" : "outline"}
                size="sm"
                onClick={toggleAutoPlay}
                className="gap-2"
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutoPlay ? "Pause" : "Play"} Demo
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentAnimationIndex(0)}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>

              <div className="flex-1" />

              <Badge variant="outline" className="gap-1">
                <Eye className="w-3 h-3" />
                {animations[currentAnimationIndex]}
              </Badge>
            </div>
          </div>

          {/* Character Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-muted/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Characters</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Animations</div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="gap-2 flex-1">
              <Download className="w-4 h-4" />
              Download Library
            </Button>
            <Button variant="outline" size="lg" className="gap-2 flex-1">
              <Eye className="w-4 h-4" />
              View All Characters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}