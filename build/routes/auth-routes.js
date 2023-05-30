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

// src/routes/auth-routes.ts
var auth_routes_exports = {};
__export(auth_routes_exports, {
  default: () => authRoutes
});
module.exports = __toCommonJS(auth_routes_exports);

// src/controllers/auth-controller.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/auth-controller.ts
var JWT_SECRET = "your-secret-key";
var AuthController = class {
  async login(request, reply) {
    const userSchema = import_zod.z.object({
      email: import_zod.z.string(),
      password: import_zod.z.string()
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
async function authRoutes(app) {
  const authController = new AuthController();
  app.post("/login", authController.login.bind(authController));
}
