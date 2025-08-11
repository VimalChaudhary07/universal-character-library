import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Download, Palette, Zap, Code, Users, BarChart3 } from "lucide-react";
import Link from "next/link";
import CharacterGallery from "@/components/CharacterGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Open Source Character Library
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Universal Character Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The world's most comprehensive collection of 1000+ diverse animated 2D characters with 500+ unique animations. 
              Built with SVG, CSS, and JavaScript for maximum flexibility and performance.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="gap-2">
              <Github className="w-5 h-5" />
              View on GitHub
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download Library
            </Button>
            <Link href="/performance">
              <Button variant="outline" size="lg" className="gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive character library with powerful customization and animation capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Advanced Customization</CardTitle>
              <CardDescription>
                13 skin tones, 20+ hairstyles, 30+ hair colors, cultural attire, and comprehensive accessory system
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>500+ Unique Animations</CardTitle>
              <CardDescription>
                Extensive animation library including emotions, actions, cultural animations, and style-specific movements
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Easy Integration</CardTitle>
              <CardDescription>
                Works with HTML/CSS/JS, React, Vue, and as native Web Components
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>1000+ Diverse Characters</CardTitle>
              <CardDescription>
                Multiple character types: boy, girl, man, woman with various cultures, body types, and backgrounds
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <CardTitle>SVG Based</CardTitle>
              <CardDescription>
                Scalable vector graphics with CSS styling and optional Lottie JSON support
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <CardTitle>Accessible</CardTitle>
              <CardDescription>
                Built with accessibility in mind, supporting ARIA labels and motion reduction preferences
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Character Gallery Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50 rounded-2xl mx-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Character Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of characters and customize them to fit your project needs
          </p>
        </div>

        <CharacterGallery />
      </section>

      {/* Getting Started Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Getting Started</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start using the Character Library in your project in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">1. Install</CardTitle>
              <CardDescription>
                Add the library to your project via npm or CDN
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                npm install character-library
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">2. Import</CardTitle>
              <CardDescription>
                Import characters and animations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                import &#123; Character &#125; from 'character-library'
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">3. Customize</CardTitle>
              <CardDescription>
                Use the API to customize and animate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                character.setColors(&#123;&#125;)<br/>
                character.play('walk')
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Open Source Character Library • Built with ❤️ for the developer community
          </p>
        </div>
      </footer>
    </div>
  );
}