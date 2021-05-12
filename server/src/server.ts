import Fastify from 'fastify';
import mercurius from 'mercurius';
import { resolvers } from './api/resolvers';
import { schema } from './api/schema';

require('dotenv').config();

const app = Fastify({
  logger: true,
});

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
