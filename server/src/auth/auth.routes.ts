import { FastifyInstance } from 'fastify';

export default function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', async (_request, reply) => {
    const token = await reply.jwtSign({
      id: 'c013e60a-80ec-4e1e-ab6d-f59e07ae47be',
      name: 'mat',
      role: ['admin', 'user'],
    });

    reply
      .setCookie('token', token, {
        domain: 'localhost',
        path: '/',
        secure: false, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
      })
      .code(200)
      .send({ data: token });
  });

  app.post('/auth/logout', async (_request, reply) => {
    reply
      .setCookie('token', '', {
        domain: 'localhost',
        path: '/',
        secure: false, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
      })
      .code(200)
      .send({ data: true });
  });

  app.get(
    '/auth/user',
    {
      preValidation: [app.authenticate],
    },
    async function (request, _reply) {
      return request.user;
    }
  );

  return app;
}
