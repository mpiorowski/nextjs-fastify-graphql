import dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifyJWT from "fastify-jwt";
import mercurius from "mercurius";
import authRoutes from "./auth/auth.routes";
import { loaders, resolvers } from "./resolvers";
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
  // todo - finish blacklisting
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

app.register(mercurius, {
  schema: schema,
  resolvers: resolvers,
  loaders: loaders,
  graphiql: true,
});

app.setErrorHandler(function (error, _request, reply) {
  console.error(error);
  return reply.status(400).send(error);
});

// routes
authRoutes(app);

// Run the server!
const start = async () => {
  try {
    await app.listen(4000, "0.0.0.0");
    // app.swagger()
    app.log.info(`server listening on 4000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
