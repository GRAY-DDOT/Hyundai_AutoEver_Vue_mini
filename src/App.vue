<template>
  <div v-if="store.isLoading">
    <div :class="{ 'fixed w-full h-full z-50 flex justify-center items-center': true }">
      <div class="w-72 h-72 overflow-clip opacity-100 z-50 relative p-20">
        <div :class="[`dot dot-1`]">
          <img src="@/assets/icon.svg" />
        </div>
      </div>
      <div class="absolute w-full text-center z-50 opacity-100 text-white text-3xl translate-y-32">
        로딩 중...
      </div>
      <div class="absolute w-full h-full z-0 bg-black opacity-55"></div>
    </div>
  </div>
  <Modal />
  <AirModal />
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import Modal from './views/Modal.vue'
import AirModal from './views/personal/ktm/AirModal.vue'
import { useModalStore } from './stores/modal'

import { useRealTimeStore } from '@/stores/useRealTimeStore.js'

const store = useRealTimeStore()

useModalStore()

onMounted(() => {
  store.startAutoRefresh()
})
</script>

<style scoped>
@keyframes discord-spinner {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.dot {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: discord-spinner 1.4s infinite ease-in-out both;
}

.dot-1 {
  transform: translate(-50%, -50%) rotate(0deg) translateX(20px);
  animation-delay: -0.32s;
}
</style>
