<script setup>
const model = defineModel({ type: String, default: '' })

defineProps({
  placeholder: {
    type: String,
    default: 'Search recipes...'
  }
})

const emit = defineEmits(['clear'])

const clearInput = () => {
  model.value = ''
  emit('clear')
}
</script>

<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
    />
    <button
      v-if="model"
      @click="clearInput"
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
