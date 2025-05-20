<template>
  <main class="px-28 py-10 h-screen">
    <div class="grid grid-cols-1 h-full sm:grid-cols-2 gap-6">
      <!-- 카드 1 -->
      <div class="rounded-xl-full overflow-hidden shadow-lg border border-gray-200">
        <img
          src="https://via.placeholder.com/400x250"
          alt="Room Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4 space-y-2">
          <h2 class="text-lg font-semibold">서울 강남 스튜디오</h2>
          <p class="text-sm text-gray-500">1박에 120,000원 · ⭐ 4.9 · 리뷰 24개</p>
        </div>
      </div>

      <!-- 카드 2 -->
      <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <Weather></Weather>
      </div>

      <!-- 카드 3 -->
      <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <img
          src="https://via.placeholder.com/400x250"
          alt="Room Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4 space-y-2">
          <h2 class="text-lg font-semibold">부산 광안리 해변 뷰</h2>
          <p class="text-sm text-gray-500">1박에 100,000원 · ⭐ 4.8 · 리뷰 30개</p>
        </div>
      </div>

      <!-- 카드 4 -->
      <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <img
          src="https://via.placeholder.com/400x250"
          alt="Room Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4 space-y-2">
          <h2 class="text-lg font-semibold">속초 산장형 숙소</h2>
          <p class="text-sm text-gray-500">1박에 70,000원 · ⭐ 4.6 · 리뷰 12개</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Weather from '../views/personal/hhc/Weather.vue'
</script>
