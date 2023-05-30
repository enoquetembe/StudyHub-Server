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

// src/routes/answer-routes.ts
var answer_routes_exports = {};
__export(answer_routes_exports, {
  default: () => answer_routes_default
});
module.exports = __toCommonJS(answer_routes_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/answer-controller.ts
var import_zod = require("zod");
var createAnswerSchema = import_zod.z.object({
  content: import_zod.z.string().nonempty(),
  question_id: import_zod.z.string().nonempty()
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
var answerRoutes = async (app) => {
  const answerController = new AnswerController();
  app.post("/answers", answerController.createAnswer);
  app.get("/answers", answerController.getAnswers);
};
var answer_routes_default = answerRoutes;
