<script setup>
import { computed, ref } from 'vue'
import { useRealTimeStore } from '@/stores/useRealTimeStore'
import ForecastModal from '@/views/personal/hhc/ForecastModal.vue'

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

// 모달 컴포넌트 참조
const forecastModalRef = ref(null)

// 모달 열기 함수
function openForecastModal() {
  forecastModalRef.value.openModal()
}

const formattedUvMsg = computed(() => {
  if (!weather.value?.UV_MSG) return ''
  return weather.value.UV_MSG.replace(/\./g, '.<br>')
})
</script>

// 이하의 접근 방법을 참고해서 출력
<template>
  <div
    v-if="!isLoading && !isError && !isEmpty"
    class="items-center justify-center mx-auto rounded-lg max-w-[800px]"
  >
    <h2 class="text-center font-semibold">날씨</h2>
    <!--      <Modal.vue />-->
    <hr />
    <p>⏱️ 기준 시간 : {{ weather.WEATHER_TIME }}</p>
    <hr />
    <p>🌡 현재 온도 : {{ weather.TEMP }}°C (체감 : {{ weather.SENSIBLE_TEMP }}°C)</p>
    <hr />
    <p>🌡 최고/최저 온도 : {{ weather.MAX_TEMP }}°C / {{ weather.MIN_TEMP }}°C</p>
    <hr />
    <p>
      💧 습도 : {{ weather.HUMIDITY }}% / 강 : {{ weather.PRECIPITATION }} ({{
        weather.PRECPT_TYPE
      }})
    </p>
    <hr />
    <p>🌞 자외선 지수 : {{ weather.UV_INDEX }} ({{ weather.UV_INDEX_LVL }})</p>
    <hr />
    <p v-html="formattedUvMsg" class="text-xs"></p>
    <button
      @click="openForecastModal"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 mx-auto block"
    >
      예보정보 보기
    </button>

    <!-- 모달 컴포넌트 추가 (ref로 참조하고 forecast 데이터 전달) -->
    <ForecastModal ref="forecastModalRef" :forecast="forecast" />
  </div>

  <p v-else-if="isLoading">Loading...</p>
  <p v-else-if="isError">Error occurred!</p>
  <p v-else>No data available.</p>
</template>
<style scoped>
p {
  padding: 2px;
  text-align: center;
}

h2 {
  font-size: 1.7rem;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 5px;
}
div {
  padding: 10px;
}
</style>
