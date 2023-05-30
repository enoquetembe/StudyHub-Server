import { FastifyInstance } from 'fastify'
import { QuestionController } from '@/controllers/question-routes'

const questionRoutes = async (app: FastifyInstance) => {
  const questionController = new QuestionController()

  app.post('/questions', questionController.createQuestion)
  app.get('/questions', questionController.getQuestions)
}

export default questionRoutes
