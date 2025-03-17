<script setup lang="ts">
import type { ListItemsElementType } from '@/types'
import { useElementStore } from '@/stores/layouts'

const props = defineProps<{
  dataItem: ListItemsElementType
}>()

const layoutStore = useElementStore()

const handleDelete = () => {
  layoutStore.deleteElement(props.dataItem.id)
}
</script>

<template>
  <div class="w-full bg-white rounded shadow-sm p-4 relative">
    <div class="flex space-x-1 absolute top-1 right-1 z-10">
      <button class="p-0.5 bg-blue-500 text-white rounded-sm">
        <SvgIcon name="setting" class="w-4 h-4"></SvgIcon>
      </button>
      <button class="p-0.5 bg-red-500 text-white rounded-sm" @click="handleDelete">
        <SvgIcon name="delete" class="w-4 h-4"></SvgIcon>
      </button>
    </div>

    <div class="flex justify-between items-center mb-3">
      <h4 class="font-medium">{{ dataItem.data.title }}</h4>
    </div>

    <div class="space-y-2">
      <!-- List of posts mock -->
      <div
        v-for="i in 3"
        :key="i"
        class="flex items-start border-b border-gray-100 pb-2 last:border-b-0"
      >
        <div class="w-32 aspect-video bg-gray-200 flex-shrink-0 rounded mr-3"></div>
        <div>
          <h5 class="font-medium text-sm">Post Title {{ i }}</h5>
          <p class="text-xs text-gray-600 line-clamp-2">
            Short description of the post goes here, explaining what the post is about. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <div class="text-xs text-gray-400 mt-1">March 17, 2025</div>
        </div>
      </div>
    </div>
  </div>
</template>
