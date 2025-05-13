-- Add application_url to jobs table
ALTER TABLE jobs 
ADD COLUMN application_url TEXT;

-- Add comment to explain column usage
COMMENT ON COLUMN jobs.application_url IS 'URL where candidates can apply for the job';
