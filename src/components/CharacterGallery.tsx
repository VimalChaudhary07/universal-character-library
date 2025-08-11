"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye } from "lucide-react";
import CharacterDetail from "./CharacterDetail";
import { COMPREHENSIVE_CHARACTERS, Character } from "@/lib/characterDatabase";

// Import SVG characters for available ones
import BoyCasualSVG from "@/characters/boy/casual/svg/base.svg?raw";
import GirlSportySVG from "@/characters/girl/sporty/svg/base.svg?raw";
import ManFormalSVG from "@/characters/man/formal/svg/base.svg?raw";
import WomanFantasySVG from "@/characters/woman/fantasy/svg/base.svg?raw";
import WomanTraditionalSVG from "@/characters/woman/traditional/svg/base.svg?raw";
import ManTraditionalSVG from "@/characters/man/traditional/svg/base.svg?raw";
import GirlTraditionalSVG from "@/characters/girl/traditional/svg/base.svg?raw";
import ManSciFiSVG from "@/characters/man/sci-fi/svg/base.svg?raw";
import WomanHistoricalSVG from "@/characters/woman/historical/svg/base.svg?raw";
import GirlHolidaySVG from "@/characters/girl/holiday/svg/base.svg?raw";
import BoySportsSVG from "@/characters/boy/sports/svg/base.svg?raw";
import WomanOccupationalSVG from "@/characters/woman/occupational/svg/base.svg?raw";

// Add SVG content to available characters in the comprehensive database
const enhancedCharacters = COMPREHENSIVE_CHARACTERS.map(char => {
  if (char.id.includes('boy-casual') && char.isAvailable) {
    return { ...char, svgContent: BoyCasualSVG };
  } else if (char.id.includes('girl-sporty') && char.isAvailable) {
    return { ...char, svgContent: GirlSportySVG };
  } else if (char.id.includes('man-formal') && char.isAvailable) {
    return { ...char, svgContent: ManFormalSVG };
  } else if (char.id.includes('woman-fantasy') && char.isAvailable) {
    return { ...char, svgContent: WomanFantasySVG };
  } else if (char.id.includes('woman-traditional') && char.isAvailable) {
    return { ...char, svgContent: WomanTraditionalSVG };
  } else if (char.id.includes('man-traditional') && char.isAvailable) {
    return { ...char, svgContent: ManTraditionalSVG };
  } else if (char.id.includes('girl-traditional') && char.isAvailable) {
    return { ...char, svgContent: GirlTraditionalSVG };
  } else if (char.id.includes('man-sci-fi') && char.isAvailable) {
    return { ...char, svgContent: ManSciFiSVG };
  } else if (char.id.includes('woman-historical') && char.isAvailable) {
    return { ...char, svgContent: WomanHistoricalSVG };
  } else if (char.id.includes('girl-holiday') && char.isAvailable) {
    return { ...char, svgContent: GirlHolidaySVG };
  } else if (char.id.includes('boy-sports') && char.isAvailable) {
    return { ...char, svgContent: BoySportsSVG };
  } else if (char.id.includes('woman-occupational') && char.isAvailable) {
    return { ...char, svgContent: WomanOccupationalSVG };
  }
  return char;
});

export default function CharacterGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedCulture, setSelectedCulture] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredCharacters = useMemo(() => {
    return enhancedCharacters.filter(character => {
      const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           character.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           character.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (character.culture && character.culture.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (character.theme && character.theme.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (character.occupation && character.occupation.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (character.religion && character.religion.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (character.community && character.community.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || character.type === selectedType;
      const matchesStyle = selectedStyle === 'all' || character.style === selectedStyle;
      const matchesCulture = selectedCulture === 'all' || character.culture === selectedCulture;
      const matchesTheme = selectedTheme === 'all' || character.theme === selectedTheme;
      const matchesAvailability = availabilityFilter === 'all' || 
                                 (availabilityFilter === 'available' && character.isAvailable) ||
                                 (availabilityFilter === 'coming-soon' && !character.isAvailable);

      return matchesSearch && matchesType && matchesStyle && matchesCulture && matchesTheme && matchesAvailability;
    });
  }, [searchTerm, selectedType, selectedStyle, selectedCulture, selectedTheme, availabilityFilter]);

  const availableCount = enhancedCharacters.filter(c => c.isAvailable).length;
  const comingSoonCount = enhancedCharacters.filter(c => !c.isAvailable).length;

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="boy">Boy</SelectItem>
                <SelectItem value="girl">Girl</SelectItem>
                <SelectItem value="man">Man</SelectItem>
                <SelectItem value="woman">Woman</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="sporty">Sporty</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="traditional">Traditional</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCulture} onValueChange={setSelectedCulture}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Culture" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cultures</SelectItem>
                <SelectItem value="Western">Western</SelectItem>
                <SelectItem value="Indian">Indian</SelectItem>
                <SelectItem value="African">African</SelectItem>
                <SelectItem value="Asian">Asian</SelectItem>
                <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
                <SelectItem value="Indigenous">Indigenous</SelectItem>
                <SelectItem value="Fantasy">Fantasy</SelectItem>
                <SelectItem value="Futuristic">Futuristic</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Themes</SelectItem>
                <SelectItem value="everyday">Everyday</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="magic">Magic</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Characters</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="coming-soon">Coming Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Total: {enhancedCharacters.length} characters</span>
          <span>•</span>
          <span>Available: {availableCount}</span>
          <span>•</span>
          <span>Coming Soon: {comingSoonCount}</span>
          <span>•</span>
          <span>Showing: {filteredCharacters.length}</span>
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCharacters.map((character) => (
          <Card key={character.id} className="hover:shadow-lg transition-all duration-200 group cursor-pointer" onClick={() => handleCharacterClick(character)}>
            <CardContent className="p-6">
              {/* Character Preview */}
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                {character.svgContent ? (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: character.svgContent }}
                  />
                ) : (
                  <div className="text-6xl opacity-50">
                    {character.type === 'boy' && '👦'}
                    {character.type === 'girl' && '👧'}
                    {character.type === 'man' && '👨'}
                    {character.type === 'woman' && '👩'}
                  </div>
                )}
                
                {/* Availability Badge */}
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant={character.isAvailable ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {character.isAvailable ? "Available" : "Coming Soon"}
                  </Badge>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" className="gap-2" onClick={(e) => { e.stopPropagation(); handleCharacterClick(character); }}>
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                  {character.isAvailable && (
                    <Button size="sm" className="gap-2" onClick={(e) => { e.stopPropagation(); handleCharacterClick(character); }}>
                      <Download className="w-4 h-4" />
                      Get
                    </Button>
                  )}
                </div>
              </div>

              {/* Character Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{character.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {character.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {character.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Animations */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Animations:</p>
                  <div className="flex flex-wrap gap-1">
                    {character.animations.map((animation) => (
                      <Badge key={animation} variant="secondary" className="text-xs">
                        {animation}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => { e.stopPropagation(); handleCharacterClick(character); }}
                  >
                    {character.isAvailable ? "View Details" : "Notify Me"}
                  </Button>
                  {character.isAvailable && (
                    <Button 
                      size="sm" 
                      className="gap-1"
                      onClick={(e) => { e.stopPropagation(); handleCharacterClick(character); }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCharacters.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No characters found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
              setSelectedStyle('all');
              setSelectedCulture('all');
              setSelectedTheme('all');
              setAvailabilityFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <CharacterDetail
          character={{
            ...selectedCharacter,
            colors: {
              skin: '#FDBCB4',
              hair: '#8B4513',
              shirt: '#4169E1',
              pants: '#2F4F4F',
              shoes: '#000000'
            }
          }}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}