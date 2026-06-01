import * as React from 'react'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface ContactFunderEmailProps {
  name?: string
  email?: string
  organization?: string
  role?: string
  message?: string
}

export const ContactFunderEmail = ({
  name = 'Unknown',
  email = 'No email provided',
  organization = 'Not provided',
  role = 'Not provided',
  message = 'No message provided',
}: ContactFunderEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New doggy funder contact request from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>DOGGY · FUNDER REQUEST</Text>
        <Heading style={h1}>New contact request</Heading>
        <Text style={field}><strong>Name:</strong> {name}</Text>
        <Text style={field}><strong>Email:</strong> {email}</Text>
        <Text style={field}><strong>Organization:</strong> {organization || 'Not provided'}</Text>
        <Text style={field}><strong>Role:</strong> {role || 'Not provided'}</Text>
        <Text style={messageLabel}>Message</Text>
        <Text style={messageBox}>{message || 'No message provided'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactFunderEmail,
  displayName: 'Contact funder request',
  subject: (data) => `Contact Funder request — ${data.name || data.email || 'doggy'}`,
  previewData: {
    name: 'Ofir Investor',
    email: 'ofir@example.com',
    organization: 'Doggy Capital',
    role: 'Investor',
    message: 'I would like access to the execution roadmap.',
  },
  to: 'investdoggy@atomicmail.io',
} satisfies TemplateEntry

export default ContactFunderEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '28px 25px' }
const eyebrow = {
  color: '#f97316',
  fontSize: '11px',
  letterSpacing: '2px',
  margin: '0 0 18px',
}
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#111111',
  margin: '0 0 22px',
}
const field = {
  fontSize: '14px',
  color: '#333333',
  lineHeight: '1.5',
  margin: '0 0 10px',
}
const messageLabel = {
  fontSize: '12px',
  color: '#777777',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  margin: '24px 0 8px',
}
const messageBox = {
  fontSize: '14px',
  color: '#333333',
  lineHeight: '1.6',
  backgroundColor: '#f7f7f7',
  padding: '16px',
  margin: '0',
}