<script setup>
import { computed } from 'vue'
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
  event.target.parentElement.querySelector('.fallback-bg').style.display = 'block'
}
</script>

<template>
  <div class="relative h-64 sm:h-80 md:h-96 overflow-hidden">
    <!-- Background image -->
    <img
      :src="recipe.heroImage"
      :alt="recipe.title"
      class="absolute inset-0 w-full h-full object-cover"
      @error="imageError"
    />
    <!-- Fallback background -->
    <div class="fallback-bg hidden absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600" />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

    <!-- Content -->
    <div class="absolute inset-0 flex items-end">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
        <div class="text-white">
          <!-- Difficulty badge -->
          <span
            :class="difficultyClass"
            class="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
          >
            {{ difficultyLabel }}
          </span>

          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {{ recipe.title }}
          </h1>

          <!-- Description -->
          <p class="text-gray-200 text-lg max-w-2xl mb-4">
            {{ recipe.description }}
          </p>

          <!-- Meta info -->
          <div class="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                <span class="font-semibold">{{ totalTime }}</span> min total
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>
                <span class="font-semibold">{{ recipe.prepTime }}</span> min prep
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              <span>
                <span class="font-semibold">{{ recipe.cookTime }}</span> min cook
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>
                <span class="font-semibold">{{ recipe.servings }}</span> servings
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
