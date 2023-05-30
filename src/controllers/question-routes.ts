import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createQuestionSchema = z.object({
  content: z.string().nonempty(),
  exam_id: z.string().nonempty(),
})

export class QuestionController {
  async createQuestion(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { content, exam_id } = createQuestionSchema.parse(request.body)

      const question = await prisma.question.create({
        data: {
          content,
          exam: {
            connect: { id: exam_id },
          },
        },
      })

      reply.code(201).send(question)
    } catch (error) {
      console.error(error)
      reply.code(400).send({ error: 'Invalid question data' })
    }
  }

  async getQuestions(request: FastifyRequest, reply: FastifyReply) {
    try {
      const questions = await prisma.question.findMany()

      reply.code(200).send(questions)
    } catch (error) {
      console.error(error)
      reply.code(500).send({ error: 'Internal Server Error' })
    }
  }
}
