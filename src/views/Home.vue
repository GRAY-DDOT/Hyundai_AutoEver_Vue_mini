<template>
  <div class="flex flex-col min-h-screen">
    <header class="h-24 bg-sky-950 text-white text-4xl">
      <div></div>
      <div class="w-full h-full mx-auto flex justify-center items-center font-semibold">
        가디의삶
      </div>
    </header>

    <main class="grow flex justify-center">
      <!-- 각 페이지 컴포넌트 출력 위치 -->
      <router-view />
    </main>
  </div>
  <footer class="h-24 bg-blue-800 text-white"></footer>
</template>

<script setup></script>

<style scoped>
/* main에 @apply는 필요 없음. 클래스에서 처리 */
</style>
