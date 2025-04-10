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
  <section id="game-ratings" class="w-full flex-col-ic-jc gap-1 mt-2">
    <p v-if="currentUser" class="text-sm">
      Would you recommend this to your best homie?
    </p>
    <p class="text-xs">
      {{ totalRecommendations.recommended }}
      {{ totalRecommendations.recommended > 1 ? 'players' : 'player' }}
      {{ totalRecommendations.recommended > 1 ? 'recommend' : 'recommends' }}
      this to their best homie.
    </p>
    <p class="text-xs" v-if="totalRecommendations.notRecommended">
      {{ totalRecommendations.notRecommended }}
      {{ totalRecommendations.notRecommended > 1 ? 'players' : 'player' }}
      {{ totalRecommendations.notRecommended > 1 ? 'do not' : 'does not' }}
      recommend this to their best homie.
    </p>
    <!-- <p v-if="userHasRatedGame">
      {{
        userRating
          ? 'You recommend this game'
          : 'You do not recommend this game'
      }}
    </p> -->
    <div v-if="currentUser" class="flex-ic-js gap-2">
      <UButton
        icon="lucide:thumbs-up"
        @click="handleRating(true)"
        size="xs"
        class="text-sm"
        :class="
          userRating
            ? 'bg-tag-color/30 text-tag-color border border-tag-color/40'
            : ''
        "
      >
        Yes
      </UButton>
      <UButton
        icon="lucide:thumbs-down"
        @click="handleRating(false)"
        size="xs"
        class="text-sm"
        :class="
          !userRating
            ? 'bg-tag-color/30 text-tag-color border border-tag-color/40'
            : ''
        "
      >
        No
      </UButton>
    </div>
  </section>
</template>
