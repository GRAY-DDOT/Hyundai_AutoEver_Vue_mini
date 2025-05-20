<template>
  <div class="flex flex-col min-h-screen">
    <header class="h-24 bg-sky-950 text-white text-4xl">
      <div class="w-full h-full mx-auto flex justify-center items-center">가디의삶</div>
    </header>

    <main class="grow">
      <!-- 각 페이지 컴포넌트 출력 위치 -->
      <router-view />
    </main>

    <footer class="h-24 bg-blue-800"></footer>
  </div>
</template>

<script setup>
const name = '홍길동'
</script>

<style scoped>
/* main에 @apply는 필요 없음. 클래스에서 처리 */
</style>
