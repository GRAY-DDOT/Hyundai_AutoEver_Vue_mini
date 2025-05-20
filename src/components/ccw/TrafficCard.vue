<template>
  <div class="w-full bg-red-600 hover:bg-red-600 text-white">
    <div v-if="isReady">
      testtse
      <p v-for="rt in tmp" :key="rt.LINK_ID" class="text-lg font-semibold text-black">
        {{ rt.LINK_ID }}
      </p>
    </div>
    <p class="font-medium text-gray-500">나쁨</p>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue'

import { useRealTimeStore } from '@/stores/useRealTimeStore.js'

const store = useRealTimeStore()
const isReady = ref(false)
const traffics = ref()
const tmp = ref()

watch(
  () => store.done,
  (nowLoading) => {
    if (nowLoading === false) {
      isReady.value = true
      const { a, b, roadTraffic, c, d } = store
      tmp.value = roadTraffic
    }
  },
)
</script>
