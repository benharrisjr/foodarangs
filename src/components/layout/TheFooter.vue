<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-900 text-gray-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="text-xl">🍳</span>
          <span class="text-white font-semibold">Foodarangs</span>
        </div>
        <p class="text-sm">
          &copy; {{ currentYear }} Foodarangs. Made with love for food lovers.
        </p>
      </div>
    </div>
  </footer>
</template>
