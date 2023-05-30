import { FastifyInstance } from 'fastify'
import { CourseController } from '@/controllers/course-controller'

const courseRoutes = async (app: FastifyInstance) => {
  const courseController = new CourseController()

  app.post('/courses', courseController.createCourse)
  app.get('/courses', courseController.getAllCourses)
}

export default courseRoutes
