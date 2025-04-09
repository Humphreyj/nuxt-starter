import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    articleId,
    articleTitle,
    articleSlug,
    articleImage,
    userData,
    content,
  } = body

  const newComment = await prisma.comment.create({
    data: {
      articleId: articleId,
      articleTitle: articleTitle,
      articleSlug: articleSlug,
      articleImage: articleImage,
      userId: userData.id,
      userData: userData,
      content: content,
    },
  })

  return newComment
})
