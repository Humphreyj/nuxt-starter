import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const body = await readBody(event);
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    return {
      user: newUser,
    };
  } else {
    let user = await prisma.user.findFirst();
    return {
      user: user,
    };
  }
});
