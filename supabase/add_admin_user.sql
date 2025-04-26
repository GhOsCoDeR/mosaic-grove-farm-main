
-- This script adds an admin user account for testing purposes
-- First, add a user in the auth schema
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(), -- Generate a new UUID for the user
  'authenticated',
  'authenticated',
  'admin@mosaicgrove.com',
  crypt('admin123', gen_salt('bf')), -- Password is 'admin123'
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Admin User"}',
  FALSE,
  now(),
  now()
);

-- Then, add the user to the admin_roles table
-- We need to get the user ID first
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@mosaicgrove.com';

  -- Add admin role
  INSERT INTO public.admin_roles (user_id, role)
  VALUES (admin_user_id, 'super-admin');

  -- Create a profile for this user
  INSERT INTO public.profiles (id, name, email)
  VALUES (admin_user_id, 'Admin User', 'admin@mosaicgrove.com');
END $$;
