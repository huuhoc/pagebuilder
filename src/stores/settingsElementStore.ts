import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ListItemsElementType } from '@/types'

export const useSettingsElementStore = defineStore('settingsElement', () => {
  const showSettingsElement = ref(false)
  const setShowSettingsElement = (status: boolean) => {
    showSettingsElement.value = status
  }

  const elementSelected = ref<ListItemsElementType>()

  const setElementSelected = (element: ListItemsElementType) => {
    elementSelected.value = element
  }

  return {
    elementSelected,
    showSettingsElement,
    setElementSelected,
    setShowSettingsElement,
  }
})
