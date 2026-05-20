<script setup>
import RecipeCard from './RecipeCard.vue'

defineProps({
  recipes: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>
</template>
