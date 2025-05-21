<template>
  <div class="flex flex-col min-h-screen">
    <header class="h-24 bg-sky-950 text-white">
      <div class="w-full h-full flex relative">
        <div class="grow px-3 absolute w-full h-full">
          <div
            class="w-full h-full mx-auto flex justify-center items-center text-4xl font-semibold"
          >
            가디의삶
          </div>
        </div>
        <div class="grow flex justify-end items-center px-5 z-10">
          <button
            class="bg-white p-3 rounded-lg"
            @click="
              () => {
                eventStore.done()
                console.log('버튼 이벤트 저장 완료!')
              }
            "
          >
            <div class="text-black text-xs">퇴근하기</div>
          </button>
        </div>
      </div>
    </header>

    <main class="grow flex justify-center">
      <!-- 각 페이지 컴포넌트 출력 위치 -->
      <router-view />
    </main>
  </div>
  <footer class="h-12 bg-sky-950 text-white">
    <div class="w-full h-full flex items-center justify-center opacity-35 font-light">
      모든 저작권은 없습니다
    </div>
  </footer>
</template>

<script setup>
import { useEventStore } from '@/stores/event'

const eventStore = useEventStore()
</script>

<style scoped>
/* main에 @apply는 필요 없음. 클래스에서 처리 */
</style>
