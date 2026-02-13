import { supabase } from './supabase'
import type { Product } from '@/types/database'

export type SearchFilters = {
  q?: string // Texto de busca
  category_id?: string // DEPRECATED: use category_ids
  category_ids?: string[] // Array de IDs de categorias (para buscar em múltiplas)
  min_price?: number
  max_price?: number
  brands?: string[]
  sizes?: string[]
  conditions?: string[]
  colors?: string[]
  sort?: 'recent' | 'price_asc' | 'price_desc'
  limit?: number
  offset?: number
}

/**
 * Busca produtos com filtros avançados
 */
export async function searchProducts(filters: SearchFilters = {}): Promise<{
  products: Product[]
  total: number
}> {
  try {
    console.log('[searchProducts] ===== INÍCIO DA BUSCA NO BANCO =====');
    console.log('[searchProducts] Filtros recebidos:', filters);

    let query = supabase
      .from('products')
      .select('*, seller:profiles(*), category:categories(*)', { count: 'exact' })
      .eq('status', 'available')

    console.log('[searchProducts] Query base criada: products com status=available');

    // Filtro por texto de busca (title ou description)
    if (filters.q) {
      console.log('[searchProducts] Aplicando filtro de texto:', filters.q);
      query = query.or(`title.ilike.%${filters.q}%,description.ilike.%${filters.q}%`)
    }

    // Filtro por categoria (suporta múltiplas categorias)
    if (filters.category_ids && filters.category_ids.length > 0) {
      console.log('[searchProducts] ✅ Aplicando filtro de category_ids:', filters.category_ids);
      query = query.in('category_id', filters.category_ids)
    } else if (filters.category_id) {
      // Manter compatibilidade com código antigo
      console.log('[searchProducts] ✅ Aplicando filtro de categoria_id (deprecated):', filters.category_id);
      query = query.eq('category_id', filters.category_id)
    } else {
      console.log('[searchProducts] Sem filtro de categoria (buscando todos)');
    }

    // Filtro por preço mínimo
    if (filters.min_price !== undefined) {
      console.log('[searchProducts] Aplicando filtro de preço mínimo:', filters.min_price);
      query = query.gte('price', filters.min_price)
    }

    // Filtro por preço máximo
    if (filters.max_price !== undefined) {
      console.log('[searchProducts] Aplicando filtro de preço máximo:', filters.max_price);
      query = query.lte('price', filters.max_price)
    }

    // Filtro por marcas (dynamic_attributes->>brand)
    if (filters.brands && filters.brands.length > 0) {
      console.log('[searchProducts] Aplicando filtro de marcas:', filters.brands);
      const quoted = filters.brands.map(b => `"${b}"`).join(',')
      query = query.filter('dynamic_attributes->>brand', 'in', `(${quoted})`)
    }

    // Filtro por tamanhos (dynamic_attributes->>size)
    if (filters.sizes && filters.sizes.length > 0) {
      console.log('[searchProducts] Aplicando filtro de tamanhos:', filters.sizes);
      const quoted = filters.sizes.map(s => `"${s}"`).join(',')
      query = query.filter('dynamic_attributes->>size', 'in', `(${quoted})`)
    }

    // Filtro por condição (dynamic_attributes->>condition)
    // Suporta tanto "Muito Bom" quanto "muito-bom" (formatos inconsistentes no DB)
    if (filters.conditions && filters.conditions.length > 0) {
      console.log('[searchProducts] Aplicando filtro de condições:', filters.conditions);
      const allValues = filters.conditions.flatMap(c => [
        c,                                      // "Muito Bom"
        c.toLowerCase().replace(/\s+/g, '-'),   // "muito-bom"
      ])
      const uniqueValues = [...new Set(allValues)]
      const quoted = uniqueValues.map(v => `"${v}"`).join(',')
      query = query.filter('dynamic_attributes->>condition', 'in', `(${quoted})`)
    }

    // Filtro por cores (dynamic_attributes->>color)
    if (filters.colors && filters.colors.length > 0) {
      console.log('[searchProducts] Aplicando filtro de cores:', filters.colors);
      const quoted = filters.colors.map(c => `"${c}"`).join(',')
      query = query.filter('dynamic_attributes->>color', 'in', `(${quoted})`)
    }

    // Ordenação
    switch (filters.sort) {
      case 'price_asc':
        console.log('[searchProducts] Ordenação: preço crescente');
        query = query.order('price', { ascending: true })
        break
      case 'price_desc':
        console.log('[searchProducts] Ordenação: preço decrescente');
        query = query.order('price', { ascending: false })
        break
      case 'recent':
      default:
        console.log('[searchProducts] Ordenação: mais recentes');
        query = query.order('created_at', { ascending: false })
        break
    }

    // Paginação
    const limit = filters.limit || 20
    const offset = filters.offset || 0
    console.log('[searchProducts] Paginação: offset', offset, 'limit', limit);
    query = query.range(offset, offset + limit - 1)

    console.log('[searchProducts] Executando query no Supabase...');
    const { data, error, count } = await query

    if (error) {
      console.error('[searchProducts] ❌ ERRO do Supabase:', error)
      return { products: [], total: 0 }
    }

    console.log('[searchProducts] ✅ Sucesso! Produtos encontrados:', data?.length || 0, 'Total:', count);
    if (data && data.length > 0) {
      console.log('[searchProducts] Primeiro produto:', {
        id: data[0].id,
        title: data[0].title,
        category_id: data[0].category_id,
        category_name: data[0].category?.name
      });
    }
    console.log('[searchProducts] ===== FIM DA BUSCA NO BANCO =====');

    return {
      products: data || [],
      total: count || 0,
    }
  } catch (error) {
    console.error('[searchProducts] ❌ EXCEÇÃO ao buscar produtos:', error)
    return { products: [], total: 0 }
  }
}

/**
 * Busca produtos relacionados/similares
 */
export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit: number = 4
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, seller:profiles(*), category:categories(*)')
      .eq('status', 'available')
      .eq('category_id', categoryId)
      .neq('id', productId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Erro ao buscar produtos relacionados:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar produtos relacionados:', error)
    return []
  }
}
