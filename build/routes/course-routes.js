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

// src/routes/course-routes.ts
var course_routes_exports = {};
__export(course_routes_exports, {
  default: () => course_routes_default
});
module.exports = __toCommonJS(course_routes_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/course-controller.ts
var import_zod = require("zod");
var courseSchema = import_zod.z.object({
  name: import_zod.z.string().min(1).max(255),
  faculty_id: import_zod.z.string(),
  student_id: import_zod.z.string()
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
var courseRoutes = async (app) => {
  const courseController = new CourseController();
  app.post("/courses", courseController.createCourse);
  app.get("/courses", courseController.getAllCourses);
};
var course_routes_default = courseRoutes;
