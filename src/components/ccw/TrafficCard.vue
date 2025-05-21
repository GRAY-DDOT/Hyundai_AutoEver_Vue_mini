<template>
  <!-- HTML 태크라고 생각 -->
  <main class="w-full h-full bg-red-600 hover:bg-red-600 text-white min-w-full">
    <div class="w-full h-full">
      <div class="w-full h-full flex flex-col items-center justify-center bg-orange-300">
        <div class="grow flex items-center bg-blue-300">
          <div class="text-3xl sm:text-9xl">🤣</div>
        </div>
        <div
          class="grow text-3xl text-ellipsis overflow-hidden bg-purple-300 max-w-full max-h-full"
        >
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
          sdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdfsdfsfdfdsfsdf
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
