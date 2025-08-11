"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Users, 
  Palette, 
  Download, 
  Code, 
  BarChart3, 
  TrendingUp,
  Award,
  Star,
  Globe,
  Heart,
  Sparkles
} from "lucide-react";

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState({
    totalCharacters: 1000,
    totalAnimations: 500,
    loadTime: 0,
    memoryUsage: 0,
    fps: 60,
    activeUsers: 0
  });

  useEffect(() => {
    // Simulate real-time metrics
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        loadTime: Math.random() * 100 + 50,
        memoryUsage: Math.random() * 50 + 25,
        fps: Math.floor(Math.random() * 10) + 55,
        activeUsers: Math.floor(Math.random() * 100) + 50
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const performanceData = [
    { label: "Load Time", value: `${metrics.loadTime.toFixed(1)}ms`, target: "< 100ms", status: metrics.loadTime < 100 ? "excellent" : "good" },
    { label: "Memory Usage", value: `${metrics.memoryUsage.toFixed(1)}MB`, target: "< 50MB", status: metrics.memoryUsage < 50 ? "excellent" : "good" },
    { label: "Frame Rate", value: `${metrics.fps} FPS`, target: "> 60 FPS", status: metrics.fps >= 60 ? "excellent" : "good" },
    { label: "Active Users", value: metrics.activeUsers, target: "Growing", status: "excellent" }
  ];

  const libraryStats = [
    { icon: Users, label: "Total Characters", value: "1000+", description: "Diverse character library" },
    { icon: Zap, label: "Animations", value: "500+", description: "Unique animations and motions" },
    { icon: Palette, label: "Customization", value: "13+", description: "Skin tones and color options" },
    { icon: Globe, label: "Cultures", value: "6+", description: "Cultural representations" },
    { icon: Heart, label: "Body Types", value: "8+", description: "Diverse body types" },
    { icon: Sparkles, label: "Styles", value: "7+", description: "Character styles and themes" }
  ];

  const recentActivity = [
    { action: "New character added", character: "Fantasy Warrior", time: "2 minutes ago" },
    { action: "Animation updated", character: "Dance Sequence", time: "5 minutes ago" },
    { action: "Customization enhanced", character: "Cultural Outfits", time: "10 minutes ago" },
    { action: "Performance optimized", character: "Rendering System", time: "15 minutes ago" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Performance Dashboard</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-time metrics and insights for the Universal Character Library
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceData.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                Target: {metric.target}
              </p>
              <Badge 
                variant={metric.status === "excellent" ? "default" : "secondary"}
                className="mt-2"
              >
                {metric.status === "excellent" ? "Excellent" : "Good"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Library Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Library Statistics
          </CardTitle>
          <CardDescription>
            Comprehensive overview of the Universal Character Library capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="flex-shrink-0">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Real-time performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Load Time</span>
                <span>{metrics.loadTime.toFixed(1)}ms</span>
              </div>
              <Progress value={Math.min((metrics.loadTime / 100) * 100, 100)} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Memory Usage</span>
                <span>{metrics.memoryUsage.toFixed(1)}MB</span>
              </div>
              <Progress value={Math.min((metrics.memoryUsage / 50) * 100, 100)} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Frame Rate</span>
                <span>{metrics.fps} FPS</span>
              </div>
              <Progress value={(metrics.fps / 60) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and improvements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.character}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Key Features
          </CardTitle>
          <CardDescription>
            Core capabilities of the Universal Character Library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="customization" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="customization">Customization</TabsTrigger>
              <TabsTrigger value="animations">Animations</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customization" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Appearance</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 13 skin tone variations</li>
                    <li>• 20+ hairstyle options</li>
                    <li>• 30+ hair color choices</li>
                    <li>• 8 body type variations</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Clothing & Accessories</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 7 different styles</li>
                    <li>• 50+ accessories</li>
                    <li>• 40+ props</li>
                    <li>• 30+ footwear options</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="animations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Basic Animations</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Walking, running, jumping</li>
                    <li>• Sitting, standing, lying down</li>
                    <li>• Idle variations</li>
                    <li>• Environmental interactions</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Advanced Animations</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Emotional expressions</li>
                    <li>• Dance and performance</li>
                    <li>• Combat and action</li>
                    <li>• Cultural animations</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Optimization</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Efficient SVG rendering</li>
                    <li>• CSS-based animations</li>
                    <li>• Memory management</li>
                    <li>• Lazy loading support</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Scalability</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 1000+ characters support</li>
                    <li>• Large dataset handling</li>
                    <li>• Batch processing</li>
                    <li>• Progressive loading</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="integration" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Framework Support</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• React components</li>
                    <li>• Vue.js integration</li>
                    <li>• Next.js support</li>
                    <li>• Vanilla JavaScript</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">API Features</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• RESTful API</li>
                    <li>• WebSocket support</li>
                    <li>• Real-time updates</li>
                    <li>• Event system</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Get Started
          </CardTitle>
          <CardDescription>
            Start using the Universal Character Library in your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Library
            </Button>
            <Button variant="outline" className="flex-1">
              <Code className="w-4 h-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}