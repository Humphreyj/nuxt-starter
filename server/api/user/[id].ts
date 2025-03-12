import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  return user;
});
