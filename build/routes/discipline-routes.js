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

// src/routes/discipline-routes.ts
var discipline_routes_exports = {};
__export(discipline_routes_exports, {
  default: () => discipline_routes_default
});
module.exports = __toCommonJS(discipline_routes_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/discipline-controller.ts
var import_zod = require("zod");
var createDisciplineSchema = import_zod.z.object({
  name: import_zod.z.string().nonempty(),
  course_id: import_zod.z.string().nonempty()
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
var disciplineRoutes = async (app) => {
  const disciplineController = new DisciplineController();
  app.post("/disciplines", disciplineController.createDiscipline);
  app.get("/disciplines", disciplineController.getDisciplines);
};
var discipline_routes_default = disciplineRoutes;
