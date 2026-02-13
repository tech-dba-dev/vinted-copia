import { supabase } from './supabase'
import type { Product, Category, Json } from '@/types/database'

export type CreateProductData = {
  title: string
  description?: string
  price: number
  category_id: string
  images: string[]
  dynamic_attributes?: Record<string, unknown>
}

// Criar um novo produto
export async function createProduct(
  sellerId: string,
  data: CreateProductData
): Promise<Product | null> {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        seller_id: sellerId,
        title: data.title,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
        images: data.images,
        dynamic_attributes: (data.dynamic_attributes || {}) as Json,
        status: 'available',
      })
      .select()
      .single()

    if (error) {
      console.error('[createProduct] Erro ao criar produto:', error)
      return null
    }

    return product
  } catch (error) {
    console.error('[createProduct] Erro ao criar produto:', error)
    return null
  }
}

// Buscar produtos com filtros
export async function getProducts(options?: {
  category_id?: string
  search?: string
  min_price?: number
  max_price?: number
  limit?: number
  offset?: number
}): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*, seller:profiles(*), category:categories(*)')
      .eq('status', 'available')
      .order('created_at', { ascending: false })

    if (options?.category_id) {
      query = query.eq('category_id', options.category_id)
    }

    if (options?.search) {
      query = query.ilike('title', `%${options.search}%`)
    }

    if (options?.min_price !== undefined) {
      query = query.gte('price', options.min_price)
    }

    if (options?.max_price !== undefined) {
      query = query.lte('price', options.max_price)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

// Buscar produto por ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, seller:profiles(*), category:categories(*)')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao buscar produto:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return null
  }
}

// Buscar produtos de um vendedor
export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos do vendedor:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar produtos do vendedor:', error)
    return []
  }
}

// Atualizar produto
export async function updateProduct(
  productId: string,
  sellerId: string,
  data: Partial<CreateProductData>
): Promise<Product | null> {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .update({
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.category_id !== undefined && { category_id: data.category_id }),
        ...(data.images !== undefined && { images: data.images }),
        ...(data.dynamic_attributes !== undefined && { dynamic_attributes: data.dynamic_attributes as Json }),
      })
      .eq('id', productId)
      .eq('seller_id', sellerId) // Garantir que só o dono pode editar
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar produto:', error)
      return null
    }

    return product
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return null
  }
}

// Deletar produto (soft delete - muda status)
export async function deleteProduct(
  productId: string,
  sellerId: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .update({ status: 'deleted' })
      .eq('id', productId)
      .eq('seller_id', sellerId)

    if (error) {
      console.error('Erro ao deletar produto:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar produto:', error)
    return false
  }
}

// Buscar categorias
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}

// Buscar categorias principais (sem parent)
export async function getRootCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)
      .order('name')

    if (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}

// Buscar subcategorias
export async function getSubcategories(parentId: string): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parentId)
      .order('name')

    if (error) {
      console.error('Erro ao buscar subcategorias:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar subcategorias:', error)
    return []
  }
}
