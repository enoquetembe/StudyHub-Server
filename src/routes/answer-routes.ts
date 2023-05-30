import { FastifyInstance } from 'fastify'
import { AnswerController } from '@/controllers/answer-controller'

const answerRoutes = async (app: FastifyInstance) => {
  const answerController = new AnswerController()

  app.post('/answers', answerController.createAnswer)
  app.get('/answers', answerController.getAnswers)
}

export default answerRoutes
