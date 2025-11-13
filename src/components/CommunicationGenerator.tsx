import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Globe, Users, Wand2 } from "lucide-react";

const CommunicationGenerator = () => {
  const [audience, setAudience] = useState("");
  const [language, setLanguage] = useState("");
  const [generated, setGenerated] = useState(false);

  const generateMessage = () => {
    setGenerated(true);
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-4">
            AI Communication
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Generate Targeted Messages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create personalized, culturally-aware communications for diverse communities
          </p>
        </div>

        <Card className="p-8 border-border shadow-medium max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Audience Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Users className="w-4 h-4" />
                Target Audience
              </label>
              <Select onValueChange={setAudience} value={audience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Public</SelectItem>
                  <SelectItem value="business">Business Community</SelectItem>
                  <SelectItem value="youth">Youth & Students</SelectItem>
                  <SelectItem value="seniors">Senior Citizens</SelectItem>
                  <SelectItem value="rural">Rural Communities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Globe className="w-4 h-4" />
                Language
              </label>
              <Select onValueChange={setLanguage} value={language}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={generateMessage}
            disabled={!audience || !language}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mb-6"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Communication
          </Button>

          {/* Generated Message */}
          {generated && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-6 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Generated Message</h4>
                </div>
                <p className="text-foreground leading-relaxed">
                  Dear Community Members,
                  <br /><br />
                  We are pleased to announce a new initiative that will benefit our community. This program has been 
                  designed with your needs in mind, taking into account feedback from local stakeholders and ensuring 
                  inclusive access for all residents.
                  <br /><br />
                  Key benefits include improved services, enhanced accessibility, and greater community engagement 
                  opportunities. We believe this initiative will create lasting positive impact for everyone.
                  <br /><br />
                  Your feedback and participation are valued. Please reach out with any questions or suggestions.
                  <br /><br />
                  Best regards,<br />
                  Your Local Government Team
                </p>
              </div>

              {/* Message Analysis */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">92%</div>
                  <div className="text-sm text-muted-foreground">Clarity Score</div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">A+</div>
                  <div className="text-sm text-muted-foreground">Accessibility</div>
                </div>
                <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <div className="text-2xl font-bold text-secondary mb-1">High</div>
                  <div className="text-sm text-muted-foreground">Engagement</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default CommunicationGenerator;
