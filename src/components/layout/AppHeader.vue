<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Main header row -->
      <div class="flex items-center justify-between h-14 gap-3">
        <!-- Left: Logo + Site name -->
        <div class="flex items-center gap-2 shrink-0">
          <svg class="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span class="text-lg font-bold text-gray-900 dark:text-white tracking-tight whitespace-nowrap">环球视野</span>
        </div>

        <!-- Right: Theme toggle + last updated -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- Last updated time -->
          <span v-if="lastUpdated" class="hidden sm:inline text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
            更新于 {{ lastUpdated }}
          </span>

          <!-- Theme toggle button -->
          <button
            @click="toggleTheme"
            class="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
          >
            <!-- Sun icon (shown in dark mode) -->
            <svg v-if="isDark" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <!-- Moon icon (shown in light mode) -->
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Category tabs row -->
      <div class="overflow-x-auto scrollbar-none -mx-4 px-4 pb-2">
        <div class="flex items-center gap-1 w-max">
          <button
            v-for="cat in categories"
            :key="cat.value"
            @click="setCategory(cat.value)"
            class="category-tab"
            :class="activeCategory === cat.value ? 'category-tab-active' : 'category-tab-inactive'"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../../composables/useTheme.js'
import { useNewsStore } from '../../stores/newsStore.js'

const { isDark, toggleTheme } = useTheme()
const store = useNewsStore()
const activeCategory = computed(() => store.activeCategory)

const categories = [
  { value: 'all', label: '全部' },
  { value: 'domestic', label: '国内' },
  { value: 'economy', label: '财经' },
  { value: 'politics', label: '政治' },
  { value: 'technology', label: '科技' },
  { value: 'society', label: '社会' },
  { value: 'military', label: '军事' },
  { value: 'environment', label: '环境' }
]

function setCategory(value) {
  store.setCategory(value)
}

const lastUpdated = computed(() => {
  const t = store.meta?.lastUpdated
  if (!t) return ''
  const d = new Date(t)
  const now = new Date()
  const diff = Math.floor((now - d) / 60000)
  if (diff < 1) return '刚刚'
  if (diff < 60) return `${diff}分钟前`
  const hours = Math.floor(diff / 60)
  if (hours < 24) return `${hours}小时前`
  return `${Math.floor(hours / 24)}天前`
})
</script>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
