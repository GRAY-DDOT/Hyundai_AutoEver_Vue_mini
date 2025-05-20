<template>
  <div
    v-if="modal.isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
      <h2 class="text-lg font-bold mb-2">{{ modal.title }}</h2>
      <p class="mb-4">{{ modal.message }}</p>
      <button
        @click="modal.close"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal'
const modal = useModalStore()
</script>
