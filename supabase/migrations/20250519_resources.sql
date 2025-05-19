-- Create enum types for event and fair formats
CREATE TYPE event_format AS ENUM ('online', 'in-person', 'hybrid');
CREATE TYPE event_type AS ENUM ('seminar', 'bootcamp', 'workshop', 'course');

-- Create blogs table
CREATE TABLE blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author TEXT NOT NULL,
    author_avatar TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT NOT NULL,
    publish_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    image TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    tags TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create internships table
CREATE TABLE internships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    company_logo TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT NOT NULL,
    stipend TEXT NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[] NOT NULL,
    skills TEXT[] NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create career events table
CREATE TABLE career_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    organizer TEXT NOT NULL,
    organizer_logo TEXT NOT NULL,
    type event_type NOT NULL,
    format event_format NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    price TEXT NOT NULL,
    description TEXT NOT NULL,
    topics TEXT[] NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job fairs table
CREATE TABLE job_fairs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    organizer TEXT NOT NULL,
    organizer_logo TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    format event_format NOT NULL,
    description TEXT NOT NULL,
    companies TEXT[] NOT NULL,
    registration_link TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_fairs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for blogs" ON blogs FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access for internships" ON internships FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access for career_events" ON career_events FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access for job_fairs" ON job_fairs FOR SELECT TO PUBLIC USING (true);