import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import NewMessageNotification from '@/emails/NewMessageNotification'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messageId, conversationId } = body

    if (!messageId || !conversationId) {
      return NextResponse.json(
        { error: 'messageId e conversationId são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar detalhes da mensagem
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .select('*, sender:profiles!sender_id(id, username, full_name)')
      .eq('id', messageId)
      .single()

    if (messageError || !message) {
      console.error('Erro ao buscar mensagem:', messageError)
      return NextResponse.json({ error: 'Mensagem não encontrada' }, { status: 404 })
    }

    // Buscar detalhes da conversa
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select(`
        *,
        buyer:profiles!buyer_id(id, username, full_name),
        seller:profiles!seller_id(id, username, full_name),
        product:products!product_id(id, title, images)
      `)
      .eq('id', conversationId)
      .single()

    if (convError || !conversation) {
      console.error('Erro ao buscar conversa:', convError)
      return NextResponse.json({ error: 'Conversa não encontrada' }, { status: 404 })
    }

    // Determinar quem é o destinatário (quem NÃO enviou a mensagem)
    const senderId = message.sender_id
    const isSellerSender = senderId === conversation.seller_id
    const recipient = isSellerSender ? conversation.buyer : conversation.seller
    const sender = isSellerSender ? conversation.seller : conversation.buyer

    // Buscar email do destinatário da tabela auth.users via RPC
    const { data: recipientEmail, error: fetchEmailError } = await supabase
      .rpc('get_user_email', { user_id: recipient.id })

    if (fetchEmailError || !recipientEmail) {
      console.log('Destinatário não tem email cadastrado:', fetchEmailError)
      return NextResponse.json({
        success: false,
        message: 'Destinatário não tem email cadastrado'
      })
    }

    // URL da conversa
    const conversationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/mensagens?conversation=${conversationId}`

    // Preparar dados do email
    const emailHtml = await render(
      NewMessageNotification({
        recipientName: recipient.full_name || recipient.username || 'Utilizador',
        senderName: sender?.full_name || sender?.username || 'Utilizador',
        messagePreview: message.content.substring(0, 150),
        productTitle: conversation.product?.title || 'Produto',
        productImage: conversation.product?.images?.[0],
        conversationUrl,
      })
    )

    // Enviar email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Marketplace <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `Nova mensagem de ${sender?.username || 'um utilizador'} sobre ${conversation.product?.title || 'o seu produto'}`,
      html: emailHtml,
    })

    if (emailError) {
      console.error('Erro ao enviar email:', emailError)
      return NextResponse.json(
        { error: 'Erro ao enviar email', details: emailError },
        { status: 500 }
      )
    }

    console.log('Email enviado com sucesso:', emailData)

    return NextResponse.json({
      success: true,
      emailId: emailData?.id,
      message: 'Notificação enviada com sucesso'
    })

  } catch (error) {
    console.error('Erro na API de notificação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: String(error) },
      { status: 500 }
    )
  }
}
