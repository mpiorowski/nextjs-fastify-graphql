import { FastifyInstance } from "fastify";
import { getUserByEmail } from "../db/users.db";

export default function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", async (_request, reply) => {
    // TODO - auth
    const user = await getUserByEmail("mateuszpiorowski@gmail.com");

    const token = await reply.jwtSign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: ["admin", "user"],
    });

    reply
      .setCookie("token", token, {
        domain: "localhost",
        path: "/",
        secure: false, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
      })
      .code(200)
      .send({ data: token });
  });

  app.post("/auth/logout", async (_request, reply) => {
    reply
      .setCookie("token", "", {
        domain: "localhost",
        path: "/",
        secure: false, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
      })
      .code(200)
      .send({ data: true });
  });

  app.get(
    "/auth/user",
    {
      preValidation: [app.authenticate],
    },
    async function (request) {
      return request.user;
    },
  );

  return app;
}
