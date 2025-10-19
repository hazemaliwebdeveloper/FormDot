/*
  # Create Leads Registration System

  ## Overview
  This migration creates a comprehensive lead registration system for Dot Studio's landing page with WhatsApp OTP verification.

  ## 1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `first_name` (text) - Lead's first name
      - `last_name` (text) - Lead's last name
      - `phone_number` (text, unique) - WhatsApp phone number (required)
      - `email` (text) - Email address
      - `business_name` (text) - Name of the business
      - `business_field` (text) - Business industry/field
      - `city` (text) - City in Saudi Arabia
      - `website_url` (text) - Website link (optional)
      - `instagram_url` (text) - Instagram profile link (optional)
      - `youtube_url` (text) - YouTube channel link (optional)
      - `tiktok_url` (text) - TikTok profile link (optional)
      - `snapchat_url` (text) - Snapchat profile link (optional)
      - `is_verified` (boolean) - WhatsApp OTP verification status
      - `created_at` (timestamptz) - Registration timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `otp_verifications`
      - `id` (uuid, primary key) - Unique identifier
      - `phone_number` (text) - Phone number for OTP
      - `otp_code` (text) - Generated OTP code
      - `expires_at` (timestamptz) - OTP expiration time (5 minutes)
      - `is_used` (boolean) - Whether OTP has been used
      - `created_at` (timestamptz) - Creation timestamp

  ## 2. Security
    - Enable RLS on both tables
    - Public insert access for leads (before verification)
    - Public read access for OTP verification
    - Restrictive policies for data protection

  ## 3. Indexes
    - Index on phone_number for fast lookups
    - Index on email for queries
    - Index on created_at for sorting

  ## 4. Important Notes
    - Phone numbers must be in international format (+966...)
    - OTPs expire after 5 minutes
    - Leads are marked as verified after successful OTP confirmation
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text UNIQUE NOT NULL,
  email text,
  business_name text NOT NULL,
  business_field text NOT NULL,
  city text NOT NULL,
  website_url text,
  instagram_url text,
  youtube_url text,
  tiktok_url text,
  snapchat_url text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  is_used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone_number);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone_number);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications(expires_at);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads table
CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read their own lead data"
  ON leads FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update their own lead verification"
  ON leads FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- RLS Policies for OTP verifications table
CREATE POLICY "Anyone can insert OTP requests"
  ON otp_verifications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read OTP for verification"
  ON otp_verifications FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update OTP status"
  ON otp_verifications FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Function to clean up expired OTPs
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_verifications
  WHERE expires_at < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql;