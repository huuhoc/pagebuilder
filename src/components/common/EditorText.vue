<template>
  <div class="space-y-1">
    <label
      :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >{{ label }}</label>

   <QuillEditor v-model:content="content"
                  :options="editorOptions"
                  toolbar="full"
                  theme="snow"
                  contentType="html"
                  @change="onEditorChange($event)"
                  class="border rounded h-[200px]">
    </QuillEditor>

    <div class="text-xs italic text-black text-opacity-50">{{ help }}</div>
  </div>
</template>

<script setup lang="ts">

import 'quill/dist/quill.snow.css'
import { v4 as uuidv4 } from 'uuid'
import { ref, watch} from 'vue'
import { QuillEditor } from "@vueup/vue-quill";


const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => `input-${uuidv4()}`,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  help: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'vi',
  },
})

const editorOptions = {
  placeholder: 'Vui lòng nhập nội dung...',
  modules: {
    // cấu hình toolbar nếu cần
  }
}

const emit = defineEmits(['update:modelValue'])
const content =  ref(props.modelValue)

watch(() => props.modelValue, val => {
  if (val !== content.value) content.value = val
})

watch(content, val => {
  if (val !== props.modelValue) emit('update:modelValue', val)
})

function onEditorChange(event: any) {
  console.log('delta', event)
  emit('update:modelValue', event.html)
}

</script>
<style scoped>
.ql-container {
  min-height: 200px;
}
</style>
