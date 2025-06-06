<template>
  <div class="space-y-1">
    <label
      :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >{{ label }}</label
    >
    <img class="max-h-[250px]" :src="`${configStore.appCoreApi}/media/${modelValue}`" alt="">

    <label
      :for="id"
      class="inline-block cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Tải ảnh lên
    </label>
    <input
      type="file"
      :id="id"
      @change="updateValue"
      class="hidden"
      :disabled="disabled"
      accept="image/*"
    />
    <div class="text-xs italic text-black text-opacity-50">{{ help }}</div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import {uploadFile} from "@/services/media.ts";
import {useConfigStore} from "@/stores/configStore.ts";
const configStore = useConfigStore()
defineProps({
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

const emit = defineEmits(['update:modelValue'])

const updateValue = async (event: Event) => {
  const file = event.target?.files[0];
  if (file) {
    const dataRes = await uploadFile(configStore.appCmsApi, file);
    console.log('dataRes.data[0]', dataRes);
    console.log('dataRes.data[1]', dataRes.data);
    if(dataRes && dataRes.succeeded) {
      emit('update:modelValue', dataRes.data[0].path)
    }
  }
}
</script>
