import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyJWT from 'fastify-jwt';
import mercurius from 'mercurius';
import { resolvers } from './api/resolvers';
import { schema } from './api/schema';

require('dotenv').config();

const app = Fastify({
  logger: true,
});

app.register(fastifyCookie);
app.register(fastifyJWT, {
  secret: 'supersecret',
  cookie: {
    cookieName: 'token',
  },
  trusted: validateToken,
});

async function validateToken(_request: FastifyRequest, decodedToken: any) {
  // todo - finish blacklisting
  const denylist = ['token1', 'token2'];
  return !denylist.includes(decodedToken.name);
}

app.post('/signup', async (_request, reply) => {
  const token = await reply.jwtSign({
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
    .send('Cookie sent');
});

app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// app.addHook('onRequest', async (request, reply) => {
//   try {
//     await request.jwtVerify();
//   } catch (err) {
//     reply.send(err);
//   }
// });

app.get(
  '/',
  {
    preValidation: [app.authenticate],
  },
  async function (request, _reply) {
    return request.user;
  }
);

app.register(mercurius, {
  schema: schema,
  resolvers: resolvers,
  graphiql: true,
});

// Run the server!
const start = async () => {
  try {
    await app.listen(4000, '0.0.0.0');
    // app.swagger()
    app.log.info(`server listening on 4000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
