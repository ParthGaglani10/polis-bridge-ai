-- Drop trigger first
DROP TRIGGER IF EXISTS update_policy_analyses_updated_at ON public.policy_analyses;

-- Drop and recreate function with proper search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate trigger
CREATE TRIGGER update_policy_analyses_updated_at
BEFORE UPDATE ON public.policy_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on policy_analyses table
ALTER TABLE public.policy_analyses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (no authentication required)
-- Anyone can view policy analyses
CREATE POLICY "Anyone can view policy analyses"
ON public.policy_analyses
FOR SELECT
USING (true);

-- Anyone can create policy analyses
CREATE POLICY "Anyone can create policy analyses"
ON public.policy_analyses
FOR INSERT
WITH CHECK (true);