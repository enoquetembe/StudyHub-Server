import { FastifyInstance } from 'fastify'
import { ExamController } from '@/controllers/exam-controller'

const examRoutes = async (app: FastifyInstance) => {
  const examController = new ExamController()

  app.post('/exams', examController.createExam)
  app.get('/exams', examController.getExams)
}

export default examRoutes
