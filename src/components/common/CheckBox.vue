<template>
  <div class="flex items-center">
    <input type="checkbox" :id="id" :checked="modelValue" @change="updateValue"
      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" :disabled="disabled" />
    <label :for="id" class="ml-2 block text-sm font-medium" :class="[disabled ? 'text-gray-400' : 'text-gray-700']">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

defineProps({
  modelValue: {
    type: Boolean || String,
    default: false,
    required: true
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => `checkbox-${uuidv4()}`,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>
