<template>
  <Modal />
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import Modal from './views/Modal.vue'
import { useModalStore } from './stores/modal'
import { useRealTimeStore } from '@/stores/useRealTimeStore.js'

const store = useRealTimeStore()

useModalStore()

onMounted(() => {
  store.startAutoRefresh()
})

</script>

<style></style>
