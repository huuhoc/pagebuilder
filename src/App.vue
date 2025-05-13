<script setup lang="ts">
import { ref, resolveComponent, onMounted, onBeforeUnmount } from 'vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { useElementStore } from '@/stores/layouts'
import { useSettingsElementStore } from '@/stores/settingsElementStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { getList } from '@/services/categories'
import { getListMenu } from '@/services/menus'
import { useConfigStore } from '@/stores/configStore'
import {usePageStore} from "@/stores/pageStore.ts";
import { getListPage } from '@/services/page'

import ConfigModal from '@/components/ConfigModal.vue'

// Import images
import ElListPost from '@/assets/ElListPost.png'
import ElListPostCategory from '@/assets/ElListPostCategory.png'
import ElSliderPost from '@/assets/ElSliderPost.png'
import ElFeaturePost from '@/assets/ElFeaturePost.png'
import ElListLink from '@/assets/ElListLink.png'
import ElBanner from '@/assets/ElBanner.png'
import ElSliderPostAudio from '@/assets/ElSliderPostAudio.png'
import ElSliderPostImage from '@/assets/ElSliderPostImage.png'
import ElSliderPostVideo from '@/assets/ElSliderPostVideo.png'
import ElMenu from '@/assets/ElMenu.png'
import ElListPostStacked from '@/assets/ElListPostStacked.png'

const mapImages: Record<string, string> = {
  ElListPost,
  ElListPostCategory,
  ElSliderPost,
  ElFeaturePost,
  ElListLink,
  ElBanner,
  ElSliderPostAudio,
  ElSliderPostImage,
  ElSliderPostVideo,
  ElMenu,
  ElListPostStacked,
}

// Use the element store
const layoutStore = useElementStore()
const settingsElementStore = useSettingsElementStore()
const categoryStore = useCategoryStore()
const pageStore = usePageStore()
const configStore = useConfigStore()

const fullscreenElement = ref()
const isFullScreen = ref(false)
const toggleFullScreen = () => {
  if (!isFullScreen.value) {
    enterFullScreen()
  } else {
    exitFullScreen()
  }
}

const enterFullScreen = () => {
  const elem: HTMLElement = fullscreenElement.value
  if (!elem) return

  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen()
  }
}

const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

const onFullScreenChange = () => {
  isFullScreen.value =
    !!document.fullscreenElement ||
    !!document.webkitFullscreenElement ||
    !!document.mozFullScreenElement ||
    !!document.msFullscreenElement
}

onMounted(async () => {
  document.addEventListener('fullscreenchange', onFullScreenChange)
  document.addEventListener('webkitfullscreenchange', onFullScreenChange)
  document.addEventListener('mozfullscreenchange', onFullScreenChange)
  document.addEventListener('MSFullscreenChange', onFullScreenChange)
  const listMenu = await getListMenu(configStore.appApi)
  const listCate = await getList(configStore.appApi, { SkipCount: 0, MaxResultCount: 9999 })
  const listPage= await getListPage(configStore.appApi, { SkipCount: 0, MaxResultCount: 9999 })

  categoryStore.setMenus(listMenu)
  categoryStore.setCategories(listCate)
  pageStore.setPage(listPage?.items)
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', onFullScreenChange)
  document.removeEventListener('webkitfullscreenchange', onFullScreenChange)
  document.removeEventListener('mozfullscreenchange', onFullScreenChange)
  document.removeEventListener('MSFullscreenChange', onFullScreenChange)
})
</script>

<template>
  <div id="aqt-contain" class="flex flex-1 bg-gray-100 overflow-hidden" ref="fullscreenElement">
    <div class="aqt-sidebar w-2/12 border-r border-gray-200">
      <div class="overflow-hidden h-full flex flex-col">
        <h2 class="aqt-sidebar__title">Thành phần</h2>
        <div class="flex-1 overflow-x-auto">
          <Container
            behaviour="copy"
            group-name="list-elements"
            :get-child-payload="layoutStore.getChildPayload1"
          >
            <Draggable
              v-for="item in layoutStore.availableElements"
              :key="item.id"
              class="aqt-sidebar__element"
            >
              <div class="cursor-pointer flex items-center gap-2">
                <img :src="mapImages[item.el]" :alt="item.name" />
                <div>
                  <div class="text-sm">{{ item.name }}</div>
                  <div v-if="item.description" class="text-xs text-gray-500">
                    {{ item.description }}
                  </div>
                </div>
              </div>
            </Draggable>
          </Container>
        </div>
      </div>
    </div>
    <div class="w-10/12 flex flex-col relative">
      <div class="flex items-center justify-end sticky right-0 bg-gray-100 z-30 top-0 py-1 px-2.5">
        <span
          class="cursor-pointer p-2"
          :title="isFullScreen ? 'Đóng toàn màn hình' : 'Toàn màn hình'"
          @click="toggleFullScreen"
        >
          <SvgIcon :name="isFullScreen ? 'shrink' : 'expand'" class="h-4 w-4" />
        </span>
      </div>
      <div class="flex-1 flex flex-col space-y-2 p-2.5 overflow-y-auto">
        <div class="flex-1 relative">
          <div
            v-if="layoutStore.layoutElements && layoutStore.layoutElements.length < 1"
            class="absolute inset-0 flex items-center justify-center"
          >
            <p class="text-center">Không có dữ liệu</p>
          </div>
          <Container
            v-else
            :get-child-payload="layoutStore.getChildPayload2"
            :autoScrollEnabled="true"
            @drop="layoutStore.onDropLayout($event)"
            drag-handle-selector=".drag-handle"
            lock-axis="y"
            class="space-y-2"
          >
            <Draggable v-for="item in layoutStore.layoutElements" :key="item.id" class="flex">
              <component
                :is="resolveComponent(item.el)"
                :dataItem="item"
                @onDropSection="(value: any) => layoutStore.handleDropSection(value)"
                @delete="layoutStore.deleteElement"
              >
              </component>
            </Draggable>
          </Container>
        </div>
        <div
          class="border border-gray-300 p-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 rounded text-sm"
          @click="layoutStore.addSection"
        >
          <SvgIcon name="plus" class="w-4 h-4" /><span>Thêm mới section</span>
        </div>
      </div>
    </div>
  </div>
  <ConfigModal
    v-if="settingsElementStore.showSettingsElement"
    :is-open="settingsElementStore.showSettingsElement"
  />
</template>
