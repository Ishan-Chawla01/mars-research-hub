import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Send, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { addRecentActivity, updateContributionStats } from "@/data/dashboardData";

const contributionCategories = [
  "Article",
  "Data",
  "Code",
  "Visualization",
  "Analysis"
];

export default function Contributions() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affiliation: "",
    title: "",
    category: "",
    abstract: "",
    links: "",
    consent: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentContributions, setRecentContributions] = useState([]);
  const { toast } = useToast();

  // Load saved drafts and recent contributions from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('mars-hub-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...draft }));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }

    const savedContributions = localStorage.getItem('mars-hub-contributions');
    if (savedContributions) {
      try {
        const contributions = JSON.parse(savedContributions);
        setRecentContributions(contributions);
      } catch (error) {
        console.error('Error loading contributions:', error);
      }
    }
  }, []);

  // Auto-save draft to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title || formData.abstract) {
        localStorage.setItem('mars-hub-draft', JSON.stringify(formData));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";
    if (!formData.consent) newErrors.consent = "Consent is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create contribution object
    const contribution = {
      ...formData,
      id: Date.now(),
      status: "new",
      submittedAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    const existingContributions = JSON.parse(
      localStorage.getItem('mars-hub-contributions') || '[]'
    );
    const updatedContributions = [contribution, ...existingContributions].slice(0, 10);
    localStorage.setItem('mars-hub-contributions', JSON.stringify(updatedContributions));
    setRecentContributions(updatedContributions);

    // Add to recent activity
    addRecentActivity({
      action: "New contribution submitted",
      details: `${formData.title} by ${formData.name}`,
      timestamp: "Just now"
    });

    // Update contribution stats
    updateContributionStats("new");

    // Clear form and draft
    setFormData({
      name: "",
      email: "",
      affiliation: "",
      title: "",
      category: "",
      abstract: "",
      links: "",
      consent: false
    });
    localStorage.removeItem('mars-hub-draft');

    setIsSubmitting(false);

    toast({
      title: "Contribution Submitted!",
      description: "Your contribution has been added to the review queue.",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'under-review': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'new': return <AlertCircle className="h-4 w-4 text-blue-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'under-review': return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      case 'new': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Submit Contribution
          </h1>
          <p className="text-muted-foreground">
            Share your research, data, or code with the Mars research community
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Contribution Details</CardTitle>
                <CardDescription>
                  Fill out the form below to submit your contribution to the Mars Research Hub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-medium text-foreground">
                      Personal Information
                    </h3>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={errors.name ? 'border-destructive' : ''}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={errors.email ? 'border-destructive' : ''}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="affiliation">Affiliation</Label>
                      <Input
                        id="affiliation"
                        value={formData.affiliation}
                        onChange={(e) => handleInputChange('affiliation', e.target.value)}
                        placeholder="University, Institution, or Organization"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Contribution Details */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-medium text-foreground">
                      Contribution Details
                    </h3>
                    
                    <div>
                      <Label htmlFor="title">Contribution Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={errors.title ? 'border-destructive' : ''}
                        placeholder="Brief descriptive title"
                      />
                      {errors.title && (
                        <p className="text-sm text-destructive mt-1">{errors.title}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select contribution type" />
                        </SelectTrigger>
                        <SelectContent>
                          {contributionCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive mt-1">{errors.category}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="abstract">Abstract *</Label>
                      <Textarea
                        id="abstract"
                        value={formData.abstract}
                        onChange={(e) => handleInputChange('abstract', e.target.value)}
                        className={`min-h-32 ${errors.abstract ? 'border-destructive' : ''}`}
                        placeholder="Provide a detailed description of your contribution, methodology, and key findings..."
                      />
                      {errors.abstract && (
                        <p className="text-sm text-destructive mt-1">{errors.abstract}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="links">Related Links</Label>
                      <Textarea
                        id="links"
                        value={formData.links}
                        onChange={(e) => handleInputChange('links', e.target.value)}
                        className="min-h-20"
                        placeholder="Links to repositories, datasets, publications, etc. (one per line)"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Consent */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleInputChange('consent', checked)}
                        className={errors.consent ? 'border-destructive' : ''}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="consent"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I consent to share this contribution *
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          By checking this box, you agree to share your contribution with the Mars research community under open science principles.
                        </p>
                      </div>
                    </div>
                    {errors.consent && (
                      <p className="text-sm text-destructive">{errors.consent}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Contribution
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Privacy Notice */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Privacy Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription className="text-sm">
                    All data is stored locally in your browser until a backend system is implemented. 
                    Your information is private and secure.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Recent Contributions */}
            {recentContributions.length > 0 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Your Recent Contributions</CardTitle>
                  <CardDescription>
                    Contributions submitted from this browser
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentContributions.slice(0, 5).map((contribution) => (
                      <div key={contribution.id} className="border border-border rounded-lg p-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-medium text-sm text-foreground line-clamp-1">
                            {contribution.title}
                          </h4>
                          {getStatusIcon(contribution.status)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getStatusColor(contribution.status)}`}
                          >
                            {contribution.status.replace('-', ' ')}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {contribution.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {contribution.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}