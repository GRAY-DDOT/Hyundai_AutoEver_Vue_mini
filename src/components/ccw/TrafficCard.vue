<template>
  <div class="w-full bg-red-600 hover:bg-red-600 text-white">
    <!-- 데이터를 뿌려주는 방법 -->
    <div v-if="!isLoading && !isError && !isEmpty">
      {{ traffic.ROAD_MSG }} <br />
      {{ traffic.ROAD_TRAFFIC_IDX }} <br />
      {{ traffic.ROAD_TRAFFIC_SPD }} <br />
      {{ traffic.ROAD_TRAFFIC_TIME }}
    </div>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue'

import { useRealTimeStore } from '@/stores/useRealTimeStore.js'

const store = useRealTimeStore()
const traffic = computed(() => store.raw?.ROAD_TRAFFIC_STTS?.AVG_ROAD_DATA ?? {})

const isLoading = computed(() => store.isLoading)
const isError = computed(() => store.isError)
const isEmpty = computed(() => store.isEmpty)
</script>
