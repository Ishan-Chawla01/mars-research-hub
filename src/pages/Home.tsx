import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shuffle, ExternalLink, Rocket, Calendar, Tag } from "lucide-react";
import { getRandomFacts } from "@/data/facts";
import { Starfield } from "@/utils/starfield";
import marsHeroImage from "@/assets/mars_hero.jpg";

// Mock articles data
const articlesData = [
  {
    id: 1,
    title: "Perseverance Rover: Sol 1000 Milestone Analysis",
    snippet: "Comprehensive analysis of the first 1000 sols of Perseverance operations on Mars, including major discoveries and geological findings.",
    tags: ["rover", "exploration", "geology"],
    date: "2024-01-15",
    content: "The Perseverance rover has completed over 1000 sols on Mars, marking a significant milestone in our exploration of the Red Planet. During this time, the rover has traveled over 24 kilometers, collected dozens of samples, and made groundbreaking discoveries about Mars' ancient climate and potential for past life. Key findings include evidence of ancient river deltas, organic compounds in rock samples, and confirmation of past water activity in Jezero Crater."
  },
  {
    id: 2,
    title: "Martian Atmospheric Pressure Variations",
    snippet: "Latest research on seasonal atmospheric pressure changes and their impact on weather patterns across different Martian regions.",
    tags: ["atmosphere", "weather", "climate"],
    date: "2024-01-12",
    content: "Recent studies have revealed complex patterns in Martian atmospheric pressure that vary significantly with seasons and geographical location. These variations affect dust storm formation, temperature gradients, and even the performance of our robotic explorers. Understanding these patterns is crucial for future human missions to Mars."
  },
  {
    id: 3,
    title: "Water Ice Mapping: Subsurface Distribution",
    snippet: "New high-resolution maps showing underground water ice deposits across Mars' mid-latitudes using orbital radar data.",
    tags: ["water", "ice", "mapping"],
    date: "2024-01-10",
    content: "Advanced radar mapping has revealed extensive subsurface water ice deposits across Mars' mid-latitudes. These findings suggest that future human missions may have access to water resources for drinking, fuel production, and life support systems. The ice appears to be relatively pure and accessible within a few meters of the surface in many locations."
  }
];

export default function Home() {
  const [randomFacts, setRandomFacts] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const starfieldRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setRandomFacts(getRandomFacts(3));
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      starfieldRef.current = new Starfield(canvasRef.current, {
        numStars: 100,
        speed: 0.3,
        twinkleSpeed: 0.01
      });

      return () => {
        if (starfieldRef.current) {
          starfieldRef.current.destroy();
        }
      };
    }
  }, []);

  const shuffleFacts = () => {
    setRandomFacts(getRandomFacts(3));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Mars Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${marsHeroImage})`
          }}
        />
        
        {/* Starfield Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Hero Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="text-center space-y-6 max-w-4xl mx-auto px-6">
            <h1 className="font-display text-6xl md:text-8xl font-bold text-foreground drop-shadow-2xl">
              Mars Research Hub
            </h1>
            <p className="font-mono text-xl md:text-2xl text-muted max-w-2xl mx-auto">
              Front-end by Bolt AI · Rusty-orange on black
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                className="btn-primary text-lg px-8 py-4"
                asChild
              >
                <a href="/dashboard">
                  <Rocket className="mr-2 h-5 w-5" />
                  Explore Dashboard
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-secondary text-lg px-8 py-4"
                asChild
              >
                <a href="/contributions">
                  Contribute
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Random Mars Facts Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">Random Mars Facts</h2>
            <Button onClick={shuffleFacts} variant="outline" className="btn-secondary">
              <Shuffle className="mr-2 h-4 w-4" />
              Shuffle Facts
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {randomFacts.map((fact) => (
              <Card key={fact.id} className="glass-card group">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-accent" />
                    <Badge variant="secondary" className="text-xs">
                      {fact.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{fact.fact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="py-16 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Latest Research Articles</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articlesData.map((article) => (
              <Card key={article.id} className="glass-card group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {article.date}
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {article.snippet}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="w-full btn-secondary"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Read Article
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="font-display text-xl mb-2">
                          {selectedArticle?.title}
                        </DialogTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Calendar className="h-4 w-4" />
                          {selectedArticle?.date}
                        </div>
                      </DialogHeader>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-foreground leading-relaxed">
                          {selectedArticle?.content}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                          {selectedArticle?.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}