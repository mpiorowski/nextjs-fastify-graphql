import Fastify from 'fastify';
import mercurius from 'mercurius';
import { resolvers } from './api/resolvers';
import { schema } from './api/schema';

require('dotenv').config();

const app = Fastify({
	logger: true
})

// const schema = `
//   type Query {
//     add(x: Int, y: Int): Int
//   }
// `;

// const resolvers = {
//   Query: {
//     add: async (_, { x, y }) => x + y,
//   },
// };

app.register(mercurius, {
  schema: schema,
  resolvers: resolvers,
  graphiql: true,
});

// app.get('/', async function (req, reply) {
//   const query = '{ add(x: 2, y: 2) }';
//   return reply.graphql(query);
// });

// Run the server!
const start = async () => {
	try {
		await app.listen(3000, '0.0.0.0')
		// app.swagger()
		app.log.info(`server listening on 3000`)
	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}
start()
