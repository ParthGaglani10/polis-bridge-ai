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

    console.log("Analyzing policy:", policyText.substring(0, 100));

    const systemPrompt = `You are an expert policy analyst for India. Your role is to analyze proposed policies and provide comprehensive, realistic impact assessments.

IMPORTANT: First, validate if the input is a genuine policy proposal. If the input is gibberish, nonsensical, or not a real policy, respond with: {"valid": false, "reason": "Input does not appear to be a valid policy proposal"}

For valid policies, provide detailed analysis in the following JSON structure:
{
  "valid": true,
  "narrative": "A compelling 2-3 paragraph story explaining the policy's impact in simple, human terms. Focus on real people and communities affected.",
  "targetDemographic": {
    "primary": "Main beneficiaries",
    "secondary": "Indirect beneficiaries",
    "affected": "Those negatively impacted"
  },
  "economicImpact": {
    "gdpChange": number (percentage change, can be negative),
    "jobsCreated": number (can be negative for job losses),
    "sectorsAffected": [
      {"name": "Sector name", "impact": number (percentage), "description": "Brief explanation"}
    ],
    "fiscalCost": "Cost in crores",
    "timeframe": "Short/Medium/Long term"
  },
  "socialImpact": {
    "educationAccess": number (percentage change),
    "healthcareAccess": number (percentage change),
    "incomeInequality": number (change in Gini coefficient),
    "socialMobility": "Improved/Neutral/Reduced"
  },
  "regionalImpact": [
    {"state": "State name", "impact": "High/Medium/Low", "description": "Specific impact"}
  ],
  "unintendedConsequences": [
    {"consequence": "Description", "severity": "High/Medium/Low", "mitigation": "How to address"}
  ],
  "beneficiaries": [
    {"group": "Demographic group", "benefit": "Specific benefit", "magnitude": "High/Medium/Low"}
  ],
  "risks": [
    {"risk": "Description", "probability": "High/Medium/Low", "impact": "Description"}
  ],
  "implementation": {
    "complexity": "High/Medium/Low",
    "timeline": "Duration",
    "keyStakeholders": ["List of stakeholders"],
    "criticalFactors": ["Success factors"]
  },
  "recommendations": [
    "Actionable recommendation 1",
    "Actionable recommendation 2"
  ]
}

Base your analysis on:
- India's current economic conditions
- Regional disparities
- Demographic distribution
- Historical policy outcomes
- International best practices adapted to Indian context`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this policy proposal for India:\n\n${policyText}` }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log("AI Response:", analysisText);

    // Extract JSON from the response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from AI response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in policy-analysis function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
