<template>
  <div class="space-y-3">
    <!-- Loading skeleton -->
    <template v-if="store.loading">
      <div
        v-for="i in 3"
        :key="`skeleton-${i}`"
        class="card p-4 animate-pulse"
      >
        <div class="flex items-center gap-2 mb-3">
          <div class="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div class="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded-full ml-auto" />
        </div>
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-4/5" />
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/5" />
        <div class="space-y-1.5">
          <div class="h-3.5 bg-gray-100 dark:bg-gray-700/60 rounded w-full" />
          <div class="h-3.5 bg-gray-100 dark:bg-gray-700/60 rounded w-full" />
          <div class="h-3.5 bg-gray-100 dark:bg-gray-700/60 rounded w-3/4" />
        </div>
        <div class="flex justify-between mt-3">
          <div class="h-5 w-16 bg-gray-100 dark:bg-gray-700/60 rounded-full" />
          <div class="h-5 w-28 bg-gray-100 dark:bg-gray-700/60 rounded" />
        </div>
      </div>
    </template>

    <!-- Error state -->
    <div
      v-else-if="store.error"
      class="card p-8 text-center"
    >
      <div class="text-4xl mb-3">⚠️</div>
      <p class="text-gray-600 dark:text-gray-400 font-medium">加载失败</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mt-1 mb-4">{{ store.error }}</p>
      <button
        @click="store.fetchNews()"
        class="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors duration-200"
      >
        重试
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="articles.length === 0"
      class="card p-12 text-center"
    >
      <div class="text-5xl mb-4">🔍</div>
      <p class="text-gray-600 dark:text-gray-400 font-medium">暂无相关新闻</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">
        {{ store.searchQuery ? '请尝试其他关键词' : '该分类暂无内容' }}
      </p>
    </div>

    <!-- News cards -->
    <template v-else>
      <div class="space-y-3">
        <NewsCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNewsStore } from '../../stores/newsStore.js'
import NewsCard from './NewsCard.vue'

const store = useNewsStore()
const articles = computed(() => store.filteredArticles)
</script>
