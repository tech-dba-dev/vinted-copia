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

    return conversationsWithDetails
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

    return data || []
  } catch (error) {
    console.error('Erro:', error)
    return []
  }
}

// Enviar mensagem
export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
): Promise<Message | null> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        is_read: false,
      })
      .select()
      .single()

    if (error) {
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

// Subscribe para novas mensagens em tempo real
export function subscribeToMessages(
  conversationId: string,
  onNewMessage: (message: Message) => void
) {
  const channel = supabase
    .channel(`messages:${conversationId}`)
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
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
