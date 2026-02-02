import { supabase } from './supabase'

// Upload de uma imagem para o bucket de produtos
export async function uploadProductImage(
  file: File,
  userId: string
): Promise<{ url: string; path: string } | null> {
  try {
    // Gerar nome único para o arquivo
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${userId}/${fileName}`

    // Upload do arquivo
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Erro no upload:', uploadError)
      return null
    }

    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath)

    return {
      url: publicUrl,
      path: filePath,
    }
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return null
  }
}

// Upload de múltiplas imagens
export async function uploadProductImages(
  files: File[],
  userId: string
): Promise<string[]> {
  const urls: string[] = []

  for (const file of files) {
    const result = await uploadProductImage(file, userId)
    if (result) {
      urls.push(result.url)
    }
  }

  return urls
}

// Deletar uma imagem
export async function deleteProductImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('products')
      .remove([path])

    if (error) {
      console.error('Erro ao deletar:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar imagem:', error)
    return false
  }
}

// Extrair path do URL público
export function getPathFromUrl(url: string): string | null {
  try {
    const match = url.match(/\/products\/(.+)$/)
    return match ? match[1] : null
  } catch {
    return null
  }
}
