<template>
  <Modal />
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import Modal from './views/Modal.vue'
import { useModalStore } from './stores/modal'

useModalStore()
</script>
