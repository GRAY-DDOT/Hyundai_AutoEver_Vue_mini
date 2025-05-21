<template>
  <div
    v-if="airInfo"
    class="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800 mb-4">{{ airInfo.station }} 대기 정보</h2>
    </div>
    <p class="font-light font text-sm mb-2">{{ formatDate(airInfo.dateTime) }} 기준</p>

    <div class="space-y-2 text-gray-700">
      <p style="font-weight: bold">
        <span class="inline-block w-28">미세먼지</span>
        <span :class="['font-semibold', getPm10Color(airInfo.pm25)]"
          >{{ airInfo.pm10 + ' ' + getPm10Emoji(airInfo.pm10) }}
        </span>
      </p>
      <p style="font-weight: bold">
        <span class="inline-block w-28">초미세먼지</span>
        <span :class="['font-semibold', getPm25Color(airInfo.pm25)]">{{
          airInfo.pm25 + ' ' + getPm25Emoji(airInfo.pm25)
        }}</span>
      </p>
      <p style="font-weight: bold">
        <span class="inline-block w-28">오존</span>
        <span :class="['font-semibold', getO3Color(airInfo.o3)]">{{
          airInfo.o3 + ' ' + getO3Emoji(airInfo.o3)
        }}</span>
      </p>
      <p style="font-weight: bold">
        <span class="inline-block w-28">통합대기등급</span>
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

const formatDate = (str) => {
  if (!str || str.length !== 12) return ''

  const year = str.slice(0, 4)
  const month = str.slice(4, 6)
  const day = str.slice(6, 8)
  const hour = str.slice(8, 10)
  const minute = str.slice(10, 12)

  return `${year}-${month}-${day} ${hour}:${minute}`
}

const getPm25Color = (value) => {
  if (value <= 15)
    return 'text-blue-600' // 좋음
  else if (value <= 35)
    return 'text-green-500' // 보통
  else if (value <= 75)
    return 'text-orange-500' // 나쁨
  else return 'text-red-600' // 매우나쁨
}

const getPm25Emoji = (value) => {
  if (value <= 15)
    return '😀' // 좋음
  else if (value <= 35)
    return '😐' // 보통
  else if (value <= 75)
    return '😟' // 나쁨
  else return '🥵' // 매우나쁨
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

const getPm10Emoji = (value) => {
  if (value <= 30)
    return '😀' // 좋음
  else if (value <= 80)
    return '😐' // 보통
  else if (value <= 150)
    return '😟' // 나쁨
  else return '🥵' // 매우나쁨
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

const getO3Emoji = (value) => {
  if (value <= 0.03)
    return '😀' // 좋음
  else if (value <= 0.09)
    return '😐' // 보통
  else if (value <= 0.15)
    return '😟' // 나쁨
  else return '🥵' // 매우나쁨
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
