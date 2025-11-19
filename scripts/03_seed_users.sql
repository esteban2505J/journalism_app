-- Insertar usuario periodista
INSERT INTO public.users (id, email, username, role)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'periodista@armenianews.com', 'periodista', 'periodista'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'admin@armenianews.com', 'admin', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insertar usuario admin
-- Existing code for admin user is replaced with the new code above

-- Inicializar section_images con URLs actuales
INSERT INTO public.section_images (section_name, image_url, alt_text, caption)
VALUES 
  ('carousel_1', '/images/armenia1-1.jpg', 'Vista aérea de Armenia', 'Armenia, Quindío'),
  ('carousel_2', '/images/scenadelcrimen.jpg', 'Escena de crimen', 'Investigación en Armenia'),
  ('carousel_3', '/images/homicidios2.webp', 'Investigadores', 'Forenses en el lugar'),
  ('armenia_city', '/images/armenia1-1.jpg', 'Ciudad de Armenia', 'La ciudad milagro'),
  ('news_1', '/images/attachments-gen-images-public-microtr-fico-drogas-barrios-peligro.jpg', 'Microtráfico', 'Crisis de drogas'),
  ('news_2', '/images/attachments-gen-images-public-j-venes-desempleo-barrio-calle-comunidad.jpg', 'Desempleo juvenil', 'Jóvenes en riesgo'),
  ('news_3', '/images/attachments-gen-images-public-investigaci-n-policial-criminal-stica-escena-crime.jpg', 'Investigación', 'Criminología'),
  ('news_4', '/images/attachments-gen-images-public-polic-a-operativo-seguridad-urbana-patrulla.jpg', 'Operativo policial', 'Seguridad urbana')
ON CONFLICT DO NOTHING;
