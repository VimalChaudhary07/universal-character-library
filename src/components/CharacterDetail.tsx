"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Palette, 
  Download, 
  Play, 
  Pause, 
  Square, 
  Eye, 
  Code, 
  Share,
  RotateCcw,
  Copy
} from "lucide-react";
import CharacterPreview from "./CharacterPreview";
import { getAvailableAnimations } from "@/lib/animationSystem";

interface CharacterConfig {
  id: string;
  name: string;
  type: 'boy' | 'girl' | 'man' | 'woman';
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional' | 'holiday' | 'sports' | 'occupational';
  colors: {
    skin: string;
    hair: string;
    shirt: string;
    pants: string;
    shoes: string;
    primary: string;
    secondary: string;
    accent: string;
    background?: string;
  };
  animations: string[];
  description: string;
  tags: string[];
  isAvailable: boolean;
  svgContent?: string;
  culture?: string;
  bodyType?: string;
  theme?: string;
  occupation?: string;
  customizableParts: string[];
  accessories: string[];
  hairType?: 'straight' | 'wavy' | 'curly' | 'braided' | 'spiky' | 'long' | 'short';
  footwear?: 'sneakers' | 'boots' | 'sandals' | 'formal' | 'athletic' | 'special';
  props?: string[];
}

interface CharacterDetailProps {
  character: CharacterConfig;
  isOpen: boolean;
  onClose: () => void;
}

const defaultColors = {
  skin: '#FDBCB4',
  hair: '#8B4513',
  shirt: '#4169E1',
  pants: '#2F4F4F',
  shoes: '#000000',
  primary: '#4169E1',
  secondary: '#2F4F4F',
  accent: '#FF69B4',
  background: '#F0F0F0'
};

const defaultCustomization = {
  hairType: 'straight' as 'straight' | 'wavy' | 'curly' | 'braided' | 'spiky' | 'long' | 'short',
  footwear: 'sneakers' as 'sneakers' | 'boots' | 'sandals' | 'formal' | 'athletic' | 'special',
  selectedAccessories: [] as string[],
  selectedProps: [] as string[],
  activeBackground: 'solid' as 'solid' | 'gradient' | 'pattern'
};

// Color presets for different themes
const colorPresets = {
  casual: {
    skin: '#FDBCB4',
    hair: '#8B4513',
    shirt: '#4169E1',
    pants: '#2F4F4F',
    shoes: '#000000',
    primary: '#4169E1',
    secondary: '#2F4F4F',
    accent: '#FF69B4'
  },
  formal: {
    skin: '#FDBCB4',
    hair: '#000000',
    shirt: '#FFFFFF',
    pants: '#000000',
    shoes: '#000000',
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#FFD700'
  },
  sporty: {
    skin: '#FDBCB4',
    hair: '#8B4513',
    shirt: '#FF6B35',
    pants: '#000000',
    shoes: '#FFFFFF',
    primary: '#FF6B35',
    secondary: '#000000',
    accent: '#00CED1'
  },
  fantasy: {
    skin: '#FDBCB4',
    hair: '#9370DB',
    shirt: '#9370DB',
    pants: '#4B0082',
    shoes: '#FFB6C1',
    primary: '#9370DB',
    secondary: '#4B0082',
    accent: '#FFD700'
  }
};

export default function CharacterDetail({ character, isOpen, onClose }: CharacterDetailProps) {
  const [colors, setColors] = useState(defaultColors);
  const [selectedStyle, setSelectedStyle] = useState(character.style);
  const [customization, setCustomization] = useState(defaultCustomization);
  const [exportCode, setExportCode] = useState('');

  const handleColorChange = (part: keyof typeof colors, color: string) => {
    setColors(prev => ({ ...prev, [part]: color }));
  };

  const handleHairTypeChange = (hairType: typeof customization.hairType) => {
    setCustomization(prev => ({ ...prev, hairType }));
  };

  const handleFootwearChange = (footwear: typeof customization.footwear) => {
    setCustomization(prev => ({ ...prev, footwear }));
  };

  const handleAccessoryToggle = (accessory: string) => {
    setCustomization(prev => ({
      ...prev,
      selectedAccessories: prev.selectedAccessories.includes(accessory)
        ? prev.selectedAccessories.filter(a => a !== accessory)
        : [...prev.selectedAccessories, accessory]
    }));
  };

  const handlePropToggle = (prop: string) => {
    setCustomization(prev => ({
      ...prev,
      selectedProps: prev.selectedProps.includes(prop)
        ? prev.selectedProps.filter(p => p !== prop)
        : [...prev.selectedProps, prop]
    }));
  };

  const handleBackgroundChange = (background: typeof customization.activeBackground) => {
    setCustomization(prev => ({ ...prev, activeBackground: background }));
  };

  const applyColorPreset = (preset: keyof typeof colorPresets) => {
    setColors(colorPresets[preset]);
  };

  const generateExportCode = () => {
    const code = `
<!-- Character Library Usage -->
<div id="character-container"></div>

<script>
import { Character } from 'character-library';

const character = new Character({
  id: '${character.id}',
  style: '${selectedStyle}',
  colors: ${JSON.stringify(colors, null, 2)},
  container: '#character-container'
});

// Character will automatically play idle animation
// Use character.play('animation-name') to control animations
</script>`;
    setExportCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportCode);
  };

  const resetCustomization = () => {
    setColors(defaultColors);
    setSelectedStyle(character.style);
  };

  if (!character) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{character.name}</DialogTitle>
              <DialogDescription className="text-base mt-2">
                {character.description}
              </DialogDescription>
            </div>
            <Badge variant={character.isAvailable ? "default" : "secondary"}>
              {character.isAvailable ? "Available" : "Coming Soon"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Character Preview */}
          <div className="space-y-4">
            <CharacterPreview
              characterName={character.name}
              characterType={character.type}
              characterStyle={selectedStyle}
              animations={character.animations}
              svgContent={character.svgContent}
              colors={colors}
            />
          </div>

          {/* Customization Controls */}
          <div className="space-y-4">
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Color Customization
                    </CardTitle>
                    <CardDescription>
                      Customize character colors
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(colors).map(([part, color]) => (
                      <div key={part} className="space-y-2">
                        <Label htmlFor={part} className="capitalize">
                          {part}
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id={part}
                            type="color"
                            value={color}
                            onChange={(e) => handleColorChange(part as keyof typeof colors, e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={color}
                            onChange={(e) => handleColorChange(part as keyof typeof colors, e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Style Options</CardTitle>
                    <CardDescription>
                      Choose character style and appearance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="style-select">Character Style</Label>
                      <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="sporty">Sporty</SelectItem>
                          <SelectItem value="fantasy">Fantasy</SelectItem>
                          <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                          <SelectItem value="historical">Historical</SelectItem>
                          <SelectItem value="traditional">Traditional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Available Animations</Label>
                      <div className="flex flex-wrap gap-2">
                        {character.animations.slice(0, 12).map((animation) => (
                          <Badge key={animation} variant="outline">
                            {animation}
                          </Badge>
                        ))}
                        {character.animations.length > 12 && (
                          <Badge variant="secondary">
                            +{character.animations.length - 12} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {character.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Additional Character Information */}
                    {character.culture && (
                      <div className="space-y-2">
                        <Label>Culture</Label>
                        <Badge variant="outline">{character.culture}</Badge>
                      </div>
                    )}

                    {character.bodyType && (
                      <div className="space-y-2">
                        <Label>Body Type</Label>
                        <Badge variant="outline">{character.bodyType}</Badge>
                      </div>
                    )}

                    {character.theme && (
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <Badge variant="outline">{character.theme}</Badge>
                      </div>
                    )}

                    {character.occupation && (
                      <div className="space-y-2">
                        <Label>Occupation</Label>
                        <Badge variant="outline">{character.occupation}</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="export" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Export Character
                    </CardTitle>
                    <CardDescription>
                      Generate code for using this character
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button onClick={generateExportCode} className="w-full">
                      Generate Export Code
                    </Button>

                    {exportCode && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Generated Code</Label>
                          <Button size="sm" variant="outline" onClick={copyToClipboard}>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto max-h-60">
                          {exportCode}
                        </pre>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download SVG
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Share className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={resetCustomization}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                  <Button 
                    className="flex-1 gap-2"
                    disabled={!character.isAvailable}
                  >
                    <Download className="w-4 h-4" />
                    Download Character
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}