<template>
  <div class="bg-gray-300 rounded"></div>
  <!-- :class="{
      'animate-pulse': animation === 'pulse',
      'animate-shimmer': animation === 'shimmer',
    }" -->
</template>

<script setup lang="ts">
// Define props with validation and default values
defineProps({
  animation: {
    type: String,
    default: 'pulse',
  },
})
</script>

<style>
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.animate-shimmer {
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  animation: shimmer 1.5s infinite linear;
}
</style>
