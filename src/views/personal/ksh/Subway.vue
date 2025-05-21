<script setup>
import { computed } from 'vue'

import { useRealTimeStore } from '@/stores/useRealTimeStore'
const store = useRealTimeStore()

import { useModalStore } from '@/stores/modal'

import ElevaterModal from './elevaterModal.vue'
const modal = useModalStore()

const subway = computed(() => store.raw?.SUB_STTS?.[0] ?? [])
const subwayDetail = computed(() => subway.value?.SUB_DETAIL ?? [])
// const subwayFacinfo = computed(() => subway.value?.SUB_FACIINFO ?? [])
const subwayFacinfo = computed(() => subway.value?.SUB_FACIINFO[13] ?? [])
// const subway = computed(()=>subwayDetail.value?.)

const isLoading = computed(() => store.isLoading)
const isError = computed(() => store.isError)
const isEmpty = computed(() => store.isEmpty)

const elevaterModalref = ref('')
function openeleaterModal() {
  elevaterModalref.value.openMoal()
}
</script>

<template>
  <div v-if="!isLoading && !isError && !isEmpty">
    <!-- 지하철 도착 정보 -->
    <h2 class="text-xl font-bold text-gray-800 mb-2">지하철 도착 정보</h2>
    <p class="text-lg font-semibold text-blue-600 mb-2">
      지하철 역: {{ subway.SUB_STN_NM }}, {{ subway.SUB_STN_LINE }}호선
    </p>

    <div class="bg-white p-2 rounded-lg shadow-sm border">
      <h2 class="sm:text-lg font-semibold text-gray-700 mb-2">남구로 방면</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg shadow-sm border">
          <p class="font-medium text-gray-800">{{ subwayDetail[0].SUB_TERMINAL }}행 열차</p>
          <p class="text-sm text-gray-600">{{ subwayDetail[0].SUB_ARMG1 }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg shadow-sm border">
          <p class="font-medium text-gray-800">{{ subwayDetail[1].SUB_TERMINAL }}행 열차</p>
          <p class="text-sm text-gray-600">{{ subwayDetail[1].SUB_ARMG1 }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-2 rounded-lg shadow-sm border">
      <h2 class="sm:text-lg font-semibold text-gray-700 mb-2">철산 방면</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg shadow-sm border">
          <p class="font-medium text-gray-800">{{ subwayDetail[2].SUB_TERMINAL }}행 열차</p>
          <p class="text-sm text-gray-600">{{ subwayDetail[2].SUB_ARMG1 }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg shadow-sm border">
          <p class="font-medium text-gray-800">{{ subwayDetail[3].SUB_TERMINAL }}행 열차</p>
          <p class="text-sm text-gray-600">{{ subwayDetail[3].SUB_ARMG1 }}</p>
        </div>
      </div>
    </div>

    <!-- 교통약자 이용시설 -->
    <h2 class="text-xl font-bold text-gray-800 mb-2">교통약자 이용 시설</h2>
    <div class="flex flex-row bg-white p-4 rounded-lg shadow-sm border">
      <!-- <h2 class="sm:text-lg font-semibold text-gray-700 mb-2">엘리베이터</h2> -->
      <button
        class="border sm:text-lg font-semibold text-gray-700 mb-2 ml-1"
        @click="openeleaterModal"
      >
        엘리베이터
      </button>

      <ElevaterModal :elevator="subwayFacinfo" />
    </div>
  </div>
</template>
