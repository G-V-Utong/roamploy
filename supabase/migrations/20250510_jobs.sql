-- Create enum for job types
CREATE TYPE job_type_enum AS ENUM ('full-time', 'part-time', 'contract', 'freelance', 'internship');

-- Create jobs table
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  location TEXT NOT NULL,
  job_type job_type_enum NOT NULL,
  salary TEXT, -- Removed NOT NULL constraint
  experience TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  skills TEXT[] NOT NULL DEFAULT '{}',
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  company_description TEXT NOT NULL,
  company_website TEXT,
  company_industry TEXT NOT NULL,
  company_size TEXT NOT NULL,
  applicationemail TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Policy for viewing jobs (anyone can view)
CREATE POLICY "Jobs are viewable by everyone" ON jobs
  FOR SELECT USING (true);

--- Only authenticated users can create jobs
CREATE POLICY "Users can create jobs" ON jobs
  FOR INSERT WITH CHECK ((SELECT auth.role()) = 'authenticated');

-- Only the job creator can update
CREATE POLICY "Users can update their own jobs" ON jobs
  FOR UPDATE USING ((SELECT auth.uid()) = user_id);

-- Only the job creator can delete
CREATE POLICY "Users can delete their own jobs" ON jobs
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
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for common queries
CREATE INDEX idx_jobs_posted_date ON jobs(posted_date DESC);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
