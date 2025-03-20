<template>
  <Teleport to="#aqt-contain">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded shadow-xl w-full max-w-2xl overflow-hidden">
        <div class="flex justify-between items-center px-4 py-2 border-b">
          <h3 class="text-base font-medium">Cài đặt {{ postData?.name }}</h3>
          <span @click="closeModal" class="text-gray-500 hover:text-gray-700 cursor-pointer">
            <SvgIcon name="close" class="w-3 h-3" />
          </span>
        </div>

        <div class="p-4">
          <form @submit.prevent="saveChanges">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
              <input
                v-model="formData.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
              />
            </div>
          </form>
        </div>

        <div class="flex justify-end gap-2 px-4 py-2 border-t">
          <span
            @click="closeModal"
            class="px-4 py-1 bg-gray-200 text-gray-800 cursor-pointer rounded hover:bg-gray-300"
          >
            Hủy
          </span>
          <span
            @click="saveChanges"
            class="font-medium px-4 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600"
          >
            Lưu
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ListItemsElementType } from '@/types'
import { useSettingsElementStore } from '@/stores/settingsElementStore'

const settingsElementStore = useSettingsElementStore()

const props = defineProps<{
  isOpen: Boolean
  postData: ListItemsElementType | undefined
}>()

// Form data with defaults
const formData = ref({
  title: '',
})

// Update form data when post data changes
watch(
  () => props.postData,
  (newVal) => {
    if (newVal) {
      formData.value = {
        title: newVal.name || '',
      }
    }
  },
  { immediate: true },
)

const closeModal = () => {
  settingsElementStore.setShowSettingsElement(false)
}

const saveChanges = () => {
  // layoutStore.updateElement({
  //   id: props.dataItem.id,
  //   content: updatedPost,
  // })
  closeModal()
}
</script>
