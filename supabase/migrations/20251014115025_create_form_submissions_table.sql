/*
  # Create Form Submissions Table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `first_name` (text) - First name of the submitter
      - `last_name` (text) - Last name of the submitter
      - `whatsapp_number` (text) - WhatsApp phone number
      - `company_name` (text) - Company name
      - `website` (text) - Company website URL
      - `email` (text) - Email address
      - `instagram_link` (text) - Instagram profile link
      - `telegram_link` (text) - Telegram profile link
      - `whatsapp_link` (text) - WhatsApp chat link
      - `created_at` (timestamptz) - Timestamp of submission
  
  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for inserting submissions (public access for form submissions)
    - Add policy for authenticated users to view all submissions
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  whatsapp_number text NOT NULL,
  company_name text NOT NULL,
  website text DEFAULT '',
  email text NOT NULL,
  instagram_link text DEFAULT '',
  telegram_link text DEFAULT '',
  whatsapp_link text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit form"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);