/*
  # Create Unlocked Profiles Table

  1. New Tables
    - `unlocked_profiles` - Tracks which profiles have been unlocked
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key to profiles)
      - `unlocked_at` (timestamp)

  2. Security
    - Enable RLS on `unlocked_profiles` table
    - Add policy for public read access
    - Add policy for public insert access (simplified for demo)
*/

CREATE TABLE IF NOT EXISTS unlocked_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(profile_id)
);

ALTER TABLE unlocked_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Unlocked profiles are publicly readable"
  ON unlocked_profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can unlock a profile"
  ON unlocked_profiles
  FOR INSERT
  TO public
  WITH CHECK (true);
