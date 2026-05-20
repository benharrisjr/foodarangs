<script setup>
defineProps({
  stepNumber: {
    type: [String, Number],
    required: true
  },
  step: {
    type: Object,
    required: true
  }
})

const imageError = (event) => {
  event.target.parentElement.style.display = 'none'
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Step image/gif (if present) -->
    <div v-if="step.thumbnail" class="relative aspect-video bg-gray-100">
      <img
        :src="step.thumbnail"
        :alt="`Step ${stepNumber}: ${step.title}`"
        class="w-full h-full object-cover"
        @error="imageError"
      />
    </div>

    <!-- Step content -->
    <div class="p-6">
      <!-- Step header -->
      <div class="flex items-start gap-4 mb-4">
        <span class="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {{ stepNumber }}
        </span>
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900">{{ step.title }}</h3>
          <span v-if="step.duration" class="text-sm text-gray-500">
            ~{{ step.duration }} min
          </span>
        </div>
      </div>

      <!-- Step description -->
      <p class="text-gray-700 leading-relaxed mb-4">
        {{ step.description }}
      </p>

      <!-- Tips -->
      <div v-if="step.tips && step.tips.length > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 class="flex items-center gap-2 font-medium text-yellow-800 mb-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Tips
        </h4>
        <ul class="space-y-1">
          <li v-for="(tip, index) in step.tips" :key="index" class="text-sm text-yellow-700 flex items-start gap-2">
            <span class="text-yellow-500 mt-1">•</span>
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
