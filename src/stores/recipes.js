import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import recipesData from '@/data/recipes.json'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref(recipesData)
  const loading = ref(false)
  const error = ref(null)

  const allTags = computed(() => {
    const tagSet = new Set()
    recipes.value.forEach(recipe => {
      recipe.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  })

  const getRecipeById = computed(() => {
    return (id) => recipes.value.find(recipe => recipe.id === id)
  })

  const recipeCount = computed(() => recipes.value.length)

  return {
    recipes,
    loading,
    error,
    allTags,
    getRecipeById,
    recipeCount
  }
})
