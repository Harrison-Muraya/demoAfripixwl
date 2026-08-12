import * as React from 'react'
import { render } from '@react-email/render'
import { TEMPLATES } from '@/lib/email-templates/registry'
import { sendGmailMessage } from '@/lib/gmail-send.server'

export async function sendSolutionRequestEmail(data: Record<string, any>, replyTo?: string) {
  const entry = TEMPLATES['solution-request']
  if (!entry) throw new Error("Template 'solution-request' not found")

  const html = await render(React.createElement(entry.component, data))
  const subject = typeof entry.subject === 'function' ? entry.subject(data) : entry.subject

  return sendGmailMessage({
    to: 'harrisonmuraya8@gmail.com',
    // cc: '.com',
    // to: 'support@afripixelsolutions.com',
    // cc: 'jane@afripixelsolutions.com',
    replyTo,
    subject,
    html,
  })
}
