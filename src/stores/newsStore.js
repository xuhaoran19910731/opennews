import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNewsStore = defineStore('news', () => {
  // State
  const articles = ref([])
  const meta = ref({})
  const loading = ref(false)
  const error = ref(null)
  const activeCategory = ref('all')
  const searchQuery = ref('')

  // Getters
  const filteredArticles = computed(() => {
    let result = articles.value

    // Filter by category
    if (activeCategory.value !== 'all') {
      result = result.filter(a => a.category === activeCategory.value)
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

    return result
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
    searchQuery,
    filteredArticles,
    fetchNews,
    setCategory,
    setSearchQuery
  }
})
