<template>
  <Modal>
    <div v-if="forecast && forecast.length > 0" class="forecast-modal-content">
      <h3 class="mt-4">24시간 예보</h3>
      <div class="mt-2 overflow-y-auto" style="max-height: 60vh">
        <table class="table-auto border w-full text-sm">
          <thead class="sticky top-0 bg-white">
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
    </div>
    <div v-else>
      <p>예보 정보가 없습니다.</p>
    </div>
  </Modal>
</template>

<script setup>
import { defineProps } from 'vue'
import Modal from '@/views/Modal.vue'
import { useModalStore } from '@/stores/modal'

const props = defineProps({
  forecast: {
    type: Array,
    default: () => [],
  },
})

const modal = useModalStore()

// 날짜 출력 편의를 위한 함수
function formatTime(fcstDt) {
  const dateStr = `${fcstDt.slice(0, 4)}-${fcstDt.slice(4, 6)}-${fcstDt.slice(6, 8)} `
  const timeStr = `${fcstDt.slice(8, 10)}:${fcstDt.slice(10, 12)}`
  return dateStr + timeStr
}

// 모달 열기 메서드 (외부에서 호출 가능)
function openModal() {
  modal.open({
    title: '24시간 예보 정보',
    message: '향후 24시간 동안의 날씨 예보입니다.',
  })
}

// 외부에서 접근할 수 있도록 메서드 노출
defineExpose({
  openModal,
})
</script>

<style>
/* Modal.vue의 max-w-sm 클래스를 오버라이드 */
.forecast-modal-content {
  max-width: 600px !important;
  margin: 0 auto;
}

/* Modal 컴포넌트의 부모 div에 적용되는 스타일 오버라이드 */
.forecast-modal-content + button {
  margin-top: 1rem;
}

/* Modal.vue의 부모 div 스타일 오버라이드 */
.modal-open .bg-white {
  max-width: 600px !important;
  width: 90% !important;
}
</style>
