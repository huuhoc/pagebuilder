<script setup lang="ts">
import type { ListItemsElementType } from '@/types'

const props = defineProps<{
  dataItem: ListItemsElementType
}>()
</script>

<template>
  <div class="border border-gray-300 border-opacity-60 rounded p-3">
    <h2>{{ dataItem.data.title }}</h2>
  </div>
</template>
