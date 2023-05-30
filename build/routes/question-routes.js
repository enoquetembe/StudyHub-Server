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

// src/routes/question-routes.ts
var question_routes_exports = {};
__export(question_routes_exports, {
  default: () => question_routes_default
});
module.exports = __toCommonJS(question_routes_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/question-routes.ts
var import_zod = require("zod");
var createQuestionSchema = import_zod.z.object({
  content: import_zod.z.string().nonempty(),
  exam_id: import_zod.z.string().nonempty()
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
var questionRoutes = async (app) => {
  const questionController = new QuestionController();
  app.post("/questions", questionController.createQuestion);
  app.get("/questions", questionController.getQuestions);
};
var question_routes_default = questionRoutes;
