<template>
  <footer class="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 py-6 text-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        环球视野 · 数据来源于全球权威媒体
      </p>
      <p v-if="lastUpdated" class="mt-1 text-xs text-gray-400 dark:text-gray-500">
        最后更新：{{ lastUpdated }}
        <span v-if="nextUpdate"> · 下次更新：{{ nextUpdate }}</span>
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useNewsStore } from '../../stores/newsStore.js'

const store = useNewsStore()

function formatTime(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const lastUpdated = computed(() => formatTime(store.meta?.lastUpdated))
const nextUpdate = computed(() => formatTime(store.meta?.nextUpdate))
</script>
