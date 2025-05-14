-- Create resumes table
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_resume UNIQUE (user_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Policy: only the resume owner can view
CREATE POLICY "Users can view their own resumes" ON resumes
  FOR SELECT USING ((SELECT auth.uid()) = user_id);

-- Policy: only authenticated users can create their own resume
CREATE POLICY "Users can create their own resume" ON resumes
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

-- Policy: only the resume owner can update
CREATE POLICY "Users can update their own resume" ON resumes
  FOR UPDATE USING ((SELECT auth.uid()) = user_id);

-- Policy: only the resume owner can delete
CREATE POLICY "Users can delete their own resume" ON resumes
  FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function before update
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON resumes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
