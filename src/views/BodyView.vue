<template>
  <main class="px-16 py-10 h-screen">
    <div
      class="grid grid-cols-1 h-full items-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
    >
      <!-- 카드 1 -->
      <div
        class="flex justify-center max-h-96 items-center rounded-xl-full h-full overflow-hidden shadow-lg border border-gray-200"
        @click=""
      >
        <TrafficCard />
      </div>

      <!-- 카드 2 -->
      <div
        class="rounded-xl max-w-full max-h-full overflow-hidden shadow-lg border border-gray-200"
      >
        <Weather></Weather>
      </div>

      <div
        class="flex justify-center max-h-96 items-center rounded-xl-full h-full overflow-hidden shadow-lg border border-gray-200"
        @click=""
      >
        <div class="size-4/5 bg-red-600 hover:bg-red-600 text-white">TEST</div>
      </div>

      <div
        class="flex justify-center max-h-96 items-center rounded-xl-full h-full overflow-hidden shadow-lg border border-gray-200"
        @click=""
      >
        <div class="size-4/5 bg-red-600 hover:bg-red-600 text-white">TEST</div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Weather from '../views/personal/hhc/Weather.vue'

import TrafficCard from '@/components/ccw/TrafficCard.vue'
</script>
