<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/utils/constants'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const totalTime = computed(() => props.recipe.prepTime + props.recipe.cookTime)

const difficultyLabel = computed(() => DIFFICULTY_LABELS[props.recipe.difficulty])
const difficultyClass = computed(() => DIFFICULTY_COLORS[props.recipe.difficulty])

const imageError = (event) => {
  event.target.style.display = 'none'
  event.target.nextElementSibling.style.display = 'flex'
}
</script>

<template>
  <RouterLink
    :to="{ name: 'recipe', params: { id: recipe.id } }"
    class="card group block aspect-square relative overflow-hidden"
  >
    <!-- Image -->
    <img
      :src="recipe.heroImage"
      :alt="recipe.title"
      class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      @error="imageError"
    />
    <!-- Fallback placeholder -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 hidden items-center justify-center p-4"
    >
      <span class="text-white text-xl font-bold text-center">{{ recipe.title }}</span>
    </div>

    <!-- Overlay gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

    <!-- Content -->
    <div class="absolute inset-0 p-4 flex flex-col justify-end text-white">
      <!-- Difficulty badge -->
      <span
        :class="difficultyClass"
        class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
      >
        {{ difficultyLabel }}
      </span>

      <!-- Title -->
      <h3 class="text-lg font-bold mb-1 line-clamp-2">{{ recipe.title }}</h3>

      <!-- Meta info -->
      <div class="flex items-center gap-3 text-sm text-gray-200">
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ totalTime }} min
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {{ recipe.servings }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
