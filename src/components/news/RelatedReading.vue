<template>
  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg px-4 pt-2 pb-3">
    <!-- Header -->
    <div class="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
      <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
      <span class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">扩展阅读</span>
    </div>

    <!-- Related articles -->
    <div v-if="relatedArticles.length > 0" class="mt-2">
      <a
        v-for="(item, idx) in relatedArticles"
        :key="idx"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800 -mx-2 px-2 rounded transition-colors"
        :class="{ 'border-b border-gray-100 dark:border-gray-700/50': idx < relatedArticles.length - 1 }"
        @click.stop
      >
        <div class="text-sm text-gray-700 dark:text-gray-300 leading-snug line-clamp-1">{{ item.title }}</div>
        <div class="flex items-center gap-2 mt-0.5">
          <span class="text-xs text-gray-400 dark:text-gray-500">{{ item.source }}</span>
          <span v-if="item.publishedAt" class="text-xs text-gray-300 dark:text-gray-600">·</span>
          <span v-if="item.publishedAt" class="text-xs text-gray-400 dark:text-gray-500">{{ formatTime(item.publishedAt) }}</span>
        </div>
      </a>
    </div>

    <!-- Wikipedia links -->
    <div v-if="wikiLinks.length > 0" class="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-1.5 mb-1.5">
        <svg class="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.407 0 .2.106.682.319 1.449l3.268 8.378 1.583-3.247-1.466-3.391c-.468-1.073-.919-1.846-1.157-2.136-.238-.291-.658-.465-1.26-.523l-.193-.013c-.132 0-.198-.058-.198-.176v-.434l.051-.045h4.823l.051.045v.434c0 .119-.075.176-.225.176-.522.03-.784.098-.784.207 0 .062.088.377.264.943l1.805 4.232 1.769-3.57c.268-.567.402-1.038.402-1.413 0-.369-.274-.589-.822-.66l-.195-.023c-.132 0-.198-.058-.198-.176v-.434l.051-.045c.924-.005 3.768 0 3.768 0l.051.045v.434c0 .119-.075.176-.225.176-.795.064-1.336.389-1.622.974l-2.543 5.124 1.615 3.593 3.173-8.239c.249-.656.374-1.139.374-1.449 0-.293-.222-.462-.666-.507l-.273-.023c-.132 0-.198-.058-.198-.176v-.434l.051-.045h3.937l.051.045v.434c0 .119-.075.176-.225.176-.637.054-1.125.396-1.462 1.027L12.09 13.119z"/>
        </svg>
        <span class="text-xs text-gray-500 dark:text-gray-400">维基百科</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <a
          v-for="link in wikiLinks"
          :key="link.term"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          @click.stop
        >
          {{ link.term }}
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="relatedArticles.length === 0 && wikiLinks.length === 0" class="py-3 text-center">
      <p class="text-xs text-gray-400 dark:text-gray-500">暂无相关内容</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  relatedArticles: {
    type: Array,
    default: () => []
  },
  wikiLinks: {
    type: Array,
    default: () => []
  }
})

function formatTime(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  if (isNaN(d.getTime())) return ''
  const now = new Date()
  const diff = Math.floor((now - d) / 60000)
  if (diff < 60) return `${diff}分钟前`
  const hours = Math.floor(diff / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}天前`
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${month}-${day}`
}
</script>
