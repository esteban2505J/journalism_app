-- Eliminar tabla anterior si existe
DROP TABLE IF EXISTS public.users CASCADE;

-- Crear tabla de usuarios simple (sin auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Actualizar tabla de historias
DROP TABLE IF EXISTS public.stories CASCADE;
CREATE TABLE IF NOT EXISTS public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL,
  category TEXT DEFAULT 'testimonio',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para gestionar imágenes de secciones
CREATE TABLE IF NOT EXISTS public.section_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  updated_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Deshabilitar RLS para usuarios (autenticación manual)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- RLS simple para historias - solo leer historias publicadas
ALTER TABLE public.stories DISABLE ROW LEVEL SECURITY;

-- RLS simple para section_images - todos pueden leer
ALTER TABLE public.section_images DISABLE ROW LEVEL SECURITY;
