import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { TEMPLATES } from '@/lib/email-templates/registry'

const ContactEmailSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  organization: z.string().trim().max(160).optional().default(''),
  role: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
})

const SITE_NAME = 'invest-doggy'
const SENDER_DOMAIN = 'notify.www.doggyinvest.com'
const FROM_DOMAIN = 'www.doggyinvest.com'

export const sendContactFunderEmail = createServerFn({ method: 'POST' })
  .inputValidator((input) => ContactEmailSchema.parse(input))
  .handler(async ({ data }) => {
    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Email is not configured yet')
    }

    const template = TEMPLATES['contact-funder']
    if (!template?.to) {
      throw new Error('Contact email template is not configured')
    }

    const element = React.createElement(template.component, data)
    const html = await render(element)
    const text = await render(element, { plainText: true })
    const subject = typeof template.subject === 'function' ? template.subject(data) : template.subject
    const messageId = crypto.randomUUID()
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: 'contact-funder',
      recipient_email: template.to,
      status: 'pending',
      metadata: { reply_to: data.email },
    })

    const { error } = await supabase.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to: template.to,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: 'transactional',
        label: 'contact-funder',
        idempotency_key: messageId,
        queued_at: new Date().toISOString(),
      },
    })

    if (error) {
      await supabase.from('email_send_log').insert({
        message_id: messageId,
        template_name: 'contact-funder',
        recipient_email: template.to,
        status: 'failed',
        error_message: 'Failed to enqueue contact email',
      })
      throw new Error('Could not send email yet')
    }

    return { success: true }
  })