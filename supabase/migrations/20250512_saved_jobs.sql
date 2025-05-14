-- Create saved_jobs table
CREATE TABLE saved_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_job UNIQUE (user_id, job_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own saved jobs" ON saved_jobs
  FOR SELECT USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can save jobs" ON saved_jobs
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own saved jobs" ON saved_jobs
  FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- Create index for common queries
CREATE INDEX idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX idx_saved_jobs_job_id ON saved_jobs(job_id);
