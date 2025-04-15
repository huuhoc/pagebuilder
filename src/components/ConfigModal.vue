<template>
  <Teleport to="#aqt-contain">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded shadow-xl w-full max-w-2xl overflow-hidden">
        <div class="flex justify-between items-center px-4 py-2 border-b">
          <h3 class="text-base font-medium">
            Cài đặt {{ settingsElementStore.elementSelected?.name }}
          </h3>
          <span @click="closeModal" class="text-gray-500 hover:text-gray-700 cursor-pointer">
            <SvgIcon name="close" class="w-3 h-3" />
          </span>
        </div>

        <div class="p-4">
          <form @submit.prevent="saveChanges" class="text-sm">
            <div class="inline-flex gap-2 items-center justify-center rounded bg-muted p-1 text-muted-foreground">
              <span v-if="formData?.content"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium cursor-pointer"
                :class="{ 'bg-white': tabActive === 'content' }" @click="() => (tabActive = 'content')">Nội dung</span>
              <span v-if="formData?.styles"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium cursor-pointer"
                :class="{ 'bg-white': tabActive === 'styles' }" @click="() => (tabActive = 'styles')">Kiểu dáng</span>
            </div>
            <div class="border border-muted p-3">
              <div v-if="tabActive === 'content' && formData?.content">
                <div class="tab-languages flex items-center gap-2 px-3 -mb-px">
                  <span v-for="flag in languages" class="cursor-pointer px-2 py-1 border rounded-t-sm"
                    :key="`lang-${flag}`" :class="langCurrent === flag
                      ? 'border-primary border-b-white'
                      : 'border-muted border-b-primary rounded-b-sm'
                      " @click="() => (langCurrent = flag)">
                    <SvgIcon :name="`flag-${flag}`" class="w-4 h-4" />
                  </span>
                </div>
                <div class="border-t border-primary py-3">
                  <div v-for="lang in languages" v-show="langCurrent === lang" class="space-y-3" :key="`lang-${lang}`">
                    <div v-for="itemContent in Object.keys(formData?.content)" :key="`itemContent-${itemContent}`"
                      class="space-y-3">
                      <component :is="resolveComponent(formData.content[itemContent].type)"
                        v-model="formData.content[itemContent][`value_${lang}`]"
                        :label="formData.content[itemContent].label" :help="formData.content[itemContent].desc"
                        :language="lang" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="tabActive === 'styles' && formData?.styles">
                <div class="space-y-3">
                  <div v-for="itemStyle in Object.keys(formData?.styles)" :key="`itemStyle-${itemStyle}`">
                    <component :is="resolveComponent(formData.styles[itemStyle].type)"
                      v-model="formData.styles[itemStyle].value" :label="formData.styles[itemStyle].label" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="flex justify-end gap-2 px-4 py-2 border-t">
          <span @click="closeModal"
            class="h-8 px-4 flex items-center justify-center bg-gray-300 text-gray-800 cursor-pointer rounded text-sm font-medium hover:bg-gray-300/90">
            Hủy
          </span>
          <span @click="saveChanges"
            class="h-8 px-4 flex items-center justify-center bg-primary text-white cursor-pointer rounded text-sm font-medium hover:bg-primary/90">
            Lưu
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, ref, resolveComponent } from 'vue'
import type { FieldType } from '@/types'
import { useElementStore } from '@/stores/layouts'
import { useSettingsElementStore } from '@/stores/settingsElementStore'
import { useConfigStore } from '@/stores/configStore'

const layoutStore = useElementStore()
const settingsElementStore = useSettingsElementStore()
const configStore = useConfigStore()

const elementSelected = JSON.parse(JSON.stringify(settingsElementStore.elementSelected))

const languages = configStore.$state.languages

defineProps<{
  isOpen: Boolean
}>()

// Form data with defaults
const formData = reactive<{
  content?: {
    [key: string]: FieldType
  }
  styles?: {
    [key: string]: FieldType
  }
}>({
  content: elementSelected?.content,
  styles: elementSelected?.styles,
})

const tabActive = ref('content')

const langCurrent = ref('vi')

const closeModal = () => {
  settingsElementStore.setShowSettingsElement(false)
  settingsElementStore.setElementSelected(null)
}

const saveChanges = () => {
  layoutStore.updateElement({ id: elementSelected?.id, content: formData })
  closeModal()
}
</script>
