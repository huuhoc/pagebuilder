<template>
  <div class="space-y-1">
    <label
      :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >{{ label }}</label
    >

    <div class="flex items-center gap-1">
      <span
        v-for="item in 12"
        :key="item"
        @click="selectValue(item)"
        class="rounded border border-input px-2 py-1 cursor-pointer"
        :class="{ 'bg-gray-300': modelValue === item }"
      >
        {{ `${item}/12` }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

defineProps({
  modelValue: {
    type: Number,
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

const selectValue = (value: number) => {
  emit('update:modelValue', value)
}

const emit = defineEmits(['update:modelValue'])
</script>
