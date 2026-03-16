<template>
  <div class="flex items-start gap-3 py-3">
    <!-- Avatar -->
    <div
      class="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold select-none"
      :style="{ backgroundColor: analyst.color || '#6b7280' }"
    >
      {{ analyst.avatar || analyst.name?.charAt(0) || '?' }}
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-baseline gap-1.5 flex-wrap">
        <span class="text-sm font-semibold text-gray-800 dark:text-gray-200">{{ analyst.name }}</span>
        <span class="text-xs text-gray-400 dark:text-gray-500">·</span>
        <span class="text-xs text-gray-500 dark:text-gray-400">{{ analyst.role }}</span>
      </div>
      <p class="mt-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {{ analyst.comment }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  analyst: {
    type: Object,
    required: true
  }
})
</script>
