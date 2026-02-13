-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Marketplace Lopes - Segurança do Banco de Dados
-- ============================================================================
-- Execute este script no Supabase Dashboard > SQL Editor
-- Isso garante que usuários só podem acessar/modificar seus próprios dados
-- ============================================================================

-- ============================================================================
-- 1. PROFILES (Perfis de Usuário)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Todos podem ver perfis públicos
CREATE POLICY "Perfis são visíveis publicamente"
ON profiles FOR SELECT
USING (true);

-- Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Usuários podem atualizar seu próprio perfil"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Perfis são criados automaticamente via trigger (não precisa policy INSERT)

-- ============================================================================
-- 2. PRODUCTS (Produtos/Anúncios)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Todos podem ver produtos disponíveis
CREATE POLICY "Produtos disponíveis são visíveis publicamente"
ON products FOR SELECT
USING (status = 'available');

-- Vendedor pode ver seus próprios produtos (inclusive deletados)
CREATE POLICY "Vendedor pode ver todos seus produtos"
ON products FOR SELECT
USING (auth.uid() = seller_id);

-- Usuários autenticados podem criar produtos
CREATE POLICY "Usuários autenticados podem criar produtos"
ON products FOR INSERT
WITH CHECK (auth.uid() = seller_id);

-- Apenas o vendedor pode atualizar seu produto
CREATE POLICY "Vendedor pode atualizar seus produtos"
ON products FOR UPDATE
USING (auth.uid() = seller_id)
WITH CHECK (auth.uid() = seller_id);

-- Apenas o vendedor pode deletar (soft delete) seu produto
CREATE POLICY "Vendedor pode deletar seus produtos"
ON products FOR DELETE
USING (auth.uid() = seller_id);

-- ============================================================================
-- 3. FAVORITES (Favoritos)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Usuário só vê seus próprios favoritos
CREATE POLICY "Usuário vê apenas seus favoritos"
ON favorites FOR SELECT
USING (auth.uid() = user_id);

-- Usuário pode adicionar favoritos
CREATE POLICY "Usuário pode adicionar favoritos"
ON favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Usuário pode remover seus favoritos
CREATE POLICY "Usuário pode remover seus favoritos"
ON favorites FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================================
-- 4. CONVERSATIONS (Conversas)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Participantes podem ver a conversa
CREATE POLICY "Participantes podem ver conversa"
ON conversations FOR SELECT
USING (
  auth.uid() = buyer_id OR
  auth.uid() = seller_id
);

-- Comprador pode iniciar conversa
CREATE POLICY "Comprador pode criar conversa"
ON conversations FOR INSERT
WITH CHECK (auth.uid() = buyer_id);

-- ============================================================================
-- 5. MESSAGES (Mensagens)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Participantes da conversa podem ver mensagens
CREATE POLICY "Participantes podem ver mensagens"
ON messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.buyer_id = auth.uid() OR conversations.seller_id = auth.uid())
  )
);

-- Participantes podem enviar mensagens
CREATE POLICY "Participantes podem enviar mensagens"
ON messages FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = conversation_id
    AND (conversations.buyer_id = auth.uid() OR conversations.seller_id = auth.uid())
  )
);

-- Remetente pode atualizar suas mensagens (para marcar como lida)
CREATE POLICY "Participantes podem atualizar mensagens"
ON messages FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.buyer_id = auth.uid() OR conversations.seller_id = auth.uid())
  )
);

-- ============================================================================
-- 6. REVIEWS (Avaliações)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Todos podem ver avaliações públicas
CREATE POLICY "Avaliações são públicas"
ON reviews FOR SELECT
USING (true);

-- Usuário autenticado pode criar avaliação
CREATE POLICY "Usuário pode criar avaliação"
ON reviews FOR INSERT
WITH CHECK (auth.uid() = reviewer_id);

-- Apenas o autor pode deletar sua avaliação
CREATE POLICY "Autor pode deletar sua avaliação"
ON reviews FOR DELETE
USING (auth.uid() = reviewer_id);

-- ============================================================================
-- 7. ORDERS (Pedidos) - Placeholder para futuro
-- ============================================================================

-- Habilitar RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Comprador e vendedor podem ver o pedido
CREATE POLICY "Participantes podem ver pedido"
ON orders FOR SELECT
USING (
  auth.uid() = buyer_id OR
  auth.uid() = seller_id
);

-- Comprador pode criar pedido
CREATE POLICY "Comprador pode criar pedido"
ON orders FOR INSERT
WITH CHECK (auth.uid() = buyer_id);

-- Vendedor pode atualizar status do pedido
CREATE POLICY "Vendedor pode atualizar pedido"
ON orders FOR UPDATE
USING (auth.uid() = seller_id);

-- ============================================================================
-- 8. ADDRESSES (Endereços)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Usuário vê apenas seus endereços
CREATE POLICY "Usuário vê seus endereços"
ON addresses FOR SELECT
USING (auth.uid() = user_id);

-- Usuário pode criar seus endereços
CREATE POLICY "Usuário pode criar endereços"
ON addresses FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Usuário pode atualizar seus endereços
CREATE POLICY "Usuário pode atualizar seus endereços"
ON addresses FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Usuário pode deletar seus endereços
CREATE POLICY "Usuário pode deletar seus endereços"
ON addresses FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================================
-- 9. NOTIFICATIONS (Notificações)
-- ============================================================================

-- Habilitar RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Usuário vê apenas suas notificações
CREATE POLICY "Usuário vê suas notificações"
ON notifications FOR SELECT
USING (auth.uid() = user_id);

-- Sistema pode criar notificações (via service role)
-- Usuários não criam notificações diretamente

-- Usuário pode atualizar suas notificações (marcar como lida)
CREATE POLICY "Usuário pode atualizar suas notificações"
ON notifications FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Usuário pode deletar suas notificações
CREATE POLICY "Usuário pode deletar suas notificações"
ON notifications FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================================
-- 10. CATEGORIES (Categorias) - Público, apenas leitura
-- ============================================================================

-- Habilitar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Todos podem ler categorias
CREATE POLICY "Categorias são públicas"
ON categories FOR SELECT
USING (true);

-- ============================================================================
-- 11. CATEGORY_ATTRIBUTES (Atributos de Categoria) - Público
-- ============================================================================

-- Habilitar RLS
ALTER TABLE category_attributes ENABLE ROW LEVEL SECURITY;

-- Todos podem ler atributos
CREATE POLICY "Atributos são públicos"
ON category_attributes FOR SELECT
USING (true);

-- ============================================================================
-- 12. ATTRIBUTE_GROUPS (Grupos de Atributos) - Público
-- ============================================================================

-- Habilitar RLS
ALTER TABLE attribute_groups ENABLE ROW LEVEL SECURITY;

-- Todos podem ler grupos de atributos
CREATE POLICY "Grupos de atributos são públicos"
ON attribute_groups FOR SELECT
USING (true);

-- ============================================================================
-- VERIFICAR POLÍTICAS
-- ============================================================================
-- Execute para verificar se todas as policies foram criadas:
--
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
-- ============================================================================
