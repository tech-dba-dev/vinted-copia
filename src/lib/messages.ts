import { supabase } from './supabase'
import type { Conversation, Message, Profile, Product } from '@/types/database'

export type ConversationWithDetails = Conversation & {
  buyer?: Profile
  seller?: Profile
  product?: Product
  last_message?: Message
  unread_count?: number
}

export type MessageWithSender = Message & {
  sender?: Profile
}

// Buscar ou criar uma conversa
export async function getOrCreateConversation(
  productId: string,
  sellerId: string,
  buyerId: string
): Promise<Conversation | null> {
  try {
    // Verificar se já existe uma conversa
    const { data: existing, error: fetchError } = await supabase
      .from('conversations')
      .select('*')
      .eq('product_id', productId)
      .eq('buyer_id', buyerId)
      .eq('seller_id', sellerId)
      .single()

    if (existing) {
      return existing
    }

    // Criar nova conversa se não existir
    if (fetchError?.code === 'PGRST116') {
      const { data: newConversation, error: createError } = await supabase
        .from('conversations')
        .insert({
          product_id: productId,
          buyer_id: buyerId,
          seller_id: sellerId,
        })
        .select()
        .single()

      if (createError) {
        console.error('Erro ao criar conversa:', createError)
        return null
      }

      return newConversation
    }

    console.error('Erro ao buscar conversa:', fetchError)
    return null
  } catch (error) {
    console.error('Erro:', error)
    return null
  }
}

// Buscar todas as conversas do usuário
export async function getUserConversations(
  userId: string
): Promise<ConversationWithDetails[]> {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        buyer:buyer_id(id, username, full_name, avatar_url),
        seller:seller_id(id, username, full_name, avatar_url),
        product:product_id(id, title, price, images, status)
      `)
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar conversas:', error)
      return []
    }

    // Buscar última mensagem e contagem de não lidas para cada conversa
    const conversationsWithDetails = await Promise.all(
      (data || []).map(async (conv) => {
        // Última mensagem
        const { data: lastMsg } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        // Contagem de não lidas (apenas mensagens que não são do usuário atual)
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conv.id)
          .eq('is_read', false)
          .neq('sender_id', userId)

        return {
          ...conv,
          last_message: lastMsg || undefined,
          unread_count: count || 0,
        }
      })
    )

    return conversationsWithDetails as unknown as ConversationWithDetails[]
  } catch (error) {
    console.error('Erro:', error)
    return []
  }
}

// Buscar mensagens de uma conversa
export async function getConversationMessages(
  conversationId: string
): Promise<MessageWithSender[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(id, username, full_name, avatar_url)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Erro ao buscar mensagens:', error)
      return []
    }

    return (data || []) as unknown as MessageWithSender[]
  } catch (error) {
    console.error('Erro:', error)
    return []
  }
}

// Enviar mensagem (com retry automático se JWT expirou)
export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
): Promise<Message | null> {
  async function doInsert() {
    return supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        is_read: false,
      })
      .select()
      .single()
  }

  try {
    const { data, error } = await doInsert()

    if (error) {
      // Se for erro de auth (JWT expirado), tentar refresh e reenviar
      const isAuthError =
        error.code === 'PGRST301' ||
        error.message?.includes('JWT') ||
        error.code === '401'

      if (isAuthError) {
        console.log('[sendMessage] JWT expirado, tentando refresh...')
        const { error: refreshError } = await supabase.auth.refreshSession()

        if (!refreshError) {
          const { data: retryData, error: retryError } = await doInsert()
          if (retryError) {
            console.error('[sendMessage] Retry falhou:', retryError)
            return null
          }
          return retryData
        }
      }

      console.error('Erro ao enviar mensagem:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Erro:', error)
    return null
  }
}

// Marcar mensagens como lidas
export async function markMessagesAsRead(
  conversationId: string,
  userId: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .eq('is_read', false)

    if (error) {
      console.error('Erro ao marcar mensagens como lidas:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro:', error)
    return false
  }
}

// Contar total de mensagens não lidas do usuário
export async function getUnreadMessagesCount(userId: string): Promise<number> {
  try {
    // Buscar todas as conversas do usuário
    const { data: conversations } = await supabase
      .from('conversations')
      .select('id')
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)

    if (!conversations || conversations.length === 0) {
      return 0
    }

    // Contar mensagens não lidas em todas as conversas
    const conversationIds = conversations.map((c) => c.id)
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .in('conversation_id', conversationIds)
      .neq('sender_id', userId)
      .eq('is_read', false)

    return count || 0
  } catch (error) {
    console.error('Erro ao contar mensagens não lidas:', error)
    return 0
  }
}

// Subscribe para novas mensagens em tempo real (com reconexão robusta)
export function subscribeToMessages(
  conversationId: string,
  onNewMessage: (message: Message) => void
) {
  let retryTimeout: ReturnType<typeof setTimeout> | null = null
  let isReconnecting = false
  let retryCount = 0
  let disposed = false
  const MAX_RETRIES = 5
  const channelName = `messages:${conversationId}`

  function createAndSubscribe() {
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          onNewMessage(payload.new as Message)
        }
      )
      .subscribe((status) => {
        console.log(`[Realtime] ${channelName} status:`, status)

        if (status === 'SUBSCRIBED') {
          // Conexão OK — resetar contadores
          retryCount = 0
          isReconnecting = false
        }

        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          if (disposed || isReconnecting || retryCount >= MAX_RETRIES) return
          isReconnecting = true
          retryCount++

          // Backoff exponencial: 3s, 6s, 12s, 24s, 48s
          const delay = Math.min(3000 * Math.pow(2, retryCount - 1), 48000)
          console.log(`[Realtime] Reconectando em ${delay / 1000}s (tentativa ${retryCount}/${MAX_RETRIES})`)

          retryTimeout = setTimeout(() => {
            if (disposed) return
            // Limpar canal zumbi e criar um novo
            supabase.removeChannel(channel)
            isReconnecting = false
            currentChannel = createAndSubscribe()
          }, delay)
        }
      })

    return channel
  }

  let currentChannel = createAndSubscribe()

  return () => {
    disposed = true
    if (retryTimeout) clearTimeout(retryTimeout)
    supabase.removeChannel(currentChannel)
  }
}

// Subscribe para mudanças em mensagens não lidas (global)
export function subscribeToUnreadMessages(
  userId: string,
  onUnreadCountChange: (count: number) => void
) {
  const channel = supabase
    .channel('unread-messages')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages',
      },
      async () => {
        // Recarregar contagem quando houver mudanças
        const count = await getUnreadMessagesCount(userId)
        onUnreadCountChange(count)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
