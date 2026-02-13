import { supabase } from './supabase'

export type OrderWithDetails = {
  id: string
  product_id: string
  buyer_id: string
  seller_id: string
  amount: number
  status: string | null
  created_at: string
  payment_intent_id: string | null
  product?: {
    id: string
    title: string
    images: string[] | null
    price: number
  }
  buyer?: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
  seller?: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
}

/**
 * Cria um pedido e marca o produto como vendido
 */
export async function createOrder(
  productId: string,
  buyerId: string,
  sellerId: string,
  amount: number
): Promise<OrderWithDetails | null> {
  try {
    // Criar o pedido
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        product_id: productId,
        buyer_id: buyerId,
        seller_id: sellerId,
        amount,
        status: 'pending',
      })
      .select('*, product:products(id, title, images, price), seller:profiles!orders_seller_id_fkey(username, full_name, avatar_url), buyer:profiles!orders_buyer_id_fkey(username, full_name, avatar_url)')
      .single()

    if (orderError) {
      console.error('[orders] Erro ao criar pedido:', orderError)
      return null
    }

    // Marcar o produto como vendido
    const { error: productError } = await supabase
      .from('products')
      .update({ status: 'sold' })
      .eq('id', productId)

    if (productError) {
      console.error('[orders] Erro ao atualizar status do produto:', productError)
    }

    return order as unknown as OrderWithDetails
  } catch (error) {
    console.error('[orders] Exceção ao criar pedido:', error)
    return null
  }
}

/**
 * Busca pedidos do comprador (com detalhes do produto e vendedor)
 */
export async function getBuyerOrders(userId: string): Promise<OrderWithDetails[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, product:products(id, title, images, price), seller:profiles!orders_seller_id_fkey(username, full_name, avatar_url)')
      .eq('buyer_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[orders] Erro ao buscar pedidos do comprador:', error)
      return []
    }

    return (data || []) as unknown as OrderWithDetails[]
  } catch (error) {
    console.error('[orders] Exceção ao buscar pedidos do comprador:', error)
    return []
  }
}

/**
 * Busca pedidos do vendedor (com detalhes do produto e comprador)
 */
export async function getSellerOrders(userId: string): Promise<OrderWithDetails[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, product:products(id, title, images, price), buyer:profiles!orders_buyer_id_fkey(username, full_name, avatar_url)')
      .eq('seller_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[orders] Erro ao buscar pedidos do vendedor:', error)
      return []
    }

    return (data || []) as unknown as OrderWithDetails[]
  } catch (error) {
    console.error('[orders] Exceção ao buscar pedidos do vendedor:', error)
    return []
  }
}

/**
 * Atualiza o status de um pedido (vendedor: pending -> shipped -> delivered)
 */
export async function updateOrderStatus(
  orderId: string,
  status: 'shipped' | 'delivered'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (error) {
      console.error('[orders] Erro ao atualizar status do pedido:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[orders] Exceção ao atualizar status:', error)
    return false
  }
}

/**
 * Cancela um pedido (comprador, só se pending) e restaura o produto
 */
export async function cancelOrder(orderId: string, productId: string): Promise<boolean> {
  try {
    // Cancelar o pedido
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)

    if (orderError) {
      console.error('[orders] Erro ao cancelar pedido:', orderError)
      return false
    }

    // Restaurar o produto como disponível
    const { error: productError } = await supabase
      .from('products')
      .update({ status: 'available' })
      .eq('id', productId)

    if (productError) {
      console.error('[orders] Erro ao restaurar produto:', productError)
    }

    return true
  } catch (error) {
    console.error('[orders] Exceção ao cancelar pedido:', error)
    return false
  }
}
