<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipesStore } from '@/stores/recipes'
import RecipeHero from '@/components/recipe/RecipeHero.vue'
import RecipeStepPanel from '@/components/recipe/RecipeStepPanel.vue'
import RecipeIngredients from '@/components/recipe/RecipeIngredients.vue'
import RecipeTools from '@/components/recipe/RecipeTools.vue'
import RecipeTags from '@/components/recipe/RecipeTags.vue'

const route = useRoute()
const router = useRouter()
const store = useRecipesStore()

const recipe = computed(() => store.getRecipeById(route.params.id))

const sortedSteps = computed(() => {
  if (!recipe.value?.steps) return []
  return Object.entries(recipe.value.steps)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
})

// Redirect to 404 if recipe not found
if (!recipe.value) {
  router.replace({ name: 'not-found' })
}
</script>

<template>
  <div v-if="recipe">
    <!-- Hero section -->
    <RecipeHero :recipe="recipe" />

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back button -->
      <button
        @click="router.back()"
        class="mb-6 flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to recipes
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <RecipeIngredients :ingredients="recipe.ingredients" />
          <RecipeTools :tools="recipe.tools" />
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Tags</h2>
            <RecipeTags :tags="recipe.tags" />
          </div>
        </div>

        <!-- Steps -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
          <div class="space-y-6">
            <RecipeStepPanel
              v-for="[stepNumber, step] in sortedSteps"
              :key="stepNumber"
              :step-number="stepNumber"
              :step="step"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
