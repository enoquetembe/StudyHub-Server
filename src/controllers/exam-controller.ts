import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createExamSchema = z.object({
  title: z.string().nonempty(),
  discipline_id: z.string().nonempty(),
})

export class ExamController {
  async createExam(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { title, discipline_id } = createExamSchema.parse(request.body)

      const exam = await prisma.exam.create({
        data: {
          title,
          discipline: {
            connect: { id: discipline_id },
          },
        },
      })

      reply.code(201).send(exam)
    } catch (error) {
      console.error(error)
      reply.code(400).send({ error: 'Invalid exam data' })
    }
  }

  async getExams(request: FastifyRequest, reply: FastifyReply) {
    try {
      const exams = await prisma.exam.findMany()

      reply.code(200).send(exams)
    } catch (error) {
      console.error(error)
      reply.code(500).send({ error: 'Internal Server Error' })
    }
  }
}
