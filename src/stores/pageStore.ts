import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {PageType} from "@/types";

export const usePageStore = defineStore('page', () => {
  const page = ref<PageType[]>([])
  const setPage = (payload: PageType[]) => {
    page.value = payload
  }


  return {
    page,
    setPage,
  }
})
