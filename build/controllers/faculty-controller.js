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

// src/controllers/faculty-controller.ts
var faculty_controller_exports = {};
__export(faculty_controller_exports, {
  FacultyController: () => FacultyController
});
module.exports = __toCommonJS(faculty_controller_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/faculty-controller.ts
var import_zod = require("zod");
var createFacultySchema = import_zod.z.object({
  name: import_zod.z.string().nonempty()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FacultyController
});
