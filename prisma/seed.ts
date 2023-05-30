/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.faculty.deleteMany()
  await prisma.student.deleteMany()
  await prisma.course.deleteMany()
  await prisma.discipline.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.question.deleteMany()
  await prisma.answer.deleteMany()

  const faculty1 = await prisma.faculty.create({
    data: {
      name: 'Faculty 1',
    },
  })

  const faculty2 = await prisma.faculty.create({
    data: {
      name: 'Faculty 2',
    },
  })

  const student1 = await prisma.student.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
  })

  const student2 = await prisma.student.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
    },
  })

  const course1 = await prisma.course.create({
    data: {
      name: 'Course 1',
      faculty_id: faculty1.id,
      student_id: student1.id,
    },
  })

  const course2 = await prisma.course.create({
    data: {
      name: 'Course 2',
      faculty_id: faculty2.id,
      student_id: student2.id,
    },
  })

  const discipline1 = await prisma.discipline.create({
    data: {
      name: 'Discipline 1',
      course_id: course1.id,
    },
  })

  const discipline2 = await prisma.discipline.create({
    data: {
      name: 'Discipline 2',
      course_id: course2.id,
    },
  })

  const exam1 = await prisma.exam.create({
    data: {
      title: 'Exam 1',
      discipline_id: discipline1.id,
    },
  })

  const exam2 = await prisma.exam.create({
    data: {
      title: 'Exam 2',
      discipline_id: discipline2.id,
    },
  })

  const question1 = await prisma.question.create({
    data: {
      content: 'Question 1',
      exam_id: exam1.id,
    },
  })

  const question2 = await prisma.question.create({
    data: {
      content: 'Question 2',
      exam_id: exam2.id,
    },
  })

  await prisma.answer.create({
    data: {
      content: 'Answer 1',
      question_id: question1.id,
    },
  })

  await prisma.answer.create({
    data: {
      content: 'Answer 2',
      question_id: question2.id,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
