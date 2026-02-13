-- ============================================================================
-- SEED DATA - CATEGORIAS
-- Marketplace Lopes - Popular categorias iniciais
-- ============================================================================
-- Execute este script no Supabase Dashboard > SQL Editor
-- Isso vai popular o banco com as categorias principais e subcategorias
-- ============================================================================

-- Limpar categorias existentes (CUIDADO: só rodar em desenvolvimento)
-- TRUNCATE categories CASCADE;

-- ============================================================================
-- CATEGORIAS PRINCIPAIS
-- ============================================================================

INSERT INTO categories (id, name, slug, parent_id, attribute_group_id, path) VALUES
  ('mulher', 'Mulher', 'mulher', NULL, NULL, 'mulher'),
  ('homem', 'Homem', 'homem', NULL, NULL, 'homem'),
  ('crianca', 'Criança', 'crianca', NULL, NULL, 'crianca'),
  ('casa', 'Casa', 'casa', NULL, NULL, 'casa'),
  ('entretenimento', 'Entretenimento', 'entretenimento', NULL, NULL, 'entretenimento'),
  ('hobbies', 'Hobbies', 'hobbies', NULL, NULL, 'hobbies'),
  ('esportes', 'Esportes', 'esportes', NULL, NULL, 'esportes')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SUBCATEGORIAS - MULHER
-- ============================================================================

INSERT INTO categories (id, name, slug, parent_id, attribute_group_id, path) VALUES
  ('roupa-mulher', 'Roupa', 'roupa', 'mulher', NULL, 'mulher.roupa'),
  ('calcado-mulher', 'Calçado', 'calcado', 'mulher', NULL, 'mulher.calcado'),
  ('bolsas-mulher', 'Bolsas', 'bolsas', 'mulher', NULL, 'mulher.bolsas'),
  ('acessorios-mulher', 'Acessórios', 'acessorios', 'mulher', NULL, 'mulher.acessorios'),
  ('beleza', 'Beleza', 'beleza', 'mulher', NULL, 'mulher.beleza')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SUBCATEGORIAS - HOMEM
-- ============================================================================

INSERT INTO categories (id, name, slug, parent_id, attribute_group_id, path) VALUES
  ('roupa-homem', 'Roupa', 'roupa-homem', 'homem', NULL, 'homem.roupa-homem'),
  ('calcado-homem', 'Calçado', 'calcado-homem', 'homem', NULL, 'homem.calcado-homem'),
  ('bolsas-homem', 'Bolsas', 'bolsas-homem', 'homem', NULL, 'homem.bolsas-homem'),
  ('acessorios-homem', 'Acessórios', 'acessorios-homem', 'homem', NULL, 'homem.acessorios-homem')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SUBCATEGORIAS - CRIANÇA
-- ============================================================================

INSERT INTO categories (id, name, slug, parent_id, attribute_group_id, path) VALUES
  ('meninas', 'Meninas', 'meninas', 'crianca', NULL, 'crianca.meninas'),
  ('meninos', 'Meninos', 'meninos', 'crianca', NULL, 'crianca.meninos'),
  ('bebes', 'Bebês', 'bebes', 'crianca', NULL, 'crianca.bebes'),
  ('calcados-crianca', 'Calçados', 'calcados-crianca', 'crianca', NULL, 'crianca.calcados-crianca')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SUBCATEGORIAS - CASA
-- ============================================================================

INSERT INTO categories (id, name, slug, parent_id, attribute_group_id, path) VALUES
  ('decoracao', 'Decoração', 'decoracao', 'casa', NULL, 'casa.decoracao'),
  ('cozinha', 'Cozinha', 'cozinha', 'casa', NULL, 'casa.cozinha'),
  ('cama-banho', 'Cama e Banho', 'cama-banho', 'casa', NULL, 'casa.cama-banho'),
  ('moveis', 'Móveis', 'moveis', 'casa', NULL, 'casa.moveis')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SUBCATEGORIAS - ENTRETENIMENTO
-- ============================================================================

INSERT INTO categories (id, name, slug, parent_id, attribute_group_id, path) VALUES
  ('livros', 'Livros', 'livros', 'entretenimento', NULL, 'entretenimento.livros'),
  ('filmes', 'Filmes e Séries', 'filmes', 'entretenimento', NULL, 'entretenimento.filmes'),
  ('musica', 'Música', 'musica', 'entretenimento', NULL, 'entretenimento.musica'),
  ('games', 'Games', 'games', 'entretenimento', NULL, 'entretenimento.games')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SUBCATEGORIAS - HOBBIES
-- ============================================================================

INSERT INTO categories (id, name, slug, parent_id, attribute_group_id, path) VALUES
  ('instrumentos', 'Instrumentos', 'instrumentos', 'hobbies', NULL, 'hobbies.instrumentos'),
  ('arte', 'Arte', 'arte', 'hobbies', NULL, 'hobbies.arte'),
  ('artesanato', 'Artesanato', 'artesanato', 'hobbies', NULL, 'hobbies.artesanato'),
  ('jardinagem', 'Jardinagem', 'jardinagem', 'hobbies', NULL, 'hobbies.jardinagem')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SUBCATEGORIAS - ESPORTES
-- ============================================================================

INSERT INTO categories (id, name, slug, parent_id, attribute_group_id, path) VALUES
  ('fitness', 'Fitness', 'fitness', 'esportes', NULL, 'esportes.fitness'),
  ('futebol', 'Futebol', 'futebol', 'esportes', NULL, 'esportes.futebol'),
  ('natacao', 'Natação', 'natacao', 'esportes', NULL, 'esportes.natacao'),
  ('ciclismo', 'Ciclismo', 'ciclismo', 'esportes', NULL, 'esportes.ciclismo')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- VERIFICAR CATEGORIAS
-- ============================================================================
-- Execute para ver todas as categorias inseridas:
--
-- SELECT id, name, slug, parent_id, path
-- FROM categories
-- ORDER BY path;
-- ============================================================================
