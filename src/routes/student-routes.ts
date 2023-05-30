import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import StudentController from '@/controllers/student-controller'

const studentController = new StudentController()

export default async function studentRoutes(app: FastifyInstance) {
  app.post(
    '/students',
    async (request: FastifyRequest, reply: FastifyReply) => {
      await studentController.createStudent(request, reply)
    },
  )
}
