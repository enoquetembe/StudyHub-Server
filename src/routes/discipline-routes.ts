import { FastifyInstance } from 'fastify'
import { DisciplineController } from '@/controllers/discipline-controller'

const disciplineRoutes = async (app: FastifyInstance) => {
  const disciplineController = new DisciplineController()

  app.post('/disciplines', disciplineController.createDiscipline)
  app.get('/disciplines', disciplineController.getDisciplines)
}

export default disciplineRoutes
