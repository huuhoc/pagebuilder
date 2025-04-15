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

    <div class="space-y-2">
      <div class="relative">
        <BaseSkeleton class="aspect-video w-full" />
        <BaseSkeleton class="h-3 w-5/12 bg-gray-400 absolute bottom-10 left-3" />
        <BaseSkeleton class="h-5 w-11/12 bg-gray-400 absolute bottom-3 left-3" />
      </div>
      <div class="flex gap-1 w-full items-center justify-between">
        <div class="flex items-center gap-1">
          <BaseSkeleton class="h-1.5 w-7 rounded-none" />
          <BaseSkeleton class="h-1.5 w-7 rounded-none" />
          <BaseSkeleton class="h-1.5 w-7 rounded-none" />
        </div>
        <div class="flex items-center gap-1">
          <BaseSkeleton class="h-8 w-8" />
          <BaseSkeleton class="h-8 w-8" />
        </div>
      </div>
    </div>
  </div>
</template>
