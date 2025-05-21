<template>
  <div
    v-if="modal.isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded shadow-md w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
      <div class="sticky top-0 z-20 bg-white px-6 pt-4 pb-2 border-b relative">
        <h2 class="text-xl font-bold text-center">서울시</h2>

        <button
          @click="modal.close"
          class="absolute top-1 right-1 text-gray-500 hover:text-gray-800 text-3xl w-10 h-10 flex items-center justify-center rounded-full"
        >
          &times;
        </button>
      </div>

      <div class="p-6">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center"
          style="justify-items: center"
        >
          <aircard v-for="(airInfo, idx) in modal.airList" :key="idx" :airInfo="airInfo" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAirModalStore } from '@/stores/airmodal'
import aircard from './aircard.vue'

const modal = useAirModalStore()
</script>
