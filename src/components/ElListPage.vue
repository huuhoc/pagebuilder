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
  <div class="w-full bg-white rounded shadow-sm p-4 relative flex flex-col overflow-hidden">
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

    <div>
      <div class="flex justify-between items-center mb-3">
        <h4 class="font-medium">
          {{ dataItem.content?.titlePage?.value_vi || dataItem.content?.titlePage?.value }}
        </h4>
      </div>

      <div class="flex-1 overflow-hidden relative">
        <div class="space-y-2 flex-1 flex flex-col inset-0">
          <div
            v-for="i in 5"
            :key="i"
            class="flex flex-col items-center justify-center gap-3 bg-gray-100 rounded p-2"
          >
            <BaseSkeleton class="w-10 h-10 aspect-video" />
            <div class="space-y-2 w-full flex flex-col items-center justify-center">
              <BaseSkeleton class="w-40 h-3" />
              <div class="space-y-1">
                <BaseSkeleton class="w-20 h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
