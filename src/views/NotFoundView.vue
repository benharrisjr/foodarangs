<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4">
    <div class="text-center">
      <div class="text-8xl mb-6">🍽️</div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Oops! Looks like this recipe wandered off. Let's get you back to the kitchen.
      </p>
      <RouterLink
        to="/"
        class="btn-primary inline-flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Back to Recipes
      </RouterLink>
    </div>
  </div>
</template>
