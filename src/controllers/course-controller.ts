import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const courseSchema = z.object({
  name: z.string().min(1).max(255),
  faculty_id: z.string(),
  student_id: z.string(),
})

export class CourseController {
  async createCourse(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, faculty_id, student_id } = courseSchema.parse(request.body)

      const course = await prisma.course.create({
        data: {
          name,
          faculty: { connect: { id: faculty_id } },
          student: { connect: { id: student_id } },
        },
      })

      reply.code(201).send(course)
    } catch (error) {
      console.error(error)
      reply.code(400).send({ error: 'Invalid course data' })
    }
  }

  async getAllCourses(_: FastifyRequest, reply: FastifyReply) {
    try {
      const courses = await prisma.course.findMany()
      reply.send(courses)
    } catch (error) {
      console.error(error)
      reply.code(500).send({ error: 'Failed to fetch courses' })
    }
  }
}
