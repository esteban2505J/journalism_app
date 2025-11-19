-- Create videos table for storing user-submitted videos
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read videos
CREATE POLICY "Allow public read access" ON videos
  FOR SELECT USING (true);

-- Create policy to allow anyone to insert videos
CREATE POLICY "Allow public insert" ON videos
  FOR INSERT WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
