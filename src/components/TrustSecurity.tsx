import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, FileCheck, Database, UserCheck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "All communications and data are protected with military-grade encryption"
  },
  {
    icon: Lock,
    title: "Privacy by Design",
    description: "Built with privacy principles at every layer of the architecture"
  },
  {
    icon: Eye,
    title: "Transparent AI",
    description: "Full visibility into AI decision-making processes and data sources"
  },
  {
    icon: FileCheck,
    title: "Compliance Ready",
    description: "Meets GDPR, CCPA, and international data protection standards"
  },
  {
    icon: Database,
    title: "Secure Storage",
    description: "Data sovereignty options with regional data center deployment"
  },
  {
    icon: UserCheck,
    title: "Access Controls",
    description: "Role-based permissions and comprehensive audit trails"
  }
];

const TrustSecurity = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
            Trust & Security
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy & Protection First
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on a foundation of trust with enterprise-grade security and privacy protections
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 border-border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <Card className="p-8 border-border shadow-medium bg-card">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Industry Certified & Audited
              </h3>
              <p className="text-muted-foreground">
                Regular security audits and compliance certifications ensure the highest standards
              </p>
            </div>
            <div className="flex gap-6 flex-wrap justify-center">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
                ISO 27001
              </Badge>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-4 py-2 text-sm">
                SOC 2 Type II
              </Badge>
              <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-2 text-sm">
                GDPR Compliant
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TrustSecurity;
