<template>
  <main class="px-16 py-10 transition-all duration-200 ease-in-out lg:px-6">
    <div class="h-full w-full flex justify-center">
      <div
        class="grid grid-cols-1 items-center transition-[max-width] duration-200 ease-in-out max-w-96 sm:max-w-full md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6"
      >
        <!-- 카드 1 -->
        <div class="card-container" @click="">
          <Traffic />
        </div>

        <!-- 카드 2 -->
        <div class="card-container">
          <Weather></Weather>
        </div>

        <!-- 소희 -->
        <div class="card-container overflow-y-scroll" @click="">
          <Subway />
        </div>
        <!-- 카드 4 -->
        <div class="card-container" @click="openAirModal">
          <air />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Weather from '../views/personal/hhc/Weather.vue'

import Subway from './personal/ksh/Subway.vue'
import air from './personal/ktm/air.vue'
import Traffic from './personal/ccw/Traffic.vue'

import { useAirModalStore } from '@/stores/airmodal'
import { fetchAirAll } from '@/model/api_air'
const airModal = useAirModalStore()
const airList = ref([])

const openAirModal = async () => {
  const data = await fetchAirAll()
  airList.value = data
  airModal.open({ title: '서울시', airList })
}
</script>

<style scoped>
.card-container {
  @apply max-h-96 h-full items-center rounded-lg shadow-lg border border-gray-200;
}
</style>
