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
      category: "GDP Impact",
      score: 82,
      sentiment: "Positive Growth",
      icon: TrendingUp,
      color: "text-accent",
      detail: "Projected 0.8% increase in GDP over 3 years"
    },
    {
      category: "Employment Generation",
      score: 67,
      sentiment: "Good Potential",
      icon: CheckCircle,
      color: "text-accent",
      detail: "Expected to create 2.3 million direct jobs"
    },
    {
      category: "Rural Impact",
      score: 75,
      sentiment: "High Positive",
      icon: TrendingUp,
      color: "text-secondary",
      detail: "Benefits 150+ million rural households"
    },
    {
      category: "Implementation Cost",
      score: 45,
      sentiment: "Moderate",
      icon: AlertTriangle,
      color: "text-secondary",
      detail: "₹85,000 crores over 5 years"
    },
    {
      category: "Public Support",
      score: 78,
      sentiment: "Strong",
      icon: CheckCircle,
      color: "text-accent",
      detail: "72% approval in preliminary surveys"
    },
    {
      category: "Social Equity",
      score: 71,
      sentiment: "Positive",
      icon: TrendingUp,
      color: "text-accent",
      detail: "Reduces income inequality by 12%"
    },
    {
      category: "Misinformation Risk",
      score: 38,
      sentiment: "Manageable",
      icon: AlertTriangle,
      color: "text-secondary",
      detail: "Medium risk in 8 states, mitigation needed"
    },
    {
      category: "Regional Disparities",
      score: 52,
      sentiment: "Needs Attention",
      icon: AlertTriangle,
      color: "text-secondary",
      detail: "Northern states may lag in implementation"
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
            Simulate Policy Impact in India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze economic, social, and regional impacts of policy proposals across Indian states
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
              placeholder="Enter your policy proposal here... For example: 'Expand PM-KISAN to include tenant farmers and provide ₹8,000 per year...'"
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
          <Card className="p-6 border-border shadow-soft overflow-hidden">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Predicted Outcomes Across India
            </h3>

            {!showResults ? (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Results will appear here after analysis</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
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
                      <p className="text-xs text-muted-foreground mb-3">{result.detail}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Impact Score</span>
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

                <div className="mt-6 p-5 bg-gradient-to-r from-accent/5 to-secondary/5 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong className="text-accent">📊 AI Analysis Summary:</strong> This policy demonstrates strong potential for economic growth with positive GDP impact (+0.8%) and substantial employment generation (2.3M jobs). Rural impact is particularly strong, benefiting 150M+ households. Key considerations include managing implementation costs (₹85K crores) and addressing regional disparities in northern states. Misinformation risk is manageable with targeted communication strategies. Overall public support is strong at 72% approval.
                  </p>
                  <div className="mt-4 pt-4 border-t border-accent/20">
                    <p className="text-xs text-muted-foreground">
                      <strong>Recommendation:</strong> Proceed with phased rollout starting in high-readiness states. Establish dedicated communication cells in high-risk regions. Monitor implementation monthly with real-time dashboards.
                    </p>
                  </div>
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
