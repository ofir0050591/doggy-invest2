import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const ContactEmailSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  organization: z.string().trim().max(160).optional().default(''),
  role: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
})

/**
 * Simplified Contact Function
 * This sends the form data to Formspree, which handles the email delivery
 * to investdoggy@atomicmail.io without needing a complex database queue.
 */
export const sendContactFunderEmail = createServerFn({ method: 'POST' })
  .inputValidator((input) => ContactEmailSchema.parse(input))
  .handler(async ({ data }) => {
    // Replace this ID with your actual Formspree form ID
    // You can get one for free at https://formspree.io
    const FORMSPREE_ID = 'xzzzkpzo' 
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          subject: `New Contact Request from ${data.name}`,
          ...data
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send to Formspree')
      }

      return { success: true }
    } catch (error) {
      console.error('Email send error:', error)
      throw new Error('Could not send email yet')
    }
  })
