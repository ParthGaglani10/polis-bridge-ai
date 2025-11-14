import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { policyText } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // First, validate if this is actually a policy or just gibberish
    const validationResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a policy validation assistant. Determine if the given text describes a meaningful policy proposal or is gibberish/nonsense. Return only 'valid' or 'invalid'."
          },
          {
            role: "user",
            content: `Is this a valid policy proposal?\n\n${policyText}`
          }
        ],
      }),
    });

    const validationData = await validationResponse.json();
    const validationResult = validationData.choices[0].message.content.toLowerCase().trim();

    if (validationResult === 'invalid') {
      return new Response(
        JSON.stringify({ 
          error: "Invalid policy input. Please provide a clear policy proposal with specific objectives and implementation details." 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Analyze the policy using AI with structured output
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert policy analyst specializing in Indian policies. Analyze policies for their impact on India's economy, society, and demographics. Provide detailed, realistic analysis with specific numbers and narratives that policymakers can understand.`
          },
          {
            role: "user",
            content: `Analyze this Indian policy proposal in detail:\n\n${policyText}\n\nProvide comprehensive analysis including economic impacts, demographic effects, sectoral changes, and narrative explanations.`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_policy",
              description: "Analyze policy impact across multiple dimensions for India",
              parameters: {
                type: "object",
                properties: {
                  overallNarrative: {
                    type: "string",
                    description: "A compelling 2-3 sentence story about what this policy will achieve and who it helps most"
                  },
                  economicImpact: {
                    type: "object",
                    properties: {
                      gdpChange: { type: "number", description: "Projected GDP change in percentage" },
                      gdpAmount: { type: "string", description: "GDP change in rupees (e.g., ₹2.3 lakh crores)" },
                      narrative: { type: "string", description: "Story explaining the economic impact" }
                    },
                    required: ["gdpChange", "gdpAmount", "narrative"]
                  },
                  employmentImpact: {
                    type: "object",
                    properties: {
                      jobsCreated: { type: "string", description: "Number of jobs (e.g., 2.3 million)" },
                      sectors: { type: "array", items: { type: "string" }, description: "Key sectors affected" },
                      narrative: { type: "string", description: "Story about employment generation" }
                    },
                    required: ["jobsCreated", "sectors", "narrative"]
                  },
                  demographicImpact: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        group: { type: "string", description: "Demographic group (e.g., Rural Farmers, Urban Youth)" },
                        affected: { type: "string", description: "Number affected (e.g., 150 million)" },
                        benefit: { type: "string", description: "Primary benefit they receive" },
                        impactScore: { type: "number", description: "Impact score 0-100" },
                        narrative: { type: "string", description: "How this group specifically benefits" }
                      },
                      required: ["group", "affected", "benefit", "impactScore", "narrative"]
                    }
                  },
                  sectoralImpact: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        sector: { type: "string", description: "Economic sector" },
                        change: { type: "string", description: "Expected change (e.g., +12% growth)" },
                        impactScore: { type: "number", description: "Impact score 0-100" },
                        narrative: { type: "string", description: "What changes in this sector" }
                      },
                      required: ["sector", "change", "impactScore", "narrative"]
                    }
                  },
                  regionalImpact: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        region: { type: "string", description: "Region/State" },
                        impactLevel: { type: "string", enum: ["high", "medium", "low"], description: "Impact level" },
                        impactScore: { type: "number", description: "Impact score 0-100" },
                        narrative: { type: "string", description: "Regional-specific effects" }
                      },
                      required: ["region", "impactLevel", "impactScore", "narrative"]
                    }
                  },
                  positiveOutcomes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        outcome: { type: "string", description: "Positive outcome" },
                        magnitude: { type: "string", description: "Scale of impact" },
                        narrative: { type: "string", description: "Why this matters" }
                      },
                      required: ["outcome", "magnitude", "narrative"]
                    }
                  },
                  challenges: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        challenge: { type: "string", description: "Potential challenge or unintended consequence" },
                        severity: { type: "string", enum: ["low", "medium", "high"], description: "Severity level" },
                        mitigation: { type: "string", description: "Suggested mitigation strategy" },
                        narrative: { type: "string", description: "What could go wrong and how to prevent it" }
                      },
                      required: ["challenge", "severity", "mitigation", "narrative"]
                    }
                  },
                  implementationCost: {
                    type: "object",
                    properties: {
                      amount: { type: "string", description: "Cost in rupees" },
                      timeline: { type: "string", description: "Implementation timeline" },
                      narrative: { type: "string", description: "Cost justification and allocation" }
                    },
                    required: ["amount", "timeline", "narrative"]
                  },
                  spilloverEffects: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        area: { type: "string", description: "Area with spillover effects" },
                        effect: { type: "string", description: "The spillover effect" },
                        narrative: { type: "string", description: "How this creates ripple effects" }
                      },
                      required: ["area", "effect", "narrative"]
                    }
                  },
                  recommendations: {
                    type: "array",
                    items: {
                      type: "string",
                      description: "Actionable recommendation for policymakers"
                    }
                  }
                },
                required: [
                  "overallNarrative",
                  "economicImpact",
                  "employmentImpact",
                  "demographicImpact",
                  "sectoralImpact",
                  "regionalImpact",
                  "positiveOutcomes",
                  "challenges",
                  "implementationCost",
                  "spilloverEffects",
                  "recommendations"
                ],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "analyze_policy" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to analyze policy");
    }

    const data = await response.json();
    const toolCall = data.choices[0].message.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No analysis returned from AI");
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in policy-analysis function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to analyze policy' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
