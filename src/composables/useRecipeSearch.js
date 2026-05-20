import { ref, computed, watch } from 'vue'
import Fuse from 'fuse.js'
import { useRecipesStore } from '@/stores/recipes'
import { useDebounce } from './useDebounce'
import { FUSE_OPTIONS, SEARCH_DEBOUNCE_MS } from '@/utils/constants'

export function useRecipeSearch() {
  const store = useRecipesStore()

  const searchQuery = ref('')
  const selectedTags = ref([])

  const debouncedQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS)

  const fuse = computed(() => {
    return new Fuse(store.recipes, FUSE_OPTIONS)
  })

  const filteredRecipes = computed(() => {
    let results = store.recipes

    // Apply fuzzy search if query exists
    if (debouncedQuery.value.trim()) {
      const searchResults = fuse.value.search(debouncedQuery.value.trim())
      results = searchResults.map(result => result.item)
    }

    // Apply tag filtering
    if (selectedTags.value.length > 0) {
      results = results.filter(recipe =>
        selectedTags.value.every(tag => recipe.tags.includes(tag))
      )
    }

    return results
  })

  const hasResults = computed(() => filteredRecipes.value.length > 0)

  const isSearching = computed(() =>
    searchQuery.value.trim() !== '' || selectedTags.value.length > 0
  )

  function toggleTag(tag) {
    const index = selectedTags.value.indexOf(tag)
    if (index === -1) {
      selectedTags.value.push(tag)
    } else {
      selectedTags.value.splice(index, 1)
    }
  }

  function clearSearch() {
    searchQuery.value = ''
    selectedTags.value = []
  }

  function clearTags() {
    selectedTags.value = []
  }

  return {
    searchQuery,
    selectedTags,
    filteredRecipes,
    hasResults,
    isSearching,
    toggleTag,
    clearSearch,
    clearTags,
    allTags: store.allTags
  }
}
