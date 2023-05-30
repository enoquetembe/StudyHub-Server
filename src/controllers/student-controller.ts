import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

const studentSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(50),
})

class StudentController {
  async createStudent(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password } = studentSchema.parse(request.body)

      const student = await prisma.student.create({
        data: {
          name,
          email,
          password,
        },
      })

      reply.code(201).send(student)
    } catch (error) {
      console.error(error)
      reply.code(400).send({ error: 'Invalid student data' })
    }
  }
}

export default StudentController
