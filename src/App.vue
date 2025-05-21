<template>
  <div v-if="store.isLoading">
    <div class="fixed w-full h-full z-50 flex justify-center items-center">
      <div class="w-72 h-72 overflow-clip opacity-100 z-50 relative">
        <img src="@/assets/icon.svg" />
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

<style></style>
