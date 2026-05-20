<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  tags: {
    type: Array,
    required: true
  }
})

const formatTag = (tag) => {
  return tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <RouterLink
      v-for="tag in tags"
      :key="tag"
      :to="{ name: 'home', query: { tag } }"
      class="px-3 py-1.5 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm font-medium transition-colors"
    >
      {{ formatTag(tag) }}
    </RouterLink>
  </div>
</template>
