<script setup lang="ts">
import type { ListItemsElementType } from '@/types'
import { useElementStore } from '@/stores/layouts'
import { useSettingsElementStore } from '@/stores/settingsElementStore'

import BaseSkeleton from '@/components/common/BaseSkeleton.vue'

const props = defineProps<{
  dataItem: ListItemsElementType
}>()

const layoutStore = useElementStore()
const settingsElementStore = useSettingsElementStore()

const handleConfig = () => {
  settingsElementStore.setElementSelected(props.dataItem)
  settingsElementStore.setShowSettingsElement(true)
}
const handleDelete = () => {
  layoutStore.deleteElement(props.dataItem.id)
}
</script>

<template>
  <div class="w-full bg-white rounded shadow-sm p-4 relative">
    <div class="flex space-x-1 absolute top-1 right-1 z-10">
      <span class="drag-handle p-0.5 bg-black text-white rounded-sm cursor-move">
        <SvgIcon name="drag" class="w-4 h-4"></SvgIcon>
      </span>
      <span class="p-0.5 bg-blue-500 text-white rounded-sm cursor-pointer" @click="handleConfig">
        <SvgIcon name="setting" class="w-4 h-4"></SvgIcon>
      </span>
      <span class="p-0.5 bg-red-500 text-white rounded-sm cursor-pointer" @click="handleDelete">
        <SvgIcon name="delete" class="w-4 h-4"></SvgIcon>
      </span>
    </div>

    <div class="flex justify-between items-center mb-3">
      <h4 class="font-medium">{{ dataItem.content?.title?.value }}</h4>
    </div>
    <div class="relative">
      <div class="flex gap-5 w-full">
        <BaseSkeleton class="aspect-video w-full" />
        <BaseSkeleton class="aspect-video w-full" />
        <BaseSkeleton class="aspect-video w-full" />
        <BaseSkeleton class="aspect-video w-full" />
      </div>
      <div class="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full">
        <BaseSkeleton class="w-8 h-8 bg-gray-400 -translate-x-1/2" />
        <BaseSkeleton class="w-8 h-8 bg-gray-400 translate-x-1/2" />
      </div>
    </div>
  </div>
</template>
