import { FastifyInstance } from 'fastify'
import { FacultyController } from '@/controllers/faculty-controller'

const facultyRoutes = async (app: FastifyInstance) => {
  const facultyController = new FacultyController()

  app.post('/faculties', facultyController.createFaculty)
  app.get('/faculties', facultyController.getAllFaculties)
}

export default facultyRoutes
