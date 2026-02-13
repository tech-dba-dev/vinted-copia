import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface NewMessageNotificationProps {
  recipientName: string
  senderName: string
  messagePreview: string
  productTitle: string
  productImage?: string
  conversationUrl: string
}

export default function NewMessageNotification({
  recipientName = 'Utilizador',
  senderName = 'Remetente',
  messagePreview = 'Olá! Tenho interesse no seu produto.',
  productTitle = 'Produto',
  productImage,
  conversationUrl = 'https://localhost:3000/mensagens',
}: NewMessageNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Nova mensagem de {senderName} sobre {productTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Marketplace</Heading>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading style={h2}>Olá {recipientName}!</Heading>

            <Text style={text}>
              Recebeu uma nova mensagem de <strong>{senderName}</strong> sobre o produto:
            </Text>

            {/* Product Info */}
            <Section style={productSection}>
              {productImage && (
                <Img
                  src={productImage}
                  alt={productTitle}
                  width="80"
                  height="80"
                  style={productImage_}
                />
              )}
              <Text style={productTitle_}>{productTitle}</Text>
            </Section>

            {/* Message Preview */}
            <Section style={messageBox}>
              <Text style={messageLabel}>Mensagem:</Text>
              <Text style={messageText}>{messagePreview}</Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={conversationUrl}>
                Ver Conversa
              </Button>
            </Section>

            <Text style={text}>
              Ou copie e cole este link no seu navegador:
            </Text>
            <Link href={conversationUrl} style={link}>
              {conversationUrl}
            </Link>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              Este email foi enviado porque recebeu uma nova mensagem no Marketplace.
              <br />
              Para desativar notificações por email, aceda às suas{' '}
              <Link href={`${conversationUrl.split('/mensagens')[0]}/configuracoes`} style={link}>
                configurações
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  padding: '24px',
  backgroundColor: '#059669',
  textAlign: 'center' as const,
}

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
}

const content = {
  padding: '0 48px',
}

const h2 = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
}

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const productSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  margin: '24px 0',
}

const productImage_ = {
  borderRadius: '8px',
  objectFit: 'cover' as const,
}

const productTitle_ = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
}

const messageBox = {
  backgroundColor: '#f3f4f6',
  borderLeft: '4px solid #059669',
  padding: '16px',
  margin: '24px 0',
  borderRadius: '4px',
}

const messageLabel = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
}

const messageText = {
  color: '#1f2937',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  fontStyle: 'italic',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#059669',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
}

const link = {
  color: '#059669',
  fontSize: '14px',
  textDecoration: 'underline',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '42px 0',
}

const footer = {
  padding: '0 48px',
}

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
}
