<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="text-2xl font-bold text-primary-500">🍳</span>
          <span class="text-xl font-bold text-gray-900">Foodarangs</span>
        </RouterLink>
        <nav class="hidden sm:flex items-center gap-6">
          <RouterLink
            to="/"
            class="text-gray-600 hover:text-primary-500 font-medium transition-colors"
          >
            Recipes
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>
