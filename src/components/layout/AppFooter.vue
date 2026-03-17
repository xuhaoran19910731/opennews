<template>
  <footer class="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 py-6">
      <!-- Source tags section -->
      <div v-if="store.allSources.length > 0" class="mb-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400 shrink-0">新闻来源</span>
          <div class="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
          <button
            v-if="store.activeSource"
            @click="store.setSource(null)"
            class="text-xs text-primary hover:text-primary-dark transition-colors duration-200 shrink-0"
          >
            清除筛选
          </button>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="src in store.allSources"
            :key="src.name"
            @click="store.setSource(src.name)"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border"
            :class="store.activeSource === src.name
              ? 'bg-primary text-white border-primary shadow-sm'
              : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
          >
            <span
              class="w-1.5 h-1.5 rounded-full shrink-0"
              :style="{ backgroundColor: src.logoColor || '#6B7280' }"
            ></span>
            <span>{{ src.name }}</span>
            <span class="text-[10px] opacity-60">{{ src.count }}</span>
          </button>
        </div>
      </div>

      <!-- Original footer content -->
      <div class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          环球视野 · 数据来源于全球权威媒体
        </p>
        <p v-if="lastUpdated" class="mt-1 text-xs text-gray-400 dark:text-gray-500">
          最后更新：{{ lastUpdated }}
          <span v-if="nextUpdate"> · 下次更新：{{ nextUpdate }}</span>
        </p>
      </div>
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
