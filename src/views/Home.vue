<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="flex flex-col gap-4">
      <router-link
        to="/a"
        class="block text-center px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
      >
        창우
      </router-link>
      <router-link
        to="/b"
        class="block text-center px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        희찬
      </router-link>
      <router-link
        to="/c"
        class="block text-center px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
      >
        태민
      </router-link>
      <router-link
        to="/d"
        class="block text-center px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        소희
      </router-link>
    </div>
  </div>
</template>
