<template>
  <!-- HTML 태크라고 생각 -->
  <main class="w-full h-full bg-red-600 hover:bg-red-600 text-white min-w-full">
    <div class="w-full h-full">
      <div class="w-full h-full flex flex-col items-center justify-center bg-orange-300">
        <div class="bg-lime-500 py-3 text-3xl">교통량 정보</div>
        <div class="grow flex items-center bg-blue-300">
          <div class="text-9xl sm:text-9xl md:text-9xl">🤣</div>
        </div>
        <div
          class="grow w-full text-center text-ellipsis whitespace-nowrap overflow-hidden bg-purple-300 max-w-full max-h-full"
        >
          <div class="bg-green-600">
            <div class="text-2xl">평균 속력</div>
            {{ traffic_spd }}
          </div>
          <div class="bg-green-600">{{ traffic_idx }}</div>

          <!-- <div class="bg-green-600">{{ traffic_time }}</div> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// import { onMounted } from 'vue'
defineProps({
  road_msg: String,
  traffic_idx: String,
  traffic_spd: Number,
  traffic_time: String,
})
</script>
<!-- {{ road_msg }} <br />
    {{ traffic_idx }} <br />
    {{ traffic_spd }} <br />
    {{ traffic_time }} <br /> -->
