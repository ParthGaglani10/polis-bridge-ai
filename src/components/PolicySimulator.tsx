import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

const PolicySimulator = () => {
  const [policyText, setPolicyText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const results = [
    {
      category: "Public Reception",
      score: 78,
      sentiment: "Positive",
      icon: TrendingUp,
      color: "text-accent"
    },
    {
      category: "Implementation Risk",
      score: 35,
      sentiment: "Low",
      icon: CheckCircle,
      color: "text-accent"
    },
    {
      category: "Misinformation Risk",
      score: 42,
      sentiment: "Medium",
      icon: AlertTriangle,
      color: "text-secondary"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            Policy Analysis
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simulate Policy Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter a policy proposal to predict community responses and identify potential challenges
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 border-border shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Policy Input</h3>
            </div>
            
            <Textarea
              placeholder="Enter your policy proposal here... For example: 'New infrastructure development plan for urban transportation...'"
              className="min-h-[200px] mb-4 resize-none"
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
            />

            <Button
              onClick={simulateAnalysis}
              disabled={!policyText || isAnalyzing}
              className="w-full bg-primary hover:bg-primary-glow text-primary-foreground"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Policy...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze Policy
                </>
              )}
            </Button>
          </Card>

          {/* Results Section */}
          <Card className="p-6 border-border shadow-soft">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Predicted Outcomes
            </h3>

            {!showResults ? (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Results will appear here after analysis</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => {
                  const Icon = result.icon;
                  return (
                    <div 
                      key={index}
                      className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${result.color}`} />
                          <span className="font-medium text-foreground">{result.category}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {result.sentiment}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Score</span>
                          <span className="font-semibold text-foreground">{result.score}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                            style={{ width: `${result.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>AI Recommendation:</strong> This policy shows positive public reception with manageable risks. 
                    Consider addressing medium-level misinformation concerns through targeted communication campaigns.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

const BarChart3 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18"/>
    <path d="M18 17V9"/>
    <path d="M13 17V5"/>
    <path d="M8 17v-3"/>
  </svg>
);

export default PolicySimulator;
