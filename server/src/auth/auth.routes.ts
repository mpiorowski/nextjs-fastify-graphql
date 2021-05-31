import { randomBytes } from "crypto";
import { FastifyInstance } from "fastify";
import { sendEmail } from "../config/mail.config";
import { addToken, deleteToken, findToken } from "../db/tokens.db";
import { addUser, editUser, findUserByEmail } from "../db/users.db";

export default function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", async (request, reply) => {
    const email = request.body as { email: string };
    const token = randomBytes(32).toString("hex");

    await addToken(token, email.email);

    // TODO - config
    const tokenLink = `http://${process.env["DOMAIN"]}${
      process.env["NODE_ENV"] === "development" ? ":3000" : ""
    }/token?token=${token}`;
    const signinButton = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <div>
            <!--[if mso]>
              <v:roundrect xmlns_v="urn:schemas-microsoft-com:vml" xmlns_w="urn:schemas-microsoft-com:office:word" href="${tokenLink}" style="height:36px;v-text-anchor:middle;width:150px;" arcsize="5%" strokecolor="#276749" fillcolor="#276749">
                <w:anchorlock/>
                <center style="color:#ffffff;font-family:Helvetica, Arial,sans-serif;font-size:16px;">Sign in</center>
              </v:roundrect>
            <![endif]-->
            <a href="${tokenLink}" style="background-color:#276749;border:1px solid #276749;border-radius:6px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">Sign in</a>
          </div>
        </td>
      </tr>
    </table>
    `;

    await sendEmail(email.email, "Sign in to app.mpiorowski.org", signinButton);
    reply.status(204).send();
  });

  app.post("/auth/token", async (request, reply) => {
    const token = request.body as string;
    const sysToken = await findToken(token, "register");
    if (!sysToken || !sysToken.identifier || !sysToken.id) {
      throw Error("Wrong token or token has expired");
    }
    await deleteToken(sysToken.id);
    let user = await findUserByEmail(sysToken.identifier);
    if (user) {
      user = await editUser({
        name: user.name,
        email: user.email,
        email_verified: new Date(),
        image: user.image,
      });
    }
    if (!user) {
      user = await addUser({
        name: null,
        email: sysToken.identifier,
        email_verified: new Date(),
        image: null,
      });
    }
    const jwtToken = await reply.jwtSign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: ["admin", "user"],
    });
    reply
      .setCookie("token", jwtToken, {
        domain: process.env["DOMAIN"],
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
        domain: process.env["DOMAIN"],
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
