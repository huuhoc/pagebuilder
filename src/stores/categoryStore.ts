import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CategoryType, MenuType } from '@/types'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<CategoryType[]>([])
  const setCategories = (payload: CategoryType[]) => {
    categories.value = payload
  }

  const menus = ref<MenuType[]>([])
  const setMenus = (payload: MenuType[]) => {
    menus.value = payload
  }

  return {
    categories,
    setCategories,
    menus,
    setMenus,
  }
})
