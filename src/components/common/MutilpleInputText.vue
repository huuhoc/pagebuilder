<template>
  <div class="space-y-4">
    <div
      v-for="(item, index) in inputs"
      :key="item.id"
      class="space-y-2 border p-3 rounded-md bg-gray-50"
    >
      <div class="space-y-1">
        <label :for="`title-${item.id}`" class="text-sm font-medium">Tiêu đề #{{ index + 1 }}</label>
        <input
          type="text"
          :id="`title-${item.id}`"
          :value="item.title"
          @input="(e) => updateField(index, 'title', (e.target as HTMLInputElement).value)"
          class="w-full border px-3 py-1 rounded text-sm"
          placeholder="Nhập tiêu đề..."
          :disabled="disabled"
        />
      </div>

      <div class="space-y-1">
        <label :for="`desc-${item.id}`" class="text-sm font-medium">Nội dung</label>
<!--        <input-->
<!--          type="text"-->
<!--          :id="`desc-${item.id}`"-->
<!--          :value="item.description"-->
<!--          @input="(e) => updateField(index, 'description', (e.target as HTMLInputElement).value)"-->
<!--          class="w-full border px-3 py-1 rounded text-sm"-->
<!--          placeholder="Nhập mô tả..."-->
<!--          :disabled="disabled"-->
<!--        />-->
        <QuillEditor v-model:content="item.description"
                     :id="`desc-${item.id}`"
                     :options="editorOptions"
                     toolbar="full"
                     theme="snow"
                     contentType="html"
                     @textChange="onEditorChange($event)"
                     class="border rounded h-[150px]">
        </QuillEditor>
      </div>

      <div class="flex">
        <div
          v-if="inputs.length > 1"
          @click="removeInput(index)"
          class="px-3 py-1 flex justify-center items-center bg-red-600 text-white text-sm rounded hover:bg-red-700 cursor-pointer"
        >
          <SvgIcon name="close" class="w-2 h-2 mr-2"
          /><span>Xoá</span>
        </div>
      </div>
    </div>

    <!-- Nút thêm và lưu -->
    <div class="flex space-x-2">
      <div
        @click="addInput"
        class="px-3 py-1 flex justify-center items-center bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer"
      >
        <SvgIcon name="plus" class="w-2 h-2 mr-2"
        /> <span>Thêm</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import SvgIcon from "@/components/SvgIcon.vue";
import {QuillEditor} from "@vueup/vue-quill";

// Kiểu dữ liệu cho từng mục
type Item = {
  id: string
  title: string
  description: string
}

const editorOptions = {
  placeholder: 'Vui lòng nhập nội dung...',
  modules: {
    // cấu hình toolbar nếu cần
  }
}

// Props
const props = defineProps({
  modelValue: {
    type: Array as PropType<Item[]>,
    default: () => [],
  },
  label: String,
  id: {
    type: String,
    default: () => `input-${uuidv4()}`,
  },
  disabled: Boolean,
  help: String,
  language: {
    type: String,
    default: 'vi',
  },
})

const emit = defineEmits(['update:modelValue'])

const initialized = ref(false)
// Reactive data
const inputs = ref<Item[]>([])

watch(
  () => props.modelValue,
  (newVal) => {
    if (!initialized.value) {
      if (Array.isArray(newVal) && newVal.length > 0) {
        inputs.value = newVal.map((item) => ({
          ...item,
          id: item.id || uuidv4(),
        }))
      } else {
        inputs.value = [{ id: uuidv4(), title: '', description: '' }]
      }

      initialized.value = true
    }
  },
  { immediate: true }
)


// Thêm item mới
const addInput = () => {
  inputs.value.push({ id: uuidv4(), title: '', description: '' })
}

// Xoá
const removeInput = (index: number) => {
  inputs.value.splice(index, 1)
  saveInputs()
}

// Cập nhật field
const updateField = (index: number, field: 'title' | 'description', value: string) => {
  inputs.value[index][field] = value
  saveInputs()
}

// Lưu lại và emit
const saveInputs = () => {
  const cleaned = inputs.value
    .filter((item) => item.title.trim() || item.description.trim())
    .map((item) => ({
      id: item.id,
      title: item.title.trim(),
      description: item.description.trim(),
    }))

  emit('update:modelValue', cleaned)
}

function onEditorChange(event: any) {
  console.log('dsd', event)
  saveInputs()
}

</script>
