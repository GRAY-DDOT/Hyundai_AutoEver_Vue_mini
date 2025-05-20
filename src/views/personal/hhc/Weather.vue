<script setup>
import { useRealTimeStore } from '@/stores/useRealTimeStore'
const store = useRealTimeStore()
const { subStts, weatherStts, roadTraffic, liveSubPpltn } = store
console.log(weatherStts)
</script>

<template>
  <h3>지하철 현황</h3>
  <ul>
    <li v-for="(item, index ) in roadTraffic.ROAD_TRAFFIC_STTS" :key="index">
      {{ index + 1 }}: {{ item }}
    </li>
  </ul>

  <h3>현재 날씨</h3>
  <p>{{ weatherStts[0].TEMP }}°C</p>
</template>
