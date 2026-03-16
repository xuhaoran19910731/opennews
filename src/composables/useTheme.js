import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'huanqiu-theme'

// Singleton state
const isDark = ref(false)

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved !== null) {
    return saved === 'dark'
  }
  // Follow system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Initialize on first import
isDark.value = getInitialTheme()
applyTheme(isDark.value)

// Listen for system theme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
mediaQuery.addEventListener('change', (e) => {
  // Only auto-switch if user hasn't manually set a preference
  if (localStorage.getItem(STORAGE_KEY) === null) {
    isDark.value = e.matches
    applyTheme(isDark.value)
  }
})

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  return {
    isDark,
    toggleTheme
  }
}
