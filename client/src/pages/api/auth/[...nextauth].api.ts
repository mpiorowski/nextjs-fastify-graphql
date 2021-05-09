import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: parseFloat(process.env.EMAIL_SERVER_PORT as string),
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
      },
      from: process.env.EMAIL_FROM as string,
    }),
  ],
  theme: 'light',
  database: {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'admin',
    password: '12345',
    database: 'db',
  },
});
