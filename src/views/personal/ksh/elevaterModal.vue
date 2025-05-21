<template>
  <div>
    <!-- <p>엘리베이터 위치:{{ elevater.INSTL_PSTN }}</p> -->
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal'

const modal = useModalStore()
import { defineProps } from 'vue'

const props = defineProps({
  elevater: '',
})

function openMoatl() {
  modal.open({
    title: '엘리베이터 위치',
  })
}

defineExpose({
  openModal,
})
</script>
