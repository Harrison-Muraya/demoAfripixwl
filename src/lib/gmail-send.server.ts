// Server-only: sends mail through the connected Gmail account via the Lovable connector gateway.
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1'

function base64Url(input: string): string {
  return Buffer.from(input, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function encodeHeader(value: string): string {
  // RFC 2047 encode non-ASCII header values (e.g. subjects with accents).
  return /^[\x20-\x7E]*$/.test(value)
    ? value
    : `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`
}

export interface GmailMessage {
  to: string
  cc?: string | undefined
  replyTo?: string | undefined
  subject: string
  html: string
}


export async function sendGmailMessage({ to, cc, replyTo, subject, html }: GmailMessage) {
  const lovableApiKey = process.env['LOVABLE_API_KEY']
  const connectionKey = process.env['GOOGLE_MAIL_API_KEY']
  if (!lovableApiKey || !connectionKey) {
    throw new Error('Gmail connector is not configured (missing LOVABLE_API_KEY or GOOGLE_MAIL_API_KEY)')
  }

  const headers = [
    `To: ${to}`,
    ...(cc ? [`Cc: ${cc}`] : []),
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${encodeHeader(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
  ]

  const body = Buffer.from(html, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n')
  const raw = base64Url(`${headers.join('\r\n')}\r\n\r\n${body}`)

  const response = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      'X-Connection-Api-Key': connectionKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error(`Gmail send failed [${response.status}]: ${errorBody}`)
    throw new Error(`Gmail send failed [${response.status}]: ${errorBody}`)
  }

  return response.json()
}
