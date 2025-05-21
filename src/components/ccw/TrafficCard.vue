<template>
  <!-- HTML 태크라고 생각 -->
  <main class="w-full h-full min-w-full">
    <div class="w-full h-full">
      <div class="w-full h-full flex flex-col rounded-2xl items-center justify-center bg-slate-600">
        <div class="py-3 text-3xl text-white">교통량 정보</div>
        <div class="grow flex items-center">
          <div class="text-9xl sm:text-9xl md:text-9xl">{{ checkSpd }}</div>
        </div>
        <div
          class="grow w-full text-center mt-4 text-ellipsis whitespace-nowrap overflow-hidden max-w-full max-h-full"
        >
          <div
            class="inline-block px-5 py-2 rounded-2xl shadow-lg border border-gray-200 bg-slate-50 space-y-4"
          >
            <div class="text-3xl">평균 속력</div>
            <div
              class="text-4xl"
              :class="{
                'text-red-500': idx === '정체',
                'text-orange-500': idx === '서행',
                'text-green-500': idx === '원할',
              }"
            >
              {{ traffic_spd }}
            </div>
          </div>
          <!-- <div class="bg-green-600">{{ traffic_idx }}</div> -->

          <!-- <div class="bg-green-600">{{ traffic_time }}</div> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// import { onMounted } from 'vue'
const props = defineProps({
  road_msg: String,
  traffic_idx: String,
  traffic_spd: Number,
  traffic_time: String,
})

const spd = toRef(props, 'traffic_spd')
const idx = toRef(props, 'traffic_idx')

const emoji = ['🤬', '😡', '🙁', '🙂', '😀', '😆']

const checkSpd = computed(() => {
  if (spd.value >= 40) return emoji[5]
  else if (spd.value >= 30) return emoji[4]
  else if (spd.value >= 20) return emoji[3]
  else if (spd.value >= 15) return emoji[2]
  else if (spd.value >= 8) return emoji[1]

  return emoji[0]
})
</script>

<style scoped></style>
