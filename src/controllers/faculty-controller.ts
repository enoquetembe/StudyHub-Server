import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createFacultySchema = z.object({
  name: z.string().nonempty(),
})

export class FacultyController {
  async createFaculty(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name } = createFacultySchema.parse(request.body)

      const faculty = await prisma.faculty.create({
        data: {
          name,
        },
      })

      reply.code(201).send(faculty)
    } catch (error) {
      console.error(error)
      reply.code(400).send({ error: 'Invalid faculty data' })
    }
  }

  async getAllFaculties(request: FastifyRequest, reply: FastifyReply) {
    try {
      const faculties = await prisma.faculty.findMany()

      reply.code(200).send(faculties)
    } catch (error) {
      console.error(error)
      reply.code(500).send({ error: 'Internal Server Error' })
    }
  }
}
