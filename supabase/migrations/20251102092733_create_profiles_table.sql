/*
  # Create Profiles Table

  1. New Tables
    - `profiles` - Stores candidate profile information
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `title` (text, not null)
      - `company` (text)
      - `experience` (text)
      - `location` (text)
      - `score` (integer, 0-100)
      - `about` (text)
      - `skills` (text[], array of skill names)
      - `education` (jsonb, array of education records)
      - `work_history` (jsonb, array of work records)
      - `website` (text)
      - `resume_url` (text)
      - `email` (text)
      - `social_links` (jsonb, social media links)
      - `ideal_next_opportunity` (text)
      - `lpa` (text, salary)
      - `club_member` (boolean)
      - `availability` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for public read access to all profiles
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  company text,
  experience text,
  location text,
  score integer DEFAULT 0,
  about text,
  skills text[] DEFAULT '{}',
  education jsonb DEFAULT '[]',
  work_history jsonb DEFAULT '[]',
  website text,
  resume_url text,
  email text,
  social_links jsonb DEFAULT '{}',
  ideal_next_opportunity text,
  lpa text,
  club_member boolean DEFAULT false,
  availability text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are publicly readable"
  ON profiles
  FOR SELECT
  TO public
  USING (true);
