import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  FileText, 
  Lightbulb, 
  Users, 
  Activity, 
  ExternalLink, 
  Shuffle,
  TrendingUp 
} from "lucide-react";
import { dashboardData, addRecentActivity } from "@/data/dashboardData";
import { getRandomFacts } from "@/data/facts";

export default function Dashboard() {
  const [data, setData] = useState(dashboardData);
  const [randomFact, setRandomFact] = useState(null);

  useEffect(() => {
    // Load a random fact on component mount
    const facts = getRandomFacts(1);
    setRandomFact(facts[0]);
  }, []);

  const shufflePreviewFact = () => {
    const facts = getRandomFacts(1);
    setRandomFact(facts[0]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-green-400';
      case 'under-review': return 'text-yellow-400';
      case 'new': return 'text-blue-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Research Dashboard
          </h1>
          <p className="text-muted-foreground">
            Quick overview of Mars research content and site activity
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          
          {/* Articles Summary Widget */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Articles Summary</CardTitle>
              <FileText className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-display font-bold text-accent">
                    {data.articles.total}
                  </span>
                  <span className="text-sm text-muted-foreground">Total Articles</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-foreground font-medium">{data.articles.published}</div>
                    <div className="text-muted-foreground">Published</div>
                  </div>
                  <div>
                    <div className="text-foreground font-medium">{data.articles.drafts}</div>
                    <div className="text-muted-foreground">Drafts</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {data.articles.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="ghost" className="w-full btn-secondary mt-4" asChild>
                  <a href="/">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View All Articles
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Facts Status Widget */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Mars Facts</CardTitle>
              <Lightbulb className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-display font-bold text-accent">
                    {data.facts.total}
                  </span>
                  <span className="text-sm text-muted-foreground">Available Facts</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Last updated: {data.facts.lastUpdated}
                </div>

                {randomFact && (
                  <div className="bg-secondary/20 border border-border rounded-lg p-3 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {randomFact.category}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={shufflePreviewFact}
                        className="h-6 w-6 p-0"
                      >
                        <Shuffle className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {randomFact.fact}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contributions Pipeline Widget */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Contributions Pipeline</CardTitle>
              <Users className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-display font-bold text-accent">
                    {data.contributions.total}
                  </span>
                  <span className="text-sm text-muted-foreground">Total Contributions</span>
                </div>

                <div className="space-y-3">
                  {Object.entries(data.contributions.byStatus).map(([status, count]: [string, number]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(status).replace('text-', 'bg-')}`} />
                        <span className="text-sm capitalize">{status.replace('-', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(count / data.contributions.total) * 100} 
                          className="w-16 h-2"
                        />
                        <span className="text-sm font-medium w-6">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="w-full btn-secondary mt-4" asChild>
                  <a href="/contributions">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Submit Contribution
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Widget */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              <Activity className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.details}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simple Charts Section */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          
          {/* Contributions Chart */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Contributions Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                  {data.charts.contributionsOverTime.map((item, index) => (
                    <div key={item.month} className="flex items-center gap-4">
                      <span className="text-sm font-mono w-8">{item.month}</span>
                      <div className="flex-1 bg-secondary/20 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-accent h-full transition-all duration-500 ease-out"
                          style={{ 
                            width: `${(item.count / Math.max(...data.charts.contributionsOverTime.map((d: any) => d.count))) * 100}%`,
                            transitionDelay: `${index * 100}ms`
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-6">{item.count}</span>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>

          {/* Articles by Category Chart */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Articles by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                  {data.charts.articlesByCategory.map((item, index) => (
                    <div key={item.category} className="flex items-center gap-4">
                      <span className="text-sm font-mono w-20 truncate">{item.category}</span>
                      <div className="flex-1 bg-secondary/20 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-accent h-full transition-all duration-500 ease-out"
                          style={{ 
                            width: `${(item.count / Math.max(...data.charts.articlesByCategory.map((d: any) => d.count))) * 100}%`,
                            transitionDelay: `${index * 100}ms`
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-6">{item.count}</span>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}