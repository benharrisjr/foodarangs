<script setup>
import { ref } from 'vue'

defineProps({
  ingredients: {
    type: Array,
    required: true
  }
})

const checkedItems = ref(new Set())

const toggleItem = (index) => {
  if (checkedItems.value.has(index)) {
    checkedItems.value.delete(index)
  } else {
    checkedItems.value.add(index)
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      Ingredients
    </h2>
    <ul class="space-y-2">
      <li
        v-for="(ingredient, index) in ingredients"
        :key="index"
        @click="toggleItem(index)"
        class="flex items-start gap-3 cursor-pointer group"
      >
        <span
          :class="[
            'flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors',
            checkedItems.has(index)
              ? 'bg-primary-500 border-primary-500 text-white'
              : 'border-gray-300 group-hover:border-primary-400'
          ]"
        >
          <svg v-if="checkedItems.has(index)" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span
          :class="[
            'transition-colors',
            checkedItems.has(index) ? 'text-gray-400 line-through' : 'text-gray-700'
          ]"
        >
          {{ ingredient }}
        </span>
      </li>
    </ul>
  </div>
</template>
