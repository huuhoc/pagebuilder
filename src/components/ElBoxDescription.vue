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
      <h4 class="font-medium">
        {{ dataItem.content?.title?.value_vi || dataItem.content?.title?.value }}
      </h4>
    </div>

    <div class="flex flex-col gap-5">
      <div v-for="i in 8" :key="i" class="flex items-center gap-3 bg-gray-100 rounded p-2">
        <BaseSkeleton class="w-4 h-4 rounded-full" />
        <BaseSkeleton class="w-full h-2" />
      </div>
    </div>
  </div>
</template>
