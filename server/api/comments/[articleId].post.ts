import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { articleId, articleTitle, articleSlug, userData, content } = body

  const newComment = await prisma.comment.create({
    data: {
      articleId: articleId,
      articleTitle: articleTitle,
      articleSlug: articleSlug,
      userId: userData.id,
      userData: userData,
      content: content,
    },
  })

  return newComment
})
