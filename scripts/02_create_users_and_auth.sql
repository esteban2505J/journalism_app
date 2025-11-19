-- Crear tabla de usuarios con autenticación
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer', -- 'periodista', 'admin', 'viewer'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de historias (historias de conciencia)
CREATE TABLE IF NOT EXISTS public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL,
  category TEXT DEFAULT 'testimonio', -- testimonio, reflexión, propuesta
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para gestionar imágenes de secciones
CREATE TABLE IF NOT EXISTS public.section_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT NOT NULL UNIQUE, -- 'carousel', 'armenia', 'stats', 'news', 'hero'
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  updated_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear función para obtener el rol del usuario sin recursión
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = user_id
$$ LANGUAGE sql STABLE;

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_images ENABLE ROW LEVEL SECURITY;

-- Simplificar políticas RLS para evitar recursión infinita

-- Políticas RLS para usuarios (sin recursión)
CREATE POLICY "Usuarios pueden ver su propio perfil" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Políticas RLS para historias
CREATE POLICY "Todos pueden ver historias publicadas" ON public.stories
  FOR SELECT USING (published = TRUE);

CREATE POLICY "Periodistas pueden ver todas las historias" ON public.stories
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role IN ('periodista', 'admin'))
  );

CREATE POLICY "Periodistas pueden crear historias" ON public.stories
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.users WHERE role IN ('periodista', 'admin'))
  );

CREATE POLICY "Periodistas pueden actualizar sus historias" ON public.stories
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role IN ('periodista', 'admin'))
  );

-- Políticas RLS para section_images
CREATE POLICY "Todos pueden ver imágenes de secciones" ON public.section_images
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins pueden actualizar imágenes" ON public.section_images
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

CREATE POLICY "Admins pueden insertar imágenes" ON public.section_images
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );
