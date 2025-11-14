-- Create a table for storing policy analyses
CREATE TABLE public.policy_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  policy_text TEXT NOT NULL,
  analysis_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_policy_analyses_created_at ON public.policy_analyses(created_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_policy_analyses_updated_at
BEFORE UPDATE ON public.policy_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
