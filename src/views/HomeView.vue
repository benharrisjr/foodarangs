<script setup>
import { useRecipeSearch } from '@/composables/useRecipeSearch'
import SearchBar from '@/components/search/SearchBar.vue'
import TagFilter from '@/components/search/TagFilter.vue'
import RecipeGrid from '@/components/recipe/RecipeGrid.vue'

const {
  searchQuery,
  selectedTags,
  filteredRecipes,
  hasResults,
  isSearching,
  toggleTag,
  clearSearch,
  clearTags,
  allTags
} = useRecipeSearch()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero section -->
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold text-gray-900 mb-3">
        Discover Delicious Recipes
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Explore our collection of easy-to-follow recipes with step-by-step instructions
      </p>
    </div>

    <!-- Search and filters -->
    <div class="mb-8 space-y-6">
      <SearchBar
        v-model="searchQuery"
        placeholder="Search recipes by name, ingredient, or tag..."
        @clear="clearSearch"
      />
      <TagFilter
        :tags="allTags"
        :selected-tags="selectedTags"
        @toggle-tag="toggleTag"
        @clear-tags="clearTags"
      />
    </div>

    <!-- Results count -->
    <div v-if="isSearching" class="mb-6">
      <p class="text-sm text-gray-600">
        Found <span class="font-semibold">{{ filteredRecipes.length }}</span> recipe{{ filteredRecipes.length === 1 ? '' : 's' }}
        <button
          @click="clearSearch"
          class="ml-2 text-primary-500 hover:text-primary-600 font-medium"
        >
          Clear filters
        </button>
      </p>
    </div>

    <!-- Recipe grid -->
    <RecipeGrid v-if="hasResults" :recipes="filteredRecipes" />

    <!-- No results message -->
    <div v-else class="text-center py-16">
      <div class="text-6xl mb-4">🔍</div>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">No recipes found</h2>
      <p class="text-gray-600 mb-4">
        Try adjusting your search or filters to find what you're looking for
      </p>
      <button
        @click="clearSearch"
        class="btn-primary"
      >
        Clear all filters
      </button>
    </div>
  </div>
</template>
