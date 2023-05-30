import fastify from 'fastify'
import studentRoutes from './routes/student-routes'
import courseRoutes from './routes/course-routes'
import facultyRoutes from './routes/faculties-routes'
import authRoutes from './routes/auth-routes'
import disciplineRoutes from './routes/discipline-routes'
import examRoutes from './routes/exam-routes'
import questionRoutes from './routes/question-routes'
import answerRoutes from './routes/answer-routes'

export const app = fastify()

app.register(authRoutes)
app.register(studentRoutes)
app.register(courseRoutes)
app.register(facultyRoutes)
app.register(disciplineRoutes)
app.register(examRoutes)
app.register(questionRoutes)
app.register(answerRoutes)
