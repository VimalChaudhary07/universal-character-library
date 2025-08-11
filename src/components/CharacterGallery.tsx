"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ChevronDown, 
  X,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Users,
  Star,
  Clock
} from "lucide-react";
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
  const [selectedBodyType, setSelectedBodyType] = useState<string>('all');
  const [selectedReligion, setSelectedReligion] = useState<string>('all');
  const [selectedOccupation, setSelectedOccupation] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'style' | 'culture' | 'popularity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Get all available options for filters
  const filterOptions = useMemo(() => {
    const allCharacters = COMPREHENSIVE_CHARACTERS;
    
    const types = [...new Set(allCharacters.map(c => c.type))];
    const styles = [...new Set(allCharacters.map(c => c.style))];
    const cultures = [...new Set(allCharacters.map(c => c.culture).filter(Boolean))];
    const themes = [...new Set(allCharacters.map(c => c.theme).filter(Boolean))];
    const bodyTypes = [...new Set(allCharacters.map(c => c.bodyType).filter(Boolean))];
    const religions = [...new Set(allCharacters.map(c => c.religion).filter(Boolean))];
    const occupations = [...new Set(allCharacters.map(c => c.occupation).filter(Boolean))];
    const regions = [...new Set(allCharacters.map(c => c.region).filter(Boolean))];
    const allTags = [...new Set(allCharacters.flatMap(c => c.tags))];

    return {
      types,
      styles,
      cultures,
      themes,
      bodyTypes,
      religions,
      occupations,
      regions,
      allTags
    };
  }, []);

  // Enhanced filtering logic
  const filteredCharacters = useMemo(() => {
    let filtered = COMPREHENSIVE_CHARACTERS.filter(character => {
      // Search term matching (enhanced)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        character.name.toLowerCase().includes(searchLower) ||
        character.description.toLowerCase().includes(searchLower) ||
        character.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (character.culture && character.culture.toLowerCase().includes(searchLower)) ||
        (character.theme && character.theme.toLowerCase().includes(searchLower)) ||
        (character.occupation && character.occupation.toLowerCase().includes(searchLower)) ||
        (character.religion && character.religion.toLowerCase().includes(searchLower)) ||
        (character.community && character.community.toLowerCase().includes(searchLower)) ||
        (character.region && character.region.toLowerCase().includes(searchLower)) ||
        (character.bodyType && character.bodyType.toLowerCase().includes(searchLower)) ||
        (character.era && character.era.toLowerCase().includes(searchLower));

      // Basic filters
      const matchesType = selectedType === 'all' || character.type === selectedType;
      const matchesStyle = selectedStyle === 'all' || character.style === selectedStyle;
      const matchesCulture = selectedCulture === 'all' || character.culture === selectedCulture;
      const matchesTheme = selectedTheme === 'all' || character.theme === selectedTheme;
      const matchesBodyType = selectedBodyType === 'all' || character.bodyType === selectedBodyType;
      const matchesReligion = selectedReligion === 'all' || character.religion === selectedReligion;
      const matchesOccupation = selectedOccupation === 'all' || character.occupation === selectedOccupation;
      const matchesRegion = selectedRegion === 'all' || character.region === selectedRegion;
      const matchesAvailability = availabilityFilter === 'all' || 
                                 (availabilityFilter === 'available' && character.isAvailable) ||
                                 (availabilityFilter === 'coming-soon' && !character.isAvailable);

      // Tag filtering
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => character.tags.includes(tag));

      return matchesSearch && matchesType && matchesStyle && matchesCulture && 
             matchesTheme && matchesBodyType && matchesReligion && matchesOccupation && 
             matchesRegion && matchesAvailability && matchesTags;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'style':
          aValue = a.style;
          bValue = b.style;
          break;
        case 'culture':
          aValue = a.culture || '';
          bValue = b.culture || '';
          break;
        case 'popularity':
          aValue = a.animations.length;
          bValue = b.animations.length;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [searchTerm, selectedType, selectedStyle, selectedCulture, selectedTheme, 
      selectedBodyType, selectedReligion, selectedOccupation, selectedRegion, 
      availabilityFilter, selectedTags, sortBy, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const total = COMPREHENSIVE_CHARACTERS.length;
    const available = COMPREHENSIVE_CHARACTERS.filter(c => c.isAvailable).length;
    const comingSoon = total - available;
    const showing = filteredCharacters.length;
    
    // Culture distribution
    const cultureCounts = COMPREHENSIVE_CHARACTERS.reduce((acc, char) => {
      if (char.culture) {
        acc[char.culture] = (acc[char.culture] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Style distribution
    const styleCounts = COMPREHENSIVE_CHARACTERS.reduce((acc, char) => {
      acc[char.style] = (acc[char.style] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      available,
      comingSoon,
      showing,
      cultureCounts,
      styleCounts
    };
  }, [filteredCharacters.length]);

  // Tag management
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedStyle('all');
    setSelectedCulture('all');
    setSelectedTheme('all');
    setSelectedBodyType('all');
    setSelectedReligion('all');
    setSelectedOccupation('all');
    setSelectedRegion('all');
    setAvailabilityFilter('all');
    setSelectedTags([]);
  };

  const toggleFavorite = (characterId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(characterId)) {
        newFavorites.delete(characterId);
      } else {
        newFavorites.add(characterId);
      }
      return newFavorites;
    });
  };

  const isFavorite = (characterId: string) => favorites.has(characterId);

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Character Gallery</h1>
          <p className="text-muted-foreground">
            Explore {stats.total.toLocaleString()} diverse characters from around the world
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search characters by name, culture, style, occupation, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Main Filters */}
        <div className="flex flex-wrap gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {filterOptions.types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              {filterOptions.styles.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCulture} onValueChange={setSelectedCulture}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Culture" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cultures</SelectItem>
              {filterOptions.cultures.map(culture => (
                <SelectItem key={culture} value={culture}>{culture}</SelectItem>
              ))}
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

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="style">Style</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
          </Button>

          <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-4 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Themes</SelectItem>
                    {filterOptions.themes.map(theme => (
                      <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBodyType} onValueChange={setSelectedBodyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Body Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Body Types</SelectItem>
                    {filterOptions.bodyTypes.map(bodyType => (
                      <SelectItem key={bodyType} value={bodyType}>{bodyType}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedReligion} onValueChange={setSelectedReligion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Religions</SelectItem>
                    {filterOptions.religions.map(religion => (
                      <SelectItem key={religion} value={religion}>{religion}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedOccupation} onValueChange={setSelectedOccupation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Occupations</SelectItem>
                    {filterOptions.occupations.map(occupation => (
                      <SelectItem key={occupation} value={occupation}>{occupation}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {filterOptions.regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Filter by Tags:</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {filterOptions.allTags.slice(0, 20).map(tag => (
                    <div key={tag} className="flex items-center space-x-1">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <Label htmlFor={`tag-${tag}`} className="text-xs">
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Total: {stats.total.toLocaleString()}
          </span>
          <span>•</span>
          <span className="text-green-600">Available: {stats.available.toLocaleString()}</span>
          <span>•</span>
          <span className="text-yellow-600">Coming Soon: {stats.comingSoon.toLocaleString()}</span>
          <span>•</span>
          <span>Showing: {stats.showing.toLocaleString()}</span>
          {selectedTags.length > 0 && (
            <>
              <span>•</span>
              <span>Tags: {selectedTags.length}</span>
            </>
          )}
        </div>

        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-2">
          {selectedType !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Type: {selectedType}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType('all')} />
            </Badge>
          )}
          {selectedStyle !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Style: {selectedStyle}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedStyle('all')} />
            </Badge>
          )}
          {selectedCulture !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Culture: {selectedCulture}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCulture('all')} />
            </Badge>
          )}
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="gap-1">
              Tag: {tag}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleTagToggle(tag)} />
            </Badge>
          ))}
        </div>
      </div>

      {/* Character Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <Card key={character.id} className="hover:shadow-lg transition-all duration-200 group cursor-pointer relative" onClick={() => handleCharacterClick(character)}>
              {/* Favorite Button */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 left-2 z-10 bg-background/80 hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(character.id);
                }}
              >
                <Star className={`w-4 h-4 ${isFavorite(character.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              </Button>

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
                    <h3 className="font-semibold text-lg truncate">{character.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {character.description}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      {character.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {character.style}
                    </Badge>
                    {character.culture && (
                      <Badge variant="outline" className="text-xs">
                        {character.culture}
                      </Badge>
                    )}
                  </div>

                  {/* Tags (limited) */}
                  <div className="flex flex-wrap gap-1">
                    {character.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {character.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{character.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Animation Count */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {character.animations.length} animations
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
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredCharacters.map((character) => (
            <Card key={character.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => handleCharacterClick(character)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Character Preview */}
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    {character.svgContent ? (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: character.svgContent }}
                      />
                    ) : (
                      <div className="text-2xl opacity-50">
                        {character.type === 'boy' && '👦'}
                        {character.type === 'girl' && '👧'}
                        {character.type === 'man' && '👨'}
                        {character.type === 'woman' && '👩'}
                      </div>
                    )}
                    
                    {/* Availability Badge */}
                    <div className="absolute top-1 right-1">
                      <Badge 
                        variant={character.isAvailable ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {character.isAvailable ? "✓" : "Soon"}
                      </Badge>
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-lg truncate">{character.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {character.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {character.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {character.style}
                          </Badge>
                          {character.culture && (
                            <Badge variant="outline" className="text-xs">
                              {character.culture}
                            </Badge>
                          )}
                          {character.occupation && (
                            <Badge variant="outline" className="text-xs">
                              {character.occupation}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {character.animations.length} animations
                          </span>
                          <span>
                            {character.tags.length} tags
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(character.id);
                          }}
                        >
                          <Star className={`w-4 h-4 ${isFavorite(character.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleCharacterClick(character); }}
                        >
                          {character.isAvailable ? "View Details" : "Notify Me"}
                        </Button>
                        {character.isAvailable && (
                          <Button 
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); handleCharacterClick(character); }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
            onClick={clearAllFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}