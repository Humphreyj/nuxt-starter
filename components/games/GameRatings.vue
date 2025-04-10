<script setup>
// Components
// Pinia
import { useUserStore } from '#imports'
const props = defineProps({
  gameId: {
    type: String,
    required: true,
  },
})
const { currentUser } = storeToRefs(useUserStore())

const { data: gameRatings } = await useFetch(
  `/api/games/${props.gameId}/rating`,
)

const userHasRatedGame = computed(() => {
  if (!currentUser.value) return false
  let foundRatingIndex = gameRatings.value.findIndex(
    (rating) => rating.userId === currentUser.value.id,
  )

  if (foundRatingIndex !== -1) {
    return true
  } else {
    return false
  }
})
// computed prop with getter and setter
const userRating = computed({
  get() {
    if (!currentUser.value) return false
    let foundRatingIndex = gameRatings.value.findIndex(
      (rating) => rating.userId === currentUser.value.id,
    )
    if (foundRatingIndex !== -1) {
      return gameRatings.value[foundRatingIndex].isRecommended
    } else {
      return false
    }
  },
  set(value) {
    let foundRatingIndex = gameRatings.value.findIndex(
      (rating) => rating.userId === currentUser.value.id,
    )
    if (foundRatingIndex !== -1) {
      gameRatings.value[foundRatingIndex].isRecommended = value
    }
  },
})

const handleRating = async (rating) => {
  let foundRatingIndex = gameRatings.value.findIndex(
    (rating) => rating.userId === currentUser.value.id,
  )
  if (foundRatingIndex === -1) {
    await $fetch(`/api/games/${props.gameId}/rating`, {
      method: 'POST',
      body: {
        gameId: props.gameId,
        userId: currentUser.value.id,
        isRecommended: rating,
      },
    })
  } else {
    await $fetch(`/api/games/${props.gameId}/rating`, {
      method: 'PUT',
      body: {
        ratingId: gameRatings.value[foundRatingIndex].id,
        isRecommended: rating,
      },
    })
  }
  userRating.value = rating
}
// computed prop that returns the total number of recommendations, and the total number not recommended
const totalRecommendations = computed(() => {
  return {
    recommended: gameRatings.value.filter((rating) => rating.isRecommended)
      .length,
    notRecommended: gameRatings.value.filter((rating) => !rating.isRecommended)
      .length,
  }
})
</script>

<template>
  <section id="game-ratings" class="w-full flex-col-ic-jc">
    <p>Recommended?</p>
    <p>
      {{ totalRecommendations.recommended }}
      {{ totalRecommendations.recommended > 1 ? 'players' : 'player' }}
      {{ totalRecommendations.recommended > 1 ? 'recommend' : 'recommends' }}
    </p>
    <p v-if="userHasRatedGame">
      {{
        userRating
          ? 'You recommend this game'
          : 'You do not recommend this game'
      }}
    </p>
    <div v-if="currentUser" class="flex-ic-js gap-2">
      <UButton @click="handleRating(true)"> Yes </UButton>
      <UButton @click="handleRating(false)"> No </UButton>
    </div>
  </section>
</template>
