import { comments } from '~/server/data/comments'
import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { articleId, userData, content } = body

  const newComment = await prisma.comment.create({
    data: {
      articleId: articleId,
      userId: userData.id,
      userData: userData,
      content: content,
    },
  })
  console.log('newComment', newComment)
  return
})
