<template>
  <aircard v-if="airInfo" :airInfo="airInfo" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { fetchAir } from '@/model/api_air'
import aircard from './aircard.vue'

const airInfo = ref(null)

onMounted(async () => {
  airInfo.value = await fetchAir()
})
</script>
