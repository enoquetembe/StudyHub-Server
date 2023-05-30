import { FastifyInstance } from 'fastify'
import { AuthController } from '@/controllers/auth-controller'

export default async function authRoutes(app: FastifyInstance) {
  const authController = new AuthController()

  app.post('/login', authController.login.bind(authController))
}
