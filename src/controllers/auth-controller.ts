import { FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = 'your-secret-key'

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const userSchema = z.object({
      email: z.string(),
      password: z.string(),
    })
    try {
      const { email, password } = userSchema.parse(request.body)

      const user = await prisma.student.findUnique({ where: { email } })

      if (!user) {
        return reply.code(401).send({ error: 'Invalid email or password' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return reply.code(401).send({ error: 'Invalid email or password' })
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET)

      reply.code(200).send({ token })
    } catch (error) {
      console.error(error)
      reply.code(400).send({ error: 'Invalid login data' })
    }
  }
}
