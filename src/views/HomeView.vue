<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <!-- Stats bar -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-3">
        <h1 class="text-sm font-medium text-gray-600 dark:text-gray-400">
          共 <span class="text-lg font-bold text-gray-900 dark:text-white">{{ store.filteredArticles.length }}</span> 条新闻
        </h1>
        <span
          v-if="store.activeCategory !== 'all'"
          class="badge bg-primary/10 text-primary text-xs"
        >
          {{ activeCategoryLabel }}
        </span>
        <span
          v-if="store.pinnedCount > 0"
          class="badge bg-red-500/10 text-red-600 dark:text-red-400 text-xs"
        >
          {{ store.pinnedCount }} 条置顶
        </span>
      </div>
      <div v-if="store.meta?.lastUpdated" class="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
        {{ lastUpdatedFormatted }}
      </div>
    </div>

    <!-- News feed -->
    <NewsFeed />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useNewsStore } from '../stores/newsStore.js'
import NewsFeed from '../components/news/NewsFeed.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const store = useNewsStore()

onMounted(() => {
  store.fetchNews()
})

const categoryLabels = {
  all: '全部',
  domestic: '国内',
  economy: '财经',
  politics: '政治',
  technology: '科技',
  society: '社会',
  military: '军事',
  environment: '环境'
}

const activeCategoryLabel = computed(() => categoryLabels[store.activeCategory] || store.activeCategory)

const lastUpdatedFormatted = computed(() => {
  const t = store.meta?.lastUpdated
  if (!t) return ''
  const d = new Date(t)
  const now = new Date()
  const diff = Math.floor((now - d) / 60000)
  if (diff < 1) return '刚刚更新'
  if (diff < 60) return `${diff}分钟前更新`
  const hours = Math.floor(diff / 60)
  if (hours < 24) return `${hours}小时前更新`
  return `${Math.floor(hours / 24)}天前更新`
})
</script>
