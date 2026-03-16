<template>
  <article class="card p-4 cursor-pointer" :class="{ 'ring-1 ring-red-500/20 dark:ring-red-400/20': pinned }" @click.self="handleCardClick">
    <!-- Top row: importance + source + time -->
    <div class="flex items-center gap-2 flex-wrap mb-2">
      <!-- Pinned indicator -->
      <span v-if="pinned" class="badge bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold">
        TOP
      </span>

      <ImportanceBadge
        :level="article.importance?.level || 1"
        :is-breaking="article.importance?.isBreaking || false"
      />

      <!-- Source badge -->
      <span
        class="badge text-xs font-medium px-2 py-0.5 rounded-full"
        :class="sourceBadgeClass"
      >
        {{ article.source?.name || '未知来源' }}
      </span>

      <!-- Publish time -->
      <span class="text-xs text-gray-400 dark:text-gray-500 ml-auto shrink-0">
        {{ relativeTime }}
      </span>
    </div>

    <!-- Title -->
    <h2
      class="text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-2 line-clamp-2"
      @click="handleCardClick"
    >
      {{ article.title }}
    </h2>

    <!-- Summary -->
    <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-3">
      {{ article.summary }}
    </p>

    <!-- Bottom row: category tag + expand button -->
    <div class="flex items-center justify-between gap-2">
      <!-- Category label -->
      <span class="badge bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs">
        {{ article.categoryLabel || article.category }}
      </span>

      <!-- Expand / collapse button -->
      <button
        v-if="article.analysts && article.analysts.length > 0"
        @click.stop="toggleExpand"
        class="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors duration-200"
      >
        <span>{{ expanded ? '收起' : `查看 ${article.analysts.length} 位专家解读` }}</span>
        <span class="transition-transform duration-200" :class="expanded ? 'rotate-180' : ''">▼</span>
      </button>
    </div>

    <!-- Expand section: analyst panel + original link -->
    <Transition name="expand">
      <div v-if="expanded" class="mt-3">
        <AnalystPanel :analysts="article.analysts" />

        <div class="mt-3 flex items-center justify-between">
          <a
            v-if="article.url"
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            @click.stop
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            查看原文
          </a>

          <button
            @click.stop="toggleExpand"
            class="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 ml-auto flex items-center gap-1"
          >
            收起 <span>▲</span>
          </button>
        </div>
      </div>
    </Transition>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import ImportanceBadge from './ImportanceBadge.vue'
import AnalystPanel from '../analyst/AnalystPanel.vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  pinned: {
    type: Boolean,
    default: false
  }
})

const expanded = ref(false)

function toggleExpand() {
  expanded.value = !expanded.value
}

function handleCardClick() {
  // Clicking the card body also toggles expand if there are analysts
  if (props.article.analysts && props.article.analysts.length > 0) {
    toggleExpand()
  }
}

// Source badge class based on tier
const sourceBadgeClass = computed(() => {
  const tier = props.article.source?.tier || 3
  if (tier === 1) return 'badge-tier1'
  if (tier === 2) return 'badge-tier2'
  return 'badge-tier3'
})

// Relative time
const relativeTime = computed(() => {
  if (!props.article.publishedAt) return ''
  const d = new Date(props.article.publishedAt)
  const now = new Date()
  const diff = Math.floor((now - d) / 60000) // minutes

  if (diff < 1) return '刚刚'
  if (diff < 60) return `${diff}分钟前`

  const hours = Math.floor(diff / 60)
  if (hours < 24) return `${hours}小时前`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}天前`

  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
})
</script>
