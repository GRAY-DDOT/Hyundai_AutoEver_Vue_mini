<template>
  <div
    v-if="airInfo"
    class="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
  >
    <h2 class="text-xl font-bold text-gray-800 mb-4">{{ airInfo.station }} 대기 정보</h2>
    <div class="space-y-2 text-gray-700">
      <p style="font-weight: bold">
        미세먼지 :
        <span :class="['font-semibold', getPm10Color(airInfo.pm25)]">{{ airInfo.pm10 }} </span>
      </p>
      <p style="font-weight: bold">
        초미세먼지 :
        <span :class="['font-semibold', getPm25Color(airInfo.pm25)]">{{ airInfo.pm25 }}</span>
      </p>
      <p style="font-weight: bold">
        오존 :
        <span :class="['font-semibold', getO3Color(airInfo.o3)]">{{ airInfo.o3 }}</span>
      </p>
      <p style="font-weight: bold">
        통합대기등급:
        <span :class="['font-bold', getAirQualityColor(airInfo.airQuality)]">{{
          airInfo.airQuality
        }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { fetchAir } from '@/model/api_air'

const airInfo = ref(null)

onMounted(async () => {
  airInfo.value = await fetchAir()
})

const getPm25Color = (value) => {
  if (value <= 15)
    return 'text-blue-600' // 좋음
  else if (value <= 35)
    return 'text-green-500' // 보통
  else if (value <= 75)
    return 'text-orange-500' // 나쁨
  else return 'text-red-600' // 매우나쁨
}

const getPm10Color = (value) => {
  if (value <= 30)
    return 'text-blue-600' // 좋음
  else if (value <= 80)
    return 'text-green-500' // 보통
  else if (value <= 150)
    return 'text-orange-500' // 나쁨
  else return 'text-red-600' // 매우나쁨
}

const getO3Color = (value) => {
  if (value <= 0.03)
    return 'text-blue-600' // 좋음
  else if (value <= 0.09)
    return 'text-green-500' // 보통
  else if (value <= 0.15)
    return 'text-orange-500' // 나쁨
  else return 'text-red-600' // 매우나쁨
}

const getAirQualityColor = (value) => {
  if (value == '좋음')
    return 'text-blue-600' // 좋음
  else if (value == '보통')
    return 'text-green-500' // 보통
  else if (value == '나쁨')
    return 'text-orange-500' // 나쁨
  else return 'text-red-600' // 매우나쁨
}
</script>
