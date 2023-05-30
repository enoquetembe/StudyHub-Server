"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/exam-routes.ts
var exam_routes_exports = {};
__export(exam_routes_exports, {
  default: () => exam_routes_default
});
module.exports = __toCommonJS(exam_routes_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/exam-controller.ts
var import_zod = require("zod");
var createExamSchema = import_zod.z.object({
  title: import_zod.z.string().nonempty(),
  discipline_id: import_zod.z.string().nonempty()
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
var examRoutes = async (app) => {
  const examController = new ExamController();
  app.post("/exams", examController.createExam);
  app.get("/exams", examController.getExams);
};
var exam_routes_default = examRoutes;
