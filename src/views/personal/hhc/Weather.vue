<script setup>
import { computed } from 'vue'
import { useRealTimeStore } from '@/stores/useRealTimeStore'

// useRealTimeStore : 실시간 정보 전역 저장소
const store = useRealTimeStore()

// computed : useRealTimeStore에서 WEATHER_STTS 데이터 가져옴
// WEATHER_STTS : 이후 리턴값이 배열이기에 [0]으로 첫 번째 요소를 가져옴
const weather = computed(() => store.raw?.WEATHER_STTS?.[0] ?? [])
const forecast = computed(() => weather.value?.FCST24HOURS ?? [])

// computed : useRealTimeStore 로딩 상태 확인 후 불러옴
const isLoading = computed(() => store.isLoading)
const isError = computed(() => store.isError)
const isEmpty = computed(() => store.isEmpty)

// 날짜 출력 편의를 위한 함수
function formatTime(fcstDt) {
  const dateStr = `${fcstDt.slice(0, 4)}-${fcstDt.slice(4, 6)}-${fcstDt.slice(6, 8)} `
  const timeStr = `${fcstDt.slice(8, 10)}:${fcstDt.slice(10, 12)}`
  return dateStr + timeStr
}
</script>


// 이하의 접근 방법을 참고해서 출력
<template>
  <div v-if="!isLoading && !isError && !isEmpty">
    <h3 class="mt-4">날씨</h3>
    <p>📅 시간: {{ weather.WEATHER_TIME }}</p>
    <p>🌡 온도: {{ weather.TEMP }}°C (체감: {{ weather.SENSIBLE_TEMP }}°C)</p>
    <p>🌡 최고/최저 온도: {{ weather.MAX_TEMP }}°C / {{ weather.MIN_TEMP }}°C</p>
    <p>💧 습도: {{ weather.HUMIDITY }}%</p>
    <p>🌬 바람: {{ weather.WIND_DIRCT }} {{ weather.WIND_SPD }} m/s</p>
    <p>☔ 강수량: {{ weather.PRECIPITATION }} ({{ weather.PRECPT_TYPE }})</p>
    <p>🌅 일출/일몰: {{ weather.SUNRISE }} / {{ weather.SUNSET }}</p>
    <p>🌞 자외선: {{ weather.UV_INDEX }} ({{ weather.UV_INDEX_LVL }}), {{ weather.UV_MSG }}</p>
    <p>🌫 미세먼지(PM10): {{ weather.PM10 }} ({{ weather.PM10_INDEX }})</p>
    <p>🌫 초미세먼지(PM2.5): {{ weather.PM25 }} ({{ weather.PM25_INDEX }})</p>
    <p>🌍 대기질: {{ weather.AIR_IDX }} ({{ weather.AIR_IDX_MAIN }}), {{ weather.AIR_MSG }}</p>
    <h3 class="mt-4">24시간 예보</h3>
    <table class="table-auto border mt-2">
      <thead>
        <tr>
          <th class="border px-2">시간</th>
          <th class="border px-2">기온</th>
          <th class="border px-2">강수확률</th>
          <th class="border px-2">하늘 상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fcst in forecast" :key="fcst.FCST_DT">
          <td class="border px-2">{{ formatTime(fcst.FCST_DT) }}</td>
          <td class="border px-2">{{ fcst.TEMP }}°C</td>
          <td class="border px-2">{{ fcst.RAIN_CHANCE }}%</td>
          <td class="border px-2">{{ fcst.SKY_STTS }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p v-else-if="isLoading">Loading...</p>
  <p v-else-if="isError">Error occurred!</p>
  <p v-else>No data available.</p>
</template>
