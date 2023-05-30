import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createAnswerSchema = z.object({
  content: z.string().nonempty(),
  question_id: z.string().nonempty(),
})

export class AnswerController {
  async createAnswer(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { content, question_id } = createAnswerSchema.parse(request.body)

      const answer = await prisma.answer.create({
        data: {
          content,
          question: {
            connect: { id: question_id },
          },
        },
      })

      reply.code(201).send(answer)
    } catch (error) {
      console.error(error)
      reply.code(400).send({ error: 'Invalid answer data' })
    }
  }

  async getAnswers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const answers = await prisma.answer.findMany()

      reply.code(200).send(answers)
    } catch (error) {
      console.error(error)
      reply.code(500).send({ error: 'Internal Server Error' })
    }
  }
}
