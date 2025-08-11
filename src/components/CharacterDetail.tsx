"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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
  Copy,
  User,
  Scissors,
  Shirt,
  Gem,
  Footwear,
  Wand2,
  Image as ImageIcon,
  Sparkles,
  Save,
  Layers,
  Zap,
  Heart,
  Star,
  Settings,
  Film,
  Music,
  Palette as Paint,
  Camera,
  Grid3X3,
  Sun,
  Moon
} from "lucide-react";
import CharacterPreview from "./CharacterPreview";
import { getAvailableAnimations } from "@/lib/animationSystem";
import {
  CharacterCustomization,
  SKIN_TONE_OPTIONS,
  HAIR_TYPE_OPTIONS,
  HAIR_COLOR_OPTIONS,
  CLOTHING_OPTIONS,
  ACCESSORY_OPTIONS,
  FOOTWEAR_OPTIONS,
  PROP_OPTIONS,
  BACKGROUND_OPTIONS,
  getCompatibleOptions,
  getOptionsByCategory,
  getOptionsByStyle,
  createDefaultCustomization,
  applyCustomizationToCSS
} from "@/lib/enhanced-customization";

interface CharacterConfig {
  id: string;
  name: string;
  type: 'boy' | 'girl' | 'man' | 'woman';
  style: 'casual' | 'formal' | 'sporty' | 'fantasy' | 'sci-fi' | 'historical' | 'traditional' | 'holiday' | 'sports' | 'occupational';
  animations: string[];
  description: string;
  tags: string[];
  isAvailable: boolean;
  svgContent?: string;
  culture?: string;
  bodyType?: string;
  theme?: string;
  occupation?: string;
}

interface CharacterDetailProps {
  character: CharacterConfig;
  isOpen: boolean;
  onClose: () => void;
}

export default function CharacterDetail({ character, isOpen, onClose }: CharacterDetailProps) {
  const [customization, setCustomization] = useState<CharacterCustomization>(
    createDefaultCustomization(character.type, character.style)
  );
  const [selectedStyle, setSelectedStyle] = useState(character.style);
  const [exportCode, setExportCode] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState([1]);
  const [characterScale, setCharacterScale] = useState([1]);
  const [selectedAnimation, setSelectedAnimation] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(true);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [savedPresets, setSavedPresets] = useState<any[]>([]);
  const [currentPresetName, setCurrentPresetName] = useState('');
  const [characterName, setCharacterName] = useState(character.name);

  const availableAnimations = getAvailableAnimations(character.type, selectedStyle);

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style as CharacterConfig['style']);
    // Update customization to match new style
    const newCustomization = createDefaultCustomization(character.type, style as CharacterConfig['style']);
    setCustomization(newCustomization);
  };

  const handleSkinToneChange = (skinToneId: string) => {
    const skinTone = SKIN_TONE_OPTIONS.find(option => option.id === skinToneId);
    if (skinTone) {
      setCustomization(prev => ({ ...prev, skinTone }));
    }
  };

  const handleHairTypeChange = (hairTypeId: string) => {
    const hairType = HAIR_TYPE_OPTIONS.find(option => option.id === hairTypeId);
    if (hairType) {
      setCustomization(prev => ({ ...prev, hairType }));
    }
  };

  const handleHairColorChange = (hairColorId: string) => {
    const hairColor = HAIR_COLOR_OPTIONS.find(option => option.id === hairColorId);
    if (hairColor) {
      setCustomization(prev => ({ ...prev, hairColor }));
    }
  };

  const handleClothingChange = (clothingId: string, category: 'top' | 'bottom' | 'dress') => {
    const clothing = CLOTHING_OPTIONS.find(option => option.id === clothingId);
    if (clothing) {
      setCustomization(prev => ({
        ...prev,
        clothing: {
          ...prev.clothing,
          [category]: clothing
        }
      }));
    }
  };

  const handleAccessoryToggle = (accessoryId: string) => {
    const accessory = ACCESSORY_OPTIONS.find(option => option.id === accessoryId);
    if (!accessory) return;

    setCustomization(prev => {
      const isSelected = prev.accessories.some(a => a.id === accessoryId);
      return {
        ...prev,
        accessories: isSelected
          ? prev.accessories.filter(a => a.id !== accessoryId)
          : [...prev.accessories, accessory]
      };
    });
  };

  const handleFootwearChange = (footwearId: string) => {
    const footwear = FOOTWEAR_OPTIONS.find(option => option.id === footwearId);
    if (footwear) {
      setCustomization(prev => ({ ...prev, footwear }));
    }
  };

  const handlePropToggle = (propId: string) => {
    const prop = PROP_OPTIONS.find(option => option.id === propId);
    if (!prop) return;

    setCustomization(prev => {
      const isSelected = prev.props.some(p => p.id === propId);
      return {
        ...prev,
        props: isSelected
          ? prev.props.filter(p => p.id !== propId)
          : [...prev.props, prop]
      };
    });
  };

  const handleBackgroundChange = (backgroundId: string) => {
    const background = BACKGROUND_OPTIONS.find(option => option.id === backgroundId);
    if (background) {
      setCustomization(prev => ({ ...prev, background }));
    }
  };

  const handleBodyTypeChange = (bodyType: CharacterCustomization['bodyType']) => {
    setCustomization(prev => ({ ...prev, bodyType }));
  };

  const handleExpressionChange = (expression: CharacterCustomization['expression']) => {
    setCustomization(prev => ({ ...prev, expression }));
  };

  const handlePoseChange = (pose: CharacterCustomization['pose']) => {
    setCustomization(prev => ({ ...prev, pose }));
  };

  const savePreset = () => {
    if (!currentPresetName.trim()) return;
    
    const newPreset = {
      id: Date.now().toString(),
      name: currentPresetName,
      customization: { ...customization },
      style: selectedStyle,
      characterType: character.type
    };
    
    setSavedPresets(prev => [...prev, newPreset]);
    setCurrentPresetName('');
  };

  const loadPreset = (presetId: string) => {
    const preset = savedPresets.find(p => p.id === presetId);
    if (preset) {
      setCustomization(preset.customization);
      setSelectedStyle(preset.style);
    }
  };

  const deletePreset = (presetId: string) => {
    setSavedPresets(prev => prev.filter(p => p.id !== presetId));
  };

  const handleAnimationChange = (animation: string) => {
    setSelectedAnimation(animation);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const generateExportCode = () => {
    const cssVars = applyCustomizationToCSS(customization);
    const code = `
<!-- Universal Character Library Usage -->
<div id="character-container"></div>

<style>
${Object.entries(cssVars).map(([key, value]) => `  ${key}: ${value};`).join('\n')}
</style>

<script>
import { Character } from 'universal-character-library';

const character = new Character({
  id: '${character.id}',
  name: '${characterName}',
  type: '${character.type}',
  style: '${selectedStyle}',
  customization: ${JSON.stringify(customization, null, 2)},
  container: '#character-container',
  animationSpeed: ${animationSpeed[0]},
  scale: ${characterScale[0]}
});

// Character will automatically play idle animation
// Use character.play('animation-name') to control animations
// Available animations: ${availableAnimations.join(', ')}
</script>`;
    setExportCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportCode);
  };

  const resetCustomization = () => {
    setCustomization(createDefaultCustomization(character.type, character.style));
    setSelectedStyle(character.style);
    setAnimationSpeed([1]);
    setCharacterScale([1]);
    setSelectedAnimation('idle');
    setIsPlaying(true);
  };

  if (!character) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Input
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              <DialogDescription className="text-base mt-2">
                {character.description}
              </DialogDescription>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">{character.type}</Badge>
                <Badge variant="outline">{character.style}</Badge>
                {character.culture && <Badge variant="outline">{character.culture}</Badge>}
                {character.occupation && <Badge variant="outline">{character.occupation}</Badge>}
                {character.theme && <Badge variant="outline">{character.theme}</Badge>}
                <Badge variant={character.isAvailable ? "default" : "secondary"}>
                  {character.isAvailable ? "Available" : "Coming Soon"}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Character Preview */}
          <div className="space-y-4">
            {/* Style Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Character Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedStyle} onValueChange={handleStyleChange}>
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
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="occupational">Occupational</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Animation Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  Animation Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={isPlaying ? "secondary" : "default"}
                    size="sm"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Select value={selectedAnimation} onValueChange={handleAnimationChange}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAnimations.map((animation) => (
                        <SelectItem key={animation} value={animation}>
                          {animation.charAt(0).toUpperCase() + animation.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Animation Speed</Label>
                  <Slider
                    value={animationSpeed}
                    onValueChange={setAnimationSpeed}
                    max={3}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {animationSpeed[0]}x speed
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Character Scale</Label>
                  <Slider
                    value={characterScale}
                    onValueChange={setCharacterScale}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {characterScale[0]}x scale
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Character Preview */}
            <CharacterPreview
              characterName={characterName}
              characterType={character.type}
              characterStyle={selectedStyle}
              animations={[selectedAnimation]}
              svgContent={character.svgContent}
              customization={customization}
              isPlaying={isPlaying}
              animationSpeed={animationSpeed[0]}
              scale={characterScale[0]}
            />
          </div>

          {/* Customization Controls */}
          <div className="space-y-4">
            {/* Advanced Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <Label>Advanced Mode</Label>
              </div>
              <Switch
                checked={advancedMode}
                onCheckedChange={setAdvancedMode}
              />
            </div>

            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className={`grid w-full ${advancedMode ? 'grid-cols-6' : 'grid-cols-4'}`}>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="clothing">Clothing</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
                {advancedMode && (
                  <>
                    <TabsTrigger value="presets">Presets</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </>
                )}
              </TabsList>

              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Appearance Customization
                    </CardTitle>
                    <CardDescription>
                      Customize character appearance features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Skin Tone */}
                    <div className="space-y-2">
                      <Label>Skin Tone</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {SKIN_TONE_OPTIONS.map((skinTone) => (
                          <button
                            key={skinTone.id}
                            onClick={() => handleSkinToneChange(skinTone.id)}
                            className={`w-12 h-12 rounded-full border-2 ${
                              customization.skinTone.id === skinTone.id
                                ? 'border-primary'
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: skinTone.value }}
                            title={skinTone.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hair Type */}
                    <div className="space-y-2">
                      <Label>Hair Type</Label>
                      <Select value={customization.hairType.id} onValueChange={handleHairTypeChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getCompatibleOptions(HAIR_TYPE_OPTIONS, character.type).map((hairType) => (
                            <SelectItem key={hairType.id} value={hairType.id}>
                              {hairType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Hair Color */}
                    <div className="space-y-2">
                      <Label>Hair Color</Label>
                      <div className="grid grid-cols-6 gap-2">
                        {HAIR_COLOR_OPTIONS.map((hairColor) => (
                          <button
                            key={hairColor.id}
                            onClick={() => handleHairColorChange(hairColor.id)}
                            className={`w-8 h-8 rounded-full border-2 ${
                              customization.hairColor.id === hairColor.id
                                ? 'border-primary'
                                : 'border-gray-300'
                            }`}
                            style={{ 
                              backgroundColor: hairColor.value.startsWith('linear-gradient') 
                                ? '#ffffff' 
                                : hairColor.value,
                              backgroundImage: hairColor.value.startsWith('linear-gradient') 
                                ? hairColor.value 
                                : 'none'
                            }}
                            title={hairColor.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Body Type */}
                    <div className="space-y-2">
                      <Label>Body Type</Label>
                      <Select value={customization.bodyType} onValueChange={handleBodyTypeChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slim">Slim</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                          <SelectItem value="athletic">Athletic</SelectItem>
                          <SelectItem value="muscular">Muscular</SelectItem>
                          <SelectItem value="heavy">Heavy</SelectItem>
                          <SelectItem value="tall">Tall</SelectItem>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="elderly">Elderly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Expression */}
                    <div className="space-y-2">
                      <Label>Expression</Label>
                      <Select value={customization.expression} onValueChange={handleExpressionChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="happy">Happy</SelectItem>
                          <SelectItem value="sad">Sad</SelectItem>
                          <SelectItem value="angry">Angry</SelectItem>
                          <SelectItem value="surprised">Surprised</SelectItem>
                          <SelectItem value="confused">Confused</SelectItem>
                          <SelectItem value="excited">Excited</SelectItem>
                          <SelectItem value="bored">Bored</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pose */}
                    <div className="space-y-2">
                      <Label>Pose</Label>
                      <Select value={customization.pose} onValueChange={handlePoseChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standing">Standing</SelectItem>
                          <SelectItem value="sitting">Sitting</SelectItem>
                          <SelectItem value="walking">Walking</SelectItem>
                          <SelectItem value="running">Running</SelectItem>
                          <SelectItem value="jumping">Jumping</SelectItem>
                          <SelectItem value="dancing">Dancing</SelectItem>
                          <SelectItem value="fighting">Fighting</SelectItem>
                          <SelectItem value="working">Working</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clothing" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tops */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shirt className="w-5 h-5" />
                        Tops
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Select 
                        value={customization.clothing.top?.id || ''} 
                        onValueChange={(value) => handleClothingChange(value, 'top')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select top" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCompatibleOptions(
                            getOptionsByCategory(CLOTHING_OPTIONS, 'top'), 
                            character.type
                          ).map((clothing) => (
                            <SelectItem key={clothing.id} value={clothing.id}>
                              {clothing.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Bottoms */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shirt className="w-5 h-5" />
                        Bottoms
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Select 
                        value={customization.clothing.bottom?.id || ''} 
                        onValueChange={(value) => handleClothingChange(value, 'bottom')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bottom" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCompatibleOptions(
                            getOptionsByCategory(CLOTHING_OPTIONS, 'bottom'), 
                            character.type
                          ).map((clothing) => (
                            <SelectItem key={clothing.id} value={clothing.id}>
                              {clothing.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Dresses */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shirt className="w-5 h-5" />
                        Dresses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Select 
                        value={customization.clothing.dress?.id || ''} 
                        onValueChange={(value) => handleClothingChange(value, 'dress')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select dress" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCompatibleOptions(
                            getOptionsByCategory(CLOTHING_OPTIONS, 'dress'), 
                            character.type
                          ).map((clothing) => (
                            <SelectItem key={clothing.id} value={clothing.id}>
                              {clothing.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Footwear */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Footwear className="w-5 h-5" />
                        Footwear
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Select 
                        value={customization.footwear.id} 
                        onValueChange={handleFootwearChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getCompatibleOptions(FOOTWEAR_OPTIONS, character.type).map((footwear) => (
                            <SelectItem key={footwear.id} value={footwear.id}>
                              {footwear.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="accessories" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Accessories by Category */}
                  {['headwear', 'eyewear', 'jewelry', 'bags', 'tech', 'cultural', 'weapon', 'tool'].map((category) => (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 capitalize">
                          <Gem className="w-5 h-5" />
                          {category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 max-h-40 overflow-y-auto">
                        {getCompatibleOptions(
                          getOptionsByCategory(ACCESSORY_OPTIONS, category), 
                          character.type
                        ).map((accessory) => (
                          <div key={accessory.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={accessory.id}
                              checked={customization.accessories.some(a => a.id === accessory.id)}
                              onCheckedChange={() => handleAccessoryToggle(accessory.id)}
                            />
                            <Label htmlFor={accessory.id} className="text-sm">
                              {accessory.name}
                            </Label>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}

                  {/* Props by Category */}
                  {['weapon', 'tool', 'instrument', 'tech', 'sports', 'food', 'book', 'cultural'].map((category) => (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 capitalize">
                          <Wand2 className="w-5 h-5" />
                          {category} Props
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 max-h-40 overflow-y-auto">
                        {getCompatibleOptions(
                          getOptionsByCategory(PROP_OPTIONS, category), 
                          character.type
                        ).map((prop) => (
                          <div key={prop.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={prop.id}
                              checked={customization.props.some(p => p.id === prop.id)}
                              onCheckedChange={() => handlePropToggle(prop.id)}
                            />
                            <Label htmlFor={prop.id} className="text-sm">
                              {prop.name}
                            </Label>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}

                  {/* Background */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        Background
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Select 
                        value={customization.background.id} 
                        onValueChange={handleBackgroundChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {BACKGROUND_OPTIONS.map((background) => (
                            <SelectItem key={background.id} value={background.id}>
                              {background.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </div>
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

              {advancedMode && (
                <>
                  <TabsContent value="presets" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Save className="w-5 h-5" />
                          Character Presets
                        </CardTitle>
                        <CardDescription>
                          Save and load character customization presets
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Save New Preset */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Preset name"
                            value={currentPresetName}
                            onChange={(e) => setCurrentPresetName(e.target.value)}
                          />
                          <Button onClick={savePreset} disabled={!currentPresetName.trim()}>
                            Save
                          </Button>
                        </div>

                        {/* Saved Presets */}
                        <div className="space-y-2">
                          <Label>Saved Presets</Label>
                          <div className="max-h-40 overflow-y-auto space-y-2">
                            {savedPresets.map((preset) => (
                              <div key={preset.id} className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => loadPreset(preset.id)}
                                  >
                                    <Play className="w-4 h-4" />
                                  </Button>
                                  <span className="text-sm">{preset.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {preset.style}
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deletePreset(preset.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                            {savedPresets.length === 0 && (
                              <div className="text-center text-muted-foreground text-sm py-4">
                                No saved presets yet
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="w-5 h-5" />
                          Advanced Settings
                        </CardTitle>
                        <CardDescription>
                          Fine-tune character appearance and behavior
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Animation Blending */}
                        <div className="space-y-2">
                          <Label>Animation Blending</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              Smooth
                            </Button>
                            <Button variant="outline" size="sm">
                              Sharp
                            </Button>
                          </div>
                        </div>

                        {/* Lighting Effects */}
                        <div className="space-y-2">
                          <Label>Lighting Effects</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" size="sm">
                              <Sun className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Moon className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Zap className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Color Themes */}
                        <div className="space-y-2">
                          <Label>Color Themes</Label>
                          <div className="grid grid-cols-4 gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 bg-red-500" />
                            <Button variant="outline" size="sm" className="h-8 w-8 bg-blue-500" />
                            <Button variant="outline" size="sm" className="h-8 w-8 bg-green-500" />
                            <Button variant="outline" size="sm" className="h-8 w-8 bg-purple-500" />
                          </div>
                        </div>

                        {/* Special Effects */}
                        <div className="space-y-2">
                          <Label>Special Effects</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="particles" />
                              <Label htmlFor="particles" className="text-sm">Particle Effects</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="glow" />
                              <Label htmlFor="glow" className="text-sm">Glow Effect</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="shadow" />
                              <Label htmlFor="shadow" className="text-sm">Dynamic Shadows</Label>
                            </div>
                          </div>
                        </div>

                        {/* Performance Settings */}
                        <div className="space-y-2">
                          <Label>Performance Settings</Label>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">High Quality</Label>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Anti-aliasing</Label>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
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