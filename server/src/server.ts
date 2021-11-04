import { ApolloServer } from "apollo-server-fastify";
import dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifyJWT from "fastify-jwt";
import authRoutes from "./auth/auth.routes";
import { resolvers } from "./resolvers";
import { schema } from "./schema";
dotenv.config();

const app = Fastify({
  logger: true,
});

// jwt auth
app.register(fastifyCookie);
app.register(fastifyJWT, {
  secret: "supersecret",
  cookie: {
    cookieName: "token",
    signed: false,
  },
  trusted: validateToken,
});
async function validateToken(_request: FastifyRequest, decodedToken: any) {
  // TODO - finish blacklisting
  const denylist = ["token1", "token2"];
  return !denylist.includes(decodedToken.name);
}

// auth hook
app.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// graphql
app.addHook("onRoute", (routeOptions) => {
  if (routeOptions.url === "/graphql") {
    routeOptions.preValidation = [app.authenticate];
  }
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({ request, reply }) => ({
    request,
    reply,
  }),
  subscriptions: {
    path: "/subscriptions",
  },
});

// app.register(mercurius, {
//   schema: schema,
//   resolvers: resolvers,
//   loaders: loaders,
//   graphiql: true,
//   subscription: true,
// });

// app.setErrorHandler(function (error, _request, reply) {
//   console.error(error);
//   return reply.status(400).send(error);
// });

// routes
authRoutes(app);

// Run the server!
const start = async () => {
  try {
    // apollo server startup
    server.installSubscriptionHandlers(app.server);
    await server.start();
    app.register(server.createHandler());

    // fastify server startup
    await app.listen(4000, "0.0.0.0");
    // app.swagger()
    app.log.info(`server listening on 4000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
