<script setup>
defineProps({
  tags: {
    type: Array,
    required: true
  },
  selectedTags: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle-tag', 'clear-tags'])

const formatTag = (tag) => {
  return tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-gray-700">Filter by tags</span>
      <button
        v-if="selectedTags.length > 0"
        @click="emit('clear-tags')"
        class="text-sm text-primary-500 hover:text-primary-600 font-medium"
      >
        Clear all
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in tags"
        :key="tag"
        @click="emit('toggle-tag', tag)"
        :class="[
          'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
          selectedTags.includes(tag)
            ? 'bg-primary-500 text-white shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ formatTag(tag) }}
      </button>
    </div>
  </div>
</template>
