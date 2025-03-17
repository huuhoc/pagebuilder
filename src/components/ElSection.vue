<script setup lang="ts">
import type { ListItemsElementType } from '@/types'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { useElementStore } from '@/stores/layouts'

const layoutStore = useElementStore()

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

const handleConfig = () => {}
</script>

<template>
  <div class="border border-gray-300 border-opacity-60 rounded p-5 relative">
    <div class="flex space-x-1 absolute top-1 left-1 z-10">
      <button class="drag-handle p-0.5 bg-black text-white rounded-sm cursor-move">
        <SvgIcon name="drag" class="w-4 h-4"></SvgIcon>
      </button>
      <button class="p-0.5 bg-blue-500 text-white rounded-sm" @click="handleConfig">
        <SvgIcon name="setting" class="w-4 h-4"></SvgIcon>
      </button>
      <button class="p-0.5 bg-red-500 text-white rounded-sm" @click="handleDelete">
        <SvgIcon name="delete" class="w-4 h-4"></SvgIcon>
      </button>
    </div>
    <div class="container mx-auto px-10">
      <Container
        group-name="list-elements"
        orientation="horizontal"
        behaviour="contain"
        :get-child-payload="getChildPayload2"
        @drop="onDropLayout($event)"
        class="!flex gap-3"
      >
        <Draggable v-for="item in dataItem.children" :key="item.id" class="flex">
          <component :is="item.data.component" :dataItem="item"></component>
        </Draggable>
      </Container>
    </div>
  </div>
</template>
