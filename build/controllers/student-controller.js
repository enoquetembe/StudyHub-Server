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

// src/controllers/student-controller.ts
var student_controller_exports = {};
__export(student_controller_exports, {
  default: () => student_controller_default
});
module.exports = __toCommonJS(student_controller_exports);
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
