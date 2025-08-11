"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  Code, 
  Palette, 
  Zap, 
  Users, 
  Download, 
  Github, 
  Search,
  ChevronRight,
  Star,
  Clock,
  FileText,
  Video,
  Image,
  Settings,
  Database,
  Globe,
  Heart,
  Shield
} from "lucide-react";
import Link from "next/link";

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const documentationSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Quick start guide to begin using the Universal Character Library",
      icon: BookOpen,
      category: "basics",
      difficulty: "beginner",
      readTime: "5 min",
      content: [
        {
          title: "Installation",
          description: "Learn how to install the library in your project",
          code: `npm install universal-character-library`,
          type: "guide"
        },
        {
          title: "Basic Usage",
          description: "Create and display your first character",
          code: `import { Character } from 'universal-character-library';

const character = new Character({
  id: 'casual-boy',
  container: '#character-container',
  customization: {
    skinTone: '#FDBCB4',
    hairColor: '#8B4513'
  }
});

character.play('idle');`,
          type: "example"
        }
      ]
    },
    {
      id: "character-types",
      title: "Character Types",
      description: "Explore the different types of characters available in the library",
      icon: Users,
      category: "characters",
      difficulty: "beginner",
      readTime: "8 min",
      content: [
        {
          title: "Age Groups",
          description: "Children, adults, and elderly characters",
          type: "info"
        },
        {
          title: "Cultural Diversity",
          description: "Characters from various cultural backgrounds",
          type: "info"
        },
        {
          title: "Body Types",
          description: "Different body shapes and sizes",
          type: "info"
        }
      ]
    },
    {
      id: "animations",
      title: "Animation System",
      description: "Comprehensive guide to character animations and controls",
      icon: Zap,
      category: "animations",
      difficulty: "intermediate",
      readTime: "12 min",
      content: [
        {
          title: "Basic Animations",
          description: "Idle, walking, running, and jumping animations",
          code: `character.play('walk');
character.play('run');
character.play('jump');`,
          type: "example"
        },
        {
          title: "Emotional Animations",
          description: "Happy, sad, angry, and surprised expressions",
          type: "info"
        },
        {
          title: "Animation Controls",
          description: "Play, pause, stop, and speed control",
          code: `character.play('dance');
character.pause();
character.stop();
character.setAnimationSpeed(1.5);`,
          type: "example"
        }
      ]
    },
    {
      id: "customization",
      title: "Customization",
      description: "Learn how to customize character appearance and properties",
      icon: Palette,
      category: "customization",
      difficulty: "intermediate",
      readTime: "15 min",
      content: [
        {
          title: "Appearance Customization",
          description: "Skin tone, hair color, and clothing options",
          code: `character.setCustomization({
  skinTone: '#FDBCB4',
  hairColor: '#8B4513',
  clothing: {
    top: 't-shirt',
    bottom: 'jeans'
  }
});`,
          type: "example"
        },
        {
          title: "Color Themes",
          description: "Pre-defined color schemes and themes",
          type: "info"
        },
        {
          title: "Accessories and Props",
          description: "Add accessories and props to characters",
          type: "info"
        }
      ]
    },
    {
      id: "framework-integration",
      title: "Framework Integration",
      description: "Integrate the library with popular frontend frameworks",
      icon: Code,
      category: "integration",
      difficulty: "intermediate",
      readTime: "10 min",
      content: [
        {
          title: "React Integration",
          description: "Using the library with React components",
          code: `import { Character } from 'universal-character-library';
import { useEffect, useRef } from 'react';

function ReactCharacter() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const character = new Character({
      container: containerRef.current,
      // ... options
    });
    
    return () => character.destroy();
  }, []);
  
  return <div ref={containerRef} />;
}`,
          type: "example"
        },
        {
          title: "Vue Integration",
          description: "Using the library with Vue.js",
          type: "info"
        },
        {
          title: "Next.js Integration",
          description: "Server-side rendering with Next.js",
          type: "info"
        }
      ]
    },
    {
      id: "performance",
      title: "Performance Optimization",
      description: "Optimize character performance for large-scale applications",
      icon: Database,
      category: "advanced",
      difficulty: "advanced",
      readTime: "8 min",
      content: [
        {
          title: "Memory Management",
          description: "Efficient memory usage for multiple characters",
          type: "info"
        },
        {
          title: "Animation Performance",
          description: "Optimize animation rendering and playback",
          code: `// Enable hardware acceleration
character.enableHardwareAcceleration();

// Use sprite sheets for better performance
character.useSpriteSheets(true);

// Optimize for mobile devices
character.optimizeForMobile();`,
          type: "example"
        },
        {
          title: "Lazy Loading",
          description: "Load characters on demand",
          type: "info"
        }
      ]
    },
    {
      id: "accessibility",
      title: "Accessibility",
      description: "Build inclusive character experiences with accessibility features",
      icon: Shield,
      category: "advanced",
      difficulty: "intermediate",
      readTime: "6 min",
      content: [
        {
          title: "ARIA Labels",
          description: "Proper ARIA labeling for screen readers",
          code: `const character = new Character({
  container: '#character-container',
  ariaLabel: 'Animated character demonstrating walking animation',
  ariaLive: 'polite'
});`,
          type: "example"
        },
        {
          title: "Keyboard Navigation",
          description: "Keyboard controls for character interaction",
          type: "info"
        },
        {
          title: "Motion Reduction",
          description: "Respect user's motion preferences",
          type: "info"
        }
      ]
    }
  ];

  const filteredSections = documentationSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: "all", label: "All Topics" },
    { value: "basics", label: "Basics" },
    { value: "characters", label: "Characters" },
    { value: "animations", label: "Animations" },
    { value: "customization", label: "Customization" },
    { value: "integration", label: "Integration" },
    { value: "advanced", label: "Advanced" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Universal Character Library Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guides, API references, and examples to help you integrate 
              and customize the Universal Character Library in your projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gap-2">
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Library
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Documentation Topics</h2>
              <p className="text-muted-foreground">
                {filteredSections.length} {filteredSections.length === 1 ? "topic" : "topics"} found
              </p>
            </div>

            <div className="space-y-6">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card key={section.id} className="hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl">{section.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {section.description}
                            </CardDescription>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge variant="outline" className={getDifficultyColor(section.difficulty)}>
                                {section.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {section.readTime}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="examples">Examples</TabsTrigger>
                          <TabsTrigger value="api">API</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="mt-4">
                          <div className="space-y-3">
                            {section.content
                              .filter(item => item.type === "info")
                              .map((item, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <div>
                                    <h4 className="font-medium">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="examples" className="mt-4">
                          <div className="space-y-3">
                            {section.content
                              .filter(item => item.type === "example")
                              .map((item, index) => (
                                <div key={index} className="space-y-2">
                                  <h4 className="font-medium">{item.title}</h4>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                  <div className="bg-muted p-3 rounded-md">
                                    <pre className="text-sm overflow-x-auto">
                                      <code>{item.code}</code>
                                    </pre>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="api" className="mt-4">
                          <div className="space-y-3">
                            <div className="text-sm text-muted-foreground">
                              API reference for {section.title.toLowerCase()} functionality.
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                              <FileText className="w-4 h-4" />
                              View Full API Reference
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Start */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Get started in minutes with these quick steps:
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>Install the library</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>Import Character class</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>Create and customize</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span>Add animations</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Start Tutorial
                </Button>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Getting Started", "Basic Animations", "React Integration", "Customization"].map((topic, index) => (
                  <Link key={index} href="#" className="block">
                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors">
                      <span className="text-sm">{topic}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="#" className="block">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                    <Video className="w-4 h-4" />
                    <span className="text-sm">Video Tutorials</span>
                  </div>
                </Link>
                <Link href="#" className="block">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                    <Image className="w-4 h-4" />
                    <span className="text-sm">Examples Gallery</span>
                  </div>
                </Link>
                <Link href="#" className="block">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub Repository</span>
                  </div>
                </Link>
                <Link href="#" className="block">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Community Support</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}