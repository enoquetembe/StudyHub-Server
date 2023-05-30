"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));

// src/controllers/student-controller.ts
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/student-controller.ts
var studentSchema = import_zod.z.object({
  name: import_zod.z.string().min(1).max(255),
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(6).max(50)
});
var StudentController = class {
  async createStudent(request, reply) {
    try {
      const { name, email, password } = studentSchema.parse(request.body);
      const student = await prisma.student.create({
        data: {
          name,
          email,
          password
        }
      });
      reply.code(201).send(student);
    } catch (error) {
      console.error(error);
      reply.code(400).send({ error: "Invalid student data" });
    }
  }
};
var student_controller_default = StudentController;

// src/routes/student-routes.ts
var studentController = new student_controller_default();
async function studentRoutes(app2) {
  app2.post(
    "/students",
    async (request, reply) => {
      await studentController.createStudent(request, reply);
    }
  );
}

// src/controllers/course-controller.ts
var import_zod2 = require("zod");
var courseSchema = import_zod2.z.object({
  name: import_zod2.z.string().min(1).max(255),
  faculty_id: import_zod2.z.string(),
  student_id: import_zod2.z.string()
});
var CourseController = class {
  async createCourse(request, reply) {
    try {
      const { name, faculty_id, student_id } = courseSchema.parse(request.body);
      const course = await prisma.course.create({
        data: {
          name,
          faculty: { connect: { id: faculty_id } },
          student: { connect: { id: student_id } }
        }
      });
      reply.code(201).send(course);
    } catch (error) {
      console.error(error);
      reply.code(400).send({ error: "Invalid course data" });
    }
  }
  async getAllCourses(_, reply) {
    try {
      const courses = await prisma.course.findMany();
      reply.send(courses);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Failed to fetch courses" });
    }
  }
};

// src/routes/course-routes.ts
var courseRoutes = async (app2) => {
  const courseController = new CourseController();
  app2.post("/courses", courseController.createCourse);
  app2.get("/courses", courseController.getAllCourses);
};
var course_routes_default = courseRoutes;

// src/controllers/faculty-controller.ts
var import_zod3 = require("zod");
var createFacultySchema = import_zod3.z.object({
  name: import_zod3.z.string().nonempty()
});
var FacultyController = class {
  async createFaculty(request, reply) {
    try {
      const { name } = createFacultySchema.parse(request.body);
      const faculty = await prisma.faculty.create({
        data: {
          name
        }
      });
      reply.code(201).send(faculty);
    } catch (error) {
      console.error(error);
      reply.code(400).send({ error: "Invalid faculty data" });
    }
  }
  async getAllFaculties(request, reply) {
    try {
      const faculties = await prisma.faculty.findMany();
      reply.code(200).send(faculties);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  }
};

// src/routes/faculties-routes.ts
var facultyRoutes = async (app2) => {
  const facultyController = new FacultyController();
  app2.post("/faculties", facultyController.createFaculty);
  app2.get("/faculties", facultyController.getAllFaculties);
};
var faculties_routes_default = facultyRoutes;

// src/controllers/auth-controller.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_zod4 = require("zod");
var JWT_SECRET = "your-secret-key";
var AuthController = class {
  async login(request, reply) {
    const userSchema = import_zod4.z.object({
      email: import_zod4.z.string(),
      password: import_zod4.z.string()
    });
    try {
      const { email, password } = userSchema.parse(request.body);
      const user = await prisma.student.findUnique({ where: { email } });
      if (!user) {
        return reply.code(401).send({ error: "Invalid email or password" });
      }
      const isPasswordValid = await import_bcryptjs.default.compare(password, user.password);
      if (!isPasswordValid) {
        return reply.code(401).send({ error: "Invalid email or password" });
      }
      const token = import_jsonwebtoken.default.sign({ userId: user.id }, JWT_SECRET);
      reply.code(200).send({ token });
    } catch (error) {
      console.error(error);
      reply.code(400).send({ error: "Invalid login data" });
    }
  }
};

// src/routes/auth-routes.ts
async function authRoutes(app2) {
  const authController = new AuthController();
  app2.post("/login", authController.login.bind(authController));
}

// src/controllers/discipline-controller.ts
var import_zod5 = require("zod");
var createDisciplineSchema = import_zod5.z.object({
  name: import_zod5.z.string().nonempty(),
  course_id: import_zod5.z.string().nonempty()
});
var DisciplineController = class {
  async createDiscipline(request, reply) {
    try {
      const { name, course_id } = createDisciplineSchema.parse(request.body);
      const discipline = await prisma.discipline.create({
        data: {
          name,
          course: {
            connect: { id: course_id }
          }
        }
      });
      reply.code(201).send(discipline);
    } catch (error) {
      console.error(error);
      reply.code(400).send({ error: "Invalid discipline data" });
    }
  }
  async getDisciplines(request, reply) {
    try {
      const disciplines = await prisma.discipline.findMany();
      reply.code(200).send(disciplines);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  }
};

// src/routes/discipline-routes.ts
var disciplineRoutes = async (app2) => {
  const disciplineController = new DisciplineController();
  app2.post("/disciplines", disciplineController.createDiscipline);
  app2.get("/disciplines", disciplineController.getDisciplines);
};
var discipline_routes_default = disciplineRoutes;

// src/controllers/exam-controller.ts
var import_zod6 = require("zod");
var createExamSchema = import_zod6.z.object({
  title: import_zod6.z.string().nonempty(),
  discipline_id: import_zod6.z.string().nonempty()
});
var ExamController = class {
  async createExam(request, reply) {
    try {
      const { title, discipline_id } = createExamSchema.parse(request.body);
      const exam = await prisma.exam.create({
        data: {
          title,
          discipline: {
            connect: { id: discipline_id }
          }
        }
      });
      reply.code(201).send(exam);
    } catch (error) {
      console.error(error);
      reply.code(400).send({ error: "Invalid exam data" });
    }
  }
  async getExams(request, reply) {
    try {
      const exams = await prisma.exam.findMany();
      reply.code(200).send(exams);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  }
};

// src/routes/exam-routes.ts
var examRoutes = async (app2) => {
  const examController = new ExamController();
  app2.post("/exams", examController.createExam);
  app2.get("/exams", examController.getExams);
};
var exam_routes_default = examRoutes;

// src/controllers/question-routes.ts
var import_zod7 = require("zod");
var createQuestionSchema = import_zod7.z.object({
  content: import_zod7.z.string().nonempty(),
  exam_id: import_zod7.z.string().nonempty()
});
var QuestionController = class {
  async createQuestion(request, reply) {
    try {
      const { content, exam_id } = createQuestionSchema.parse(request.body);
      const question = await prisma.question.create({
        data: {
          content,
          exam: {
            connect: { id: exam_id }
          }
        }
      });
      reply.code(201).send(question);
    } catch (error) {
      console.error(error);
      reply.code(400).send({ error: "Invalid question data" });
    }
  }
  async getQuestions(request, reply) {
    try {
      const questions = await prisma.question.findMany();
      reply.code(200).send(questions);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  }
};

// src/routes/question-routes.ts
var questionRoutes = async (app2) => {
  const questionController = new QuestionController();
  app2.post("/questions", questionController.createQuestion);
  app2.get("/questions", questionController.getQuestions);
};
var question_routes_default = questionRoutes;

// src/controllers/answer-controller.ts
var import_zod8 = require("zod");
var createAnswerSchema = import_zod8.z.object({
  content: import_zod8.z.string().nonempty(),
  question_id: import_zod8.z.string().nonempty()
});
var AnswerController = class {
  async createAnswer(request, reply) {
    try {
      const { content, question_id } = createAnswerSchema.parse(request.body);
      const answer = await prisma.answer.create({
        data: {
          content,
          question: {
            connect: { id: question_id }
          }
        }
      });
      reply.code(201).send(answer);
    } catch (error) {
      console.error(error);
      reply.code(400).send({ error: "Invalid answer data" });
    }
  }
  async getAnswers(request, reply) {
    try {
      const answers = await prisma.answer.findMany();
      reply.code(200).send(answers);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  }
};

// src/routes/answer-routes.ts
var answerRoutes = async (app2) => {
  const answerController = new AnswerController();
  app2.post("/answers", answerController.createAnswer);
  app2.get("/answers", answerController.getAnswers);
};
var answer_routes_default = answerRoutes;

// src/app.ts
var app = (0, import_fastify.default)();
app.register(authRoutes);
app.register(studentRoutes);
app.register(course_routes_default);
app.register(faculties_routes_default);
app.register(discipline_routes_default);
app.register(exam_routes_default);
app.register(question_routes_default);
app.register(answer_routes_default);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
