import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createDisciplineSchema = z.object({
  name: z.string().nonempty(),
  course_id: z.string().nonempty(),
})

export class DisciplineController {
  async createDiscipline(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, course_id } = createDisciplineSchema.parse(request.body)

      const discipline = await prisma.discipline.create({
        data: {
          name,
          course: {
            connect: { id: course_id },
          },
        },
      })

      reply.code(201).send(discipline)
    } catch (error) {
      console.error(error)
      reply.code(400).send({ error: 'Invalid discipline data' })
    }
  }

  async getDisciplines(request: FastifyRequest, reply: FastifyReply) {
    try {
      const disciplines = await prisma.discipline.findMany()

      reply.code(200).send(disciplines)
    } catch (error) {
      console.error(error)
      reply.code(500).send({ error: 'Internal Server Error' })
    }
  }
}
