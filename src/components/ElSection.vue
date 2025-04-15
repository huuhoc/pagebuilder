<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, resolveComponent } from 'vue'
import type { ListItemsElementType } from '@/types'
import { getClassColumn } from '@/helper'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { useElementStore } from '@/stores/layouts'
import { useSettingsElementStore } from '@/stores/settingsElementStore'

const layoutStore = useElementStore()
const settingsElementStore = useSettingsElementStore()

const props = defineProps<{
  dataItem: ListItemsElementType
}>()

const emit = defineEmits<{
  onDropSection: [value: any]
}>()

const onDropLayout = (dropResult: any) => {
  emit('onDropSection', { data: dropResult, sectionId: props.dataItem.id })
}

const getChildPayload2 = (index: any) => {
  return props.dataItem.children ? props.dataItem.children[index] : null
}

const handleDelete = () => {
  layoutStore.deleteElement(props.dataItem.id)
}

const handleConfig = () => {
  settingsElementStore.setElementSelected(props.dataItem)
  settingsElementStore.setShowSettingsElement(true)
}

// Track column widths
const columnWidths = ref<Record<string, number>>({})
const isResizing = ref(false)
const resizingColumn = ref<string | null>(null)
const startX = ref(0)
const startWidth = ref(0)

// Column resizing functions
const startResize = (e: MouseEvent, columnId: string, index: number) => {
  document.body.classList.add('resizing')
  // Only allow resizing if not the last column
  if (props.dataItem.children && index < props.dataItem.children.length - 1) {
    isResizing.value = true
    resizingColumn.value = columnId
    startX.value = e.clientX
    startWidth.value = columnWidths.value[columnId]

    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResize)

    e.preventDefault()
  }
}

const handleResize = (event: MouseEvent) => {
  // console.log('event:', event)
}

// const updateColumnClass = (columnId: string, widthPercentage: number) => {
//   // Convert percentage to tailwind column class
//   const colSpan = Math.round((widthPercentage / 100) * 12)

//   // Update in store
//   layoutStore.updateStyleElement({
//     id: columnId,
//     styles: {
//       ...props.dataItem.children?.find((child) => child.id === columnId)?.styles,
//       column: colSpan,
//     },
//   })
// }

const stopResize = () => {
  document.body.classList.remove('resizing')
  isResizing.value = false
  resizingColumn.value = null

  // Remove event listeners
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}
</script>

<template>
  <div class="border border-gray-300 border-opacity-60 rounded p-20px relative">
    <div class="flex space-x-1 absolute top-1 left-1 z-10">
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
    <div
      class="container mx-auto pt-2"
      :class="dataItem.styles?.hasContainer?.value ? 'px-10' : ''"
      :style="{ backgroundColor: String(dataItem.styles?.['background-color'].value) }"
    >
      <Container
        group-name="list-elements"
        orientation="horizontal"
        drag-handle-selector=".drag-handle"
        behaviour="contain"
        :get-child-payload="getChildPayload2"
        @drop="onDropLayout($event)"
        class="!flex gap-3"
        ref="refContainer"
      >
        <Draggable
          v-for="(item, index) in dataItem.children"
          :key="item.id"
          :class="`relative !flex !h-auto ${getClassColumn(Number(item.styles?.column.value))}`"
        >
          <component :is="resolveComponent(item.el)" :dataItem="item"></component>
          <div
            v-if="dataItem.children && index < dataItem.children.length - 1"
            class="flex items-center justify-center absolute top-0 bottom-0 -right-1.5 w-1.5 translate-x-1/2 cursor-col-resize bg-transparent hover:bg-blue-200 hover:bg-opacity-30 z-10"
            @mousedown="(e) => startResize(e, item.id, index)"
          >
            <span class="bg-black bg-opacity-50 w-0.5 h-8"></span>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<style>
body.resizing {
  cursor: col-resize !important;
  user-select: none;
}
</style>
