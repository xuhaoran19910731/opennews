<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue'
</script>
