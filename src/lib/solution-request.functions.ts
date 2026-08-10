import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const requestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  business: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().default(''),
  industry: z.string().trim().max(120).optional().default(''),
  project: z.string().trim().max(160).optional().default(''),
  brief: z.string().trim().max(4000).optional().default(''),
})

export const submitSolutionRequest = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => requestSchema.parse(data))
  .handler(async ({ data }) => {
    const { sendSolutionRequestEmail } = await import('@/lib/solution-request-email.server')
    await sendSolutionRequestEmail(data, data.email)
    return { ok: true }
  })

