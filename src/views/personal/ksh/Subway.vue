<script setup>
import { computed } from 'vue'

import { useRealTimeStore } from '@/stores/useRealTimeStore'
const store = useRealTimeStore()

import { useModalStore } from '@/stores/modal'

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
  <div v-if="!isLoading && !isError && !isEmpty" class="p-3">
    <!-- 지하철 도착 정보 -->
    <h2 class="text-xl font-bold text-gray-800 mb-2">지하철 도착 정보</h2>
    <p class="text-lg font-semibold text-gray-700 mb-2">
      {{ subway.SUB_STN_NM }}, {{ subway.SUB_STN_LINE }}호선
    </p>

    <div class="bg-white p-2 rounded-lg shadow-sm border mb-2">
      <h3 class="sm:text-sm font-semibold text-gray-700 mb-2">남구로 방면</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div class="bg-gray-50 p-2 rounded-lg shadow-sm border">
          <p class="text-sm font-medium text-gray-800">{{ subwayDetail[0].SUB_TERMINAL }}행 열차</p>
          <p class="text-xs text-gray-600">{{ subwayDetail[0].SUB_ARMG1 }}</p>
        </div>
        <div class="bg-gray-50 p-2 rounded-lg shadow-sm border">
          <p class="text-sm font-medium text-gray-800">{{ subwayDetail[1].SUB_TERMINAL }}행 열차</p>
          <p class="text-xs text-gray-600">{{ subwayDetail[1].SUB_ARMG1 }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-2 rounded-lg shadow-sm border mb-2">
      <h3 class="sm:text-sm font-semibold text-gray-700 mb-2">철산 방면</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-2 rounded-lg shadow-sm border">
          <p class="text-sm font-medium text-gray-800">{{ subwayDetail[2].SUB_TERMINAL }}행 열차</p>
          <p class="text-xs text-gray-600">{{ subwayDetail[2].SUB_ARMG1 }}</p>
        </div>
        <div class="bg-gray-50 p-2 rounded-lg shadow-sm border">
          <p class="text-sm font-medium text-gray-800">{{ subwayDetail[3].SUB_TERMINAL }}행 열차</p>
          <p class="text-xs text-gray-600">{{ subwayDetail[3].SUB_ARMG1 }}</p>
        </div>
      </div>
    </div>

    <!-- <button
      class="border sm:text-lg font-semibold text-gray-700 mb-2 ml-1"
      @click="openeleaterModal"
    >
      엘리베이터
    </button>
    <ElevaterModal :elevator="subwayFacinfo" /> -->

    <!-- 교통약자 이용시설 -->
    <!-- <h2 class="text-xl font-bold text-gray-800 mb-2">교통약자 이용 시설</h2>
    <div class="flex flex-row bg-white p-4 rounded-lg shadow-sm border">

      <button
        class="border sm:text-lg font-semibold text-gray-700 mb-2 ml-1"
        @click="openeleaterModal"
      >
        엘리베이터
      </button>

      <ElevaterModal :elevator="subwayFacinfo" />
    </div> -->
  </div>
</template>
