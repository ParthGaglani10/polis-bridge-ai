import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageSquare, BarChart3, Globe, Shield, Zap } from "lucide-react";
import multiAgentImage from "@/assets/multi-agent-network.jpg";

const agents = [
  {
    name: "Communication Agent",
    icon: MessageSquare,
    description: "Crafts personalized, culturally-aware messages for diverse audiences",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    name: "Prediction Agent",
    icon: BarChart3,
    description: "Simulates community responses and identifies potential challenges",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    name: "Translation Agent",
    icon: Globe,
    description: "Ensures accurate multilingual communication across 150+ languages",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    name: "Analysis Agent",
    icon: Brain,
    description: "Provides actionable insights with trusted sources and data",
    color: "text-primary-glow",
    bgColor: "bg-primary/10"
  },
  {
    name: "Security Agent",
    icon: Shield,
    description: "Maintains privacy protections and ethical AI standards",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    name: "Misinformation Agent",
    icon: Zap,
    description: "Detects and addresses potential misinformation risks",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  }
];

const MultiAgentSystem = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-4">
            Multi-Agent Architecture
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Collaborative AI Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six specialized AI agents work together seamlessly to bridge communication gaps and support effective policy-making
          </p>
        </div>

        {/* Visual Network */}
        <div className="mb-16 relative">
          <div className="max-w-md mx-auto">
            <img 
              src={multiAgentImage} 
              alt="Multi-Agent Network" 
              className="w-full h-auto rounded-2xl shadow-medium"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <Card 
                key={index}
                className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border bg-card backdrop-blur-sm"
              >
                <div className={`w-12 h-12 ${agent.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${agent.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {agent.name}
                </h3>
                <p className="text-muted-foreground">
                  {agent.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Connection Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-6 py-3 rounded-full border border-primary/20">
            <div className="flex -space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse animation-delay-200" />
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse animation-delay-400" />
            </div>
            <span className="text-sm font-medium text-foreground">
              All agents synchronized and operational
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiAgentSystem;
