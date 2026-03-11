-- ============================================================
-- BdPrompt Full Database Migration
-- New Supabase Project: lazqucrttzggymmzsqvs
-- Generated: 2026-03-12
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. CATEGORIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_bn TEXT,
  description_en TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert categories data
INSERT INTO categories (id, slug, name_bn, name_en, description_bn, description_en, icon, created_at) VALUES
  ('e9bf5a40-d84d-4019-8e0f-880b7f7cc4b3', 'content', 'কন্টেন্ট', 'Content', 'ব্লগ, আর্টিকেল, এবং সোশ্যাল মিডিয়া কন্টেন্ট', 'Blog, article, and social media content', 'FileText', '2025-12-02 13:14:19.514294+00'),
  ('84c3ee99-008f-40fb-bb04-3dc2c87fc666', 'image', 'ইমেজ', 'Image', 'AI ইমেজ জেনারেশন প্রম্পট', 'AI image generation prompts', 'Image', '2025-12-02 13:14:19.514294+00'),
  ('cc459c3d-c59b-4372-baac-19e2626fa029', 'code', 'কোড', 'Code', 'প্রোগ্রামিং এবং ডেভেলপমেন্ট প্রম্পট', 'Programming and development prompts', 'Code', '2025-12-02 13:14:19.514294+00'),
  ('07bd64cf-9443-4d2a-8a2a-ee8117e82a87', 'marketing', 'মার্কেটিং', 'Marketing', 'বিজ্ঞাপন এবং মার্কেটিং কপি', 'Advertising and marketing copy', 'Megaphone', '2025-12-02 13:14:19.514294+00'),
  ('c658e4c2-6d6e-40f2-a16c-708b8f9de9dd', 'education', 'শিক্ষা', 'Education', 'শিক্ষামূলক কন্টেন্ট এবং টিউটোরিয়াল', 'Educational content and tutorials', 'GraduationCap', '2025-12-02 13:14:19.514294+00'),
  ('bdd66812-c68a-4b55-ba4f-329a72f7c931', 'business', 'ব্যবসা', 'Business', 'ব্যবসায়িক ডকুমেন্ট এবং কমিউনিকেশন', 'Business documents and communication', 'Briefcase', '2025-12-02 13:14:19.514294+00')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. PROMPTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE,
  title_bn TEXT NOT NULL,
  title_en TEXT,
  description_bn TEXT,
  description_en TEXT,
  prompt_template TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags JSONB DEFAULT '[]',
  use_case_bn TEXT,
  use_case_en TEXT,
  example_input TEXT,
  example_output TEXT,
  author_name TEXT,
  author_avatar TEXT,
  price NUMERIC(10,2) DEFAULT 0.00,
  is_free BOOLEAN DEFAULT true,
  rating NUMERIC(3,2) DEFAULT 0.00,
  rating_count INTEGER DEFAULT 0,
  copy_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_prompts_slug ON prompts(slug);
CREATE INDEX IF NOT EXISTS idx_prompts_category ON prompts(category_id);
CREATE INDEX IF NOT EXISTS idx_prompts_published ON prompts(is_published);
CREATE INDEX IF NOT EXISTS idx_prompts_featured ON prompts(is_featured);

-- ============================================================
-- 3. USER ROLES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user ON user_roles(user_id);

-- ============================================================
-- 4. SAVED PROMPTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS saved_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, prompt_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_prompts_user ON saved_prompts(user_id);

-- ============================================================
-- 5. PROMPT PURCHASES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS prompt_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  amount NUMERIC(10,2),
  purchased_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user ON prompt_purchases(user_id);

-- ============================================================
-- 6. ADMIN AUDIT LOGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id TEXT,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. AI USAGE LOGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  function_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_logs_user ON ai_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_function ON ai_usage_logs(function_name);

-- ============================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Categories: public read
CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (true);

-- Prompts: public read for published only
CREATE POLICY "prompts_public_read" ON prompts FOR SELECT USING (is_published = true);

-- Prompts: authenticated users can insert
CREATE POLICY "prompts_auth_insert" ON prompts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Saved prompts: users manage their own
CREATE POLICY "saved_own_read" ON saved_prompts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saved_own_insert" ON saved_prompts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saved_own_delete" ON saved_prompts FOR DELETE USING (auth.uid() = user_id);

-- Purchases: users see their own
CREATE POLICY "purchases_own_read" ON prompt_purchases FOR SELECT USING (auth.uid() = user_id);

-- User roles: users see their own
CREATE POLICY "roles_own_read" ON user_roles FOR SELECT USING (auth.uid() = user_id);

-- AI logs: service role only (edge functions)
CREATE POLICY "ai_logs_service_insert" ON ai_usage_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "ai_logs_own_read" ON ai_usage_logs FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- 9. UPDATED_AT AUTO-TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- DONE! Tables created. Now import prompts data via:
-- Supabase Dashboard > Table Editor > prompts > Import CSV
-- Use the file: prompts-export-2026-03-12_04-00-51.csv
-- ============================================================
