import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CategoryType } from '@/types'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<CategoryType[]>([])
  const setCategories = (payload: CategoryType[]) => {
    categories.value = payload
  }

  return {
    categories,
    setCategories,
  }
})
