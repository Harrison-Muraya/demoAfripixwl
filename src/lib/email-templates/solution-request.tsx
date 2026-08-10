import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'
import type { TemplateEntry } from './registry'

export interface SolutionRequestEmailProps {
  name?: string
  business?: string
  email?: string
  phone?: string
  industry?: string
  project?: string
  brief?: string
}

const row: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 6px',
  color: '#1f2933',
}

const labelStyle: React.CSSProperties = {
  color: '#8a94a6',
  fontWeight: 600,
}

function Field({ label, value }: { label: string; value: string | undefined }) {
  return (
    <Text style={row}>
      <span style={labelStyle}>{label}: </span>
      {value && value.trim() ? value : '—'}
    </Text>
  )
}

export function SolutionRequestEmail(props: SolutionRequestEmailProps) {
  const { name, business, email, phone, industry, project, brief } = props
  return (
    <Html>
      <Head />
      <Preview>{`New solution request from ${name || 'a prospect'}`}</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Container style={{ padding: '24px', maxWidth: '560px' }}>
          <Text style={{ color: '#c8102e', fontWeight: 700, letterSpacing: '1px', fontSize: '12px', margin: 0 }}>
            AFRIPIXEL DEMO CENTRE
          </Text>
          <Heading style={{ fontSize: '20px', color: '#0b2b5b', margin: '8px 0 16px' }}>
            New &ldquo;Request Something Similar&rdquo; submission
          </Heading>
          <Section
            style={{
              border: '1px solid #e6e9ef',
              borderRadius: '10px',
              padding: '16px',
            }}
          >
            <Field label="Name" value={name} />
            <Field label="Business" value={business} />
            <Field label="Email" value={email} />
            <Field label="Phone" value={phone} />
            <Field label="Industry" value={industry} />
            <Field label="Project of interest" value={project} />
            <Hr style={{ borderColor: '#e6e9ef', margin: '12px 0' }} />
            <Text style={{ ...labelStyle, fontSize: '13px', margin: '0 0 4px' }}>What they want built</Text>
            <Text style={{ ...row, whiteSpace: 'pre-wrap' }}>{brief && brief.trim() ? brief : '—'}</Text>
          </Section>
          <Text style={{ fontSize: '12px', color: '#8a94a6', marginTop: '16px' }}>
            Sent automatically from the Afripixel Demo Centre.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: SolutionRequestEmail,
  displayName: 'Solution Request Notification',
  subject: (data: Record<string, any>) =>
    `New solution request${data['name'] ? ` from ${data['name']}` : ''}${data['project'] ? ` — ${data['project']}` : ''}`,
  previewData: {
    name: 'Amina Yusuf',
    business: 'Bright Future Academy',
    email: 'amina@brightfuture.co.ke',
    phone: '+254 700 123 456',
    industry: 'Education',
    project: 'GrammarSpire',
    brief: 'We would like a learning portal similar to GrammarSpire for our 600 students.',
  },
} satisfies TemplateEntry
