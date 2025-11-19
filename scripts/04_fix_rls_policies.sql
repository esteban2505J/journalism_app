-- Script para corregir políticas RLS y evitar recursión infinita

-- Eliminar políticas problemáticas que causan recursión
DROP POLICY IF EXISTS "Usuarios pueden ver su propio perfil" ON public.users;
DROP POLICY IF EXISTS "Admins pueden ver todos los usuarios" ON public.users;
DROP POLICY IF EXISTS "Todos pueden ver historias publicadas" ON public.stories;
DROP POLICY IF EXISTS "Periodistas pueden ver todas las historias" ON public.stories;
DROP POLICY IF EXISTS "Periodistas pueden crear historias" ON public.stories;
DROP POLICY IF EXISTS "Periodistas pueden actualizar sus historias" ON public.stories;
DROP POLICY IF EXISTS "Todos pueden ver imágenes de secciones" ON public.section_images;
DROP POLICY IF EXISTS "Admins pueden actualizar imágenes" ON public.section_images;
DROP POLICY IF EXISTS "Admins pueden insertar imágenes" ON public.section_images;

-- Crear nuevas políticas sin recursión

-- Políticas para users
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Políticas para stories (sin recursión infinita)
CREATE POLICY "Anyone can view published stories" ON public.stories
  FOR SELECT USING (published = TRUE);

CREATE POLICY "Journalists can view all stories" ON public.stories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('periodista', 'admin')
    )
  );

CREATE POLICY "Journalists can create stories" ON public.stories
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('periodista', 'admin')
    )
  );

CREATE POLICY "Journalists can update stories" ON public.stories
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('periodista', 'admin')
    )
  );

-- Políticas para section_images
CREATE POLICY "Anyone can view section images" ON public.section_images
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can update section images" ON public.section_images
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert section images" ON public.section_images
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );
