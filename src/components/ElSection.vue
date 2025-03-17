<script setup lang="ts">
import { onMounted, ref, resolveComponent } from 'vue'
import type { ListItemsElementType } from '@/types'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { useElementStore } from '@/stores/layouts'
import ConfigSectionModal from '@/components/ConfigSectionModal.vue'

// import ElSection from '@/components/ElSection.vue'
// import ElSliderPost from '@/components/ElSliderPost.vue'
// import ElListPost from '@/components/ElListPost.vue'
// import ElFeaturePost from '@/components/ElFeaturePost.vue'

// Map component names to their actual imported components
// const componentMap = {
//   ElSection,
//   ElListPost,
//   ElSliderPost,
//   ElFeaturePost,
// }

// Function to resolve component from string name
// const resolveComponent = (name: string) => {
//   return componentMap[name as keyof typeof componentMap] || null
// }

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

// Modal state
const isEditModalOpen = ref(false)

// Post content with defaults
const postContent = ref({
  id: '',
  title: '',
  description: '',
  imageUrl: '',
  date: new Date().toISOString().split('T')[0],
  readingTime: 5,
})

// Initialize post content from dataItem if available
onMounted(() => {
  if (props.dataItem.content) {
    postContent.value = { ...props.dataItem.content }
  } else {
    postContent.value.id = props.dataItem.id
  }
})

const handleConfig = () => {
  isEditModalOpen.value = true
}

const savePostChanges = (updatedPost: any) => {
  // Update local state
  postContent.value = updatedPost

  // Update in store
  layoutStore.updateElement({
    id: props.dataItem.id,
    content: updatedPost,
  })

  isEditModalOpen.value = false
}
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
          <component :is="resolveComponent(item.data.component)" :dataItem="item"></component>
        </Draggable>
      </Container>
    </div>
  </div>

  <!-- Config Modal -->
  <ConfigSectionModal
    :is-open="isEditModalOpen"
    :post-data="postContent"
    @close="isEditModalOpen = false"
    @save="savePostChanges"
  />
</template>
