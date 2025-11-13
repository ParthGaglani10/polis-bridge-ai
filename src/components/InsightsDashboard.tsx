import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, AlertCircle, CheckCircle2, BarChart } from "lucide-react";

const InsightsDashboard = () => {
  const metrics = [
    {
      label: "Active Policies",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: BarChart
    },
    {
      label: "Communities Reached",
      value: "1.2M",
      change: "+28%",
      trend: "up",
      icon: Users
    },
    {
      label: "Languages Active",
      value: "47",
      change: "+5",
      trend: "up",
      icon: Globe
    },
    {
      label: "Response Rate",
      value: "86%",
      change: "+8%",
      trend: "up",
      icon: TrendingUp
    }
  ];

  const recentInsights = [
    {
      type: "success",
      message: "Transportation policy showing 92% positive sentiment across all demographics",
      icon: CheckCircle2,
      time: "2 hours ago"
    },
    {
      type: "warning",
      message: "Increased misinformation detected regarding education reforms - recommend proactive communication",
      icon: AlertCircle,
      time: "5 hours ago"
    },
    {
      type: "success",
      message: "Healthcare messaging achieved 95% clarity score across 12 language groups",
      icon: CheckCircle2,
      time: "1 day ago"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            Real-Time Analytics
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Insights Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor policy performance and community engagement in real-time
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="p-6 border-border shadow-soft hover:shadow-medium transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-accent border-accent/30">
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Insights */}
        <Card className="p-6 border-border shadow-medium">
          <h3 className="text-xl font-semibold text-foreground mb-6">Recent Insights</h3>
          <div className="space-y-4">
            {recentInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    insight.type === "success" 
                      ? "bg-accent/10 text-accent" 
                      : "bg-secondary/10 text-secondary"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground leading-relaxed mb-1">
                      {insight.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {insight.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default InsightsDashboard;
