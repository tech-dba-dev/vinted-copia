-- =====================================================
-- SETUP DE NOTIFICAÇÕES POR EMAIL PARA MENSAGENS
-- =====================================================
-- Este script cria uma função e um trigger no Supabase
-- que envia notificações por email quando uma nova
-- mensagem é recebida.
-- =====================================================

-- 1. Criar a função que chama a API de notificação
CREATE OR REPLACE FUNCTION notify_new_message()
RETURNS TRIGGER AS $$
DECLARE
  api_url TEXT;
  api_response HTTP_RESPONSE;
BEGIN
  -- URL da API (ajuste conforme necessário)
  -- Para produção: https://seu-dominio.com/api/send-message-notification
  -- Para desenvolvimento: http://localhost:3000/api/send-message-notification
  api_url := 'http://localhost:3000/api/send-message-notification';

  -- Chamar a API usando pg_http extension
  -- IMPORTANTE: A extension http deve estar habilitada no Supabase
  SELECT INTO api_response * FROM http((
    'POST',
    api_url,
    ARRAY[http_header('Content-Type', 'application/json')],
    'application/json',
    json_build_object(
      'messageId', NEW.id::text,
      'conversationId', NEW.conversation_id::text
    )::text
  )::http_request);

  -- Log do resultado (opcional)
  RAISE LOG 'Notificação enviada para mensagem % - Status: %', NEW.id, api_response.status;

  -- Retornar NEW para continuar com o INSERT
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Em caso de erro, apenas logar mas não bloquear o INSERT da mensagem
  RAISE LOG 'Erro ao enviar notificação: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Criar o trigger que executa após INSERT de nova mensagem
DROP TRIGGER IF EXISTS trigger_notify_new_message ON messages;

CREATE TRIGGER trigger_notify_new_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_message();

-- 3. Comentários para documentação
COMMENT ON FUNCTION notify_new_message() IS
  'Função que envia notificação por email quando uma nova mensagem é criada. Chama a API /api/send-message-notification';

COMMENT ON TRIGGER trigger_notify_new_message ON messages IS
  'Trigger que executa após o insert de uma nova mensagem para enviar notificação por email';

-- =====================================================
-- INSTRUÇÕES DE INSTALAÇÃO
-- =====================================================
--
-- 1. No Supabase Dashboard, vá em "SQL Editor"
-- 2. Cole e execute este script completo
-- 3. Verifique se a extension http está habilitada:
--    SELECT * FROM pg_available_extensions WHERE name = 'http';
--    Se não estiver, habilite com: CREATE EXTENSION IF NOT EXISTS http;
--
-- 4. Configure as variáveis de ambiente no .env.local:
--    RESEND_API_KEY=re_seu_key_aqui
--    EMAIL_FROM=Marketplace <seu-email@dominio.com>
--    NEXT_PUBLIC_APP_URL=http://localhost:3000
--
-- 5. Para produção, altere a variável api_url na função
--    para apontar para o domínio real da sua aplicação
--
-- =====================================================
-- TESTES
-- =====================================================
--
-- Para testar, insira uma nova mensagem:
--
-- INSERT INTO messages (conversation_id, sender_id, content)
-- VALUES (
--   'id-da-conversa-existente',
--   'id-do-remetente-existente',
--   'Teste de notificação por email'
-- );
--
-- Você deve receber um email no endereço do destinatário.
-- Verifique os logs do Next.js para debug.
--
-- =====================================================
-- DESABILITAR NOTIFICAÇÕES (se necessário)
-- =====================================================
--
-- Para desabilitar temporariamente:
-- DROP TRIGGER IF EXISTS trigger_notify_new_message ON messages;
--
-- Para reabilitar:
-- CREATE TRIGGER trigger_notify_new_message
--   AFTER INSERT ON messages
--   FOR EACH ROW
--   EXECUTE FUNCTION notify_new_message();
--
-- =====================================================
