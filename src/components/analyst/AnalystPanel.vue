<template>
  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg px-4 pt-2 pb-1">
    <!-- Panel title -->
    <div class="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
      <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      <span class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">专家解读</span>
      <span class="text-xs text-gray-400 dark:text-gray-500 ml-auto">{{ analysts.length }} 位</span>
    </div>

    <!-- Comments list -->
    <div class="divide-y divide-gray-100 dark:divide-gray-700/50">
      <AnalystComment
        v-for="analyst in analysts"
        :key="analyst.id"
        :analyst="analyst"
      />
    </div>
  </div>
</template>

<script setup>
import AnalystComment from './AnalystComment.vue'

defineProps({
  analysts: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>
