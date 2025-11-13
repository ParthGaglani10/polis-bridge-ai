import Hero from "@/components/Hero";
import MultiAgentSystem from "@/components/MultiAgentSystem";
import PolicySimulator from "@/components/PolicySimulator";
import PolicyChatbot from "@/components/PolicyChatbot";
import CommunicationGenerator from "@/components/CommunicationGenerator";
import InsightsDashboard from "@/components/InsightsDashboard";
import TrustSecurity from "@/components/TrustSecurity";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <MultiAgentSystem />
      <PolicySimulator />
      <PolicyChatbot />
      <CommunicationGenerator />
      <InsightsDashboard />
      <TrustSecurity />
    </div>
  );
};

export default Index;
