import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNewsStore = defineStore('news', () => {
  // State
  const articles = ref([])
  const meta = ref({})
  const loading = ref(false)
  const error = ref(null)
  const activeCategory = ref('all')
  const activeSource = ref(null) // null = show all sources
  const searchQuery = ref('')

  /**
   * 判断文章是否在24小时内发布
   */
  function isWithin24h(publishedAt) {
    if (!publishedAt) return false
    const pub = new Date(publishedAt).getTime()
    if (isNaN(pub)) return false
    return (Date.now() - pub) < 24 * 60 * 60 * 1000
  }

  // Getters
  const filteredArticles = computed(() => {
    let result = articles.value

    // Filter by category
    if (activeCategory.value !== 'all') {
      result = result.filter(a => a.category === activeCategory.value)
    }

    // Filter by source
    if (activeSource.value) {
      result = result.filter(a => a.source?.name === activeSource.value)
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase()
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        (a.keywords && a.keywords.some(k => k.toLowerCase().includes(q)))
      )
    }

    // Split into pinned (24h headlines) and rest
    const recent = result
      .filter(a => isWithin24h(a.publishedAt) || a.importance?.isRecent)
      .sort((a, b) => (b.importance?.score ?? 0) - (a.importance?.score ?? 0))
      .slice(0, 10)

    const recentIds = new Set(recent.map(a => a.id))
    const rest = result.filter(a => !recentIds.has(a.id))

    // Mark pinned articles
    const pinned = recent.map(a => ({ ...a, _pinned: true }))
    const others = rest.map(a => ({ ...a, _pinned: false }))

    return [...pinned, ...others]
  })

  // Derived counts
  const pinnedCount = computed(() => {
    return filteredArticles.value.filter(a => a._pinned).length
  })

  // All unique sources with article counts (from all articles, unfiltered)
  const allSources = computed(() => {
    const map = {}
    for (const a of articles.value) {
      const name = a.source?.name
      if (!name) continue
      if (!map[name]) {
        map[name] = { name, tier: a.source.tier || 3, logoColor: a.source.logoColor, count: 0 }
      }
      map[name].count++
    }
    return Object.values(map).sort((a, b) => {
      if (a.tier !== b.tier) return a.tier - b.tier
      return b.count - a.count
    })
  })

  // Actions
  async function fetchNews() {
    loading.value = true
    error.value = null
    try {
      const [newsRes, metaRes] = await Promise.all([
        fetch('/data/news.json'),
        fetch('/data/meta.json')
      ])

      if (!newsRes.ok) throw new Error('Failed to fetch news data')
      if (!metaRes.ok) throw new Error('Failed to fetch meta data')

      const newsData = await newsRes.json()
      const metaData = await metaRes.json()

      articles.value = newsData.articles || []
      meta.value = metaData
    } catch (e) {
      error.value = e.message || '数据加载失败'
      console.error('[newsStore] fetchNews error:', e)
    } finally {
      loading.value = false
    }
  }

  function setCategory(category) {
    activeCategory.value = category
    activeSource.value = null
  }

  function setSource(sourceName) {
    activeSource.value = activeSource.value === sourceName ? null : sourceName
  }

  function setSearchQuery(query) {
    searchQuery.value = query
  }

  return {
    articles,
    meta,
    loading,
    error,
    activeCategory,
    activeSource,
    searchQuery,
    filteredArticles,
    pinnedCount,
    allSources,
    fetchNews,
    setCategory,
    setSource,
    setSearchQuery
  }
})
