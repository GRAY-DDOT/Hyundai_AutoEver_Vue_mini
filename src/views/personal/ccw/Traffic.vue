<template>
  <div class="p-5 h-full">
    <div v-if="!isLoading && !isError && !isEmpty" class="h-full">
      <TrafficCard
        :road_msg="traffic.ROAD_MSG"
        :traffic_idx="traffic.ROAD_TRAFFIC_IDX"
        :traffic_spd="traffic.ROAD_TRAFFIC_SPD"
        :traffic_time="traffic.ROAD_TRAFFIC_TIME"
      />
    </div>
  </div>
</template>

<script setup>
import TrafficCard from '@/components/ccw/TrafficCard.vue'
import { useRealTimeStore } from '@/stores/useRealTimeStore.js'

const store = useRealTimeStore()
const traffic = computed(() => store.raw?.ROAD_TRAFFIC_STTS?.AVG_ROAD_DATA ?? {})

const isLoading = computed(() => store.isLoading)
const isError = computed(() => store.isError)
const isEmpty = computed(() => store.isEmpty)
</script>

<style scoped></style>
