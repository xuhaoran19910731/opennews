<template>
  <div class="flex items-center gap-2">
    <!-- Breaking badge -->
    <span
      v-if="isBreaking"
      class="animate-breaking inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white tracking-wider"
    >
      BREAKING
    </span>

    <!-- Importance dots -->
    <div class="flex items-center gap-0.5" :title="`重要度 ${level}/5`">
      <span
        v-for="i in 5"
        :key="i"
        class="w-2 h-2 rounded-full transition-colors duration-200"
        :class="getDotClass(i)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  level: {
    type: Number,
    default: 1,
    validator: (v) => v >= 1 && v <= 5
  },
  isBreaking: {
    type: Boolean,
    default: false
  }
})

// Color map by level
const levelColors = {
  5: 'bg-red-500',
  4: 'bg-orange-400',
  3: 'bg-yellow-400',
  2: 'bg-blue-400',
  1: 'bg-gray-300 dark:bg-gray-600'
}

function getDotClass(dotIndex) {
  // dotIndex 1-5, fill if dotIndex <= level
  if (dotIndex <= props.level) {
    return levelColors[props.level] || 'bg-gray-300'
  }
  return 'bg-gray-200 dark:bg-gray-700'
}
</script>
