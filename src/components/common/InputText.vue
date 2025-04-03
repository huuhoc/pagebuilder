<template>
  <div class="space-y-1">
    <label :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{{ label
      }}</label>
    <input type="text" :id="id" :value="modelValue" @change="updateValue"
      class="flex h-9 w-full rounded border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="disabled" placeholder="Vui lòng nhập..." />
    <div class="text-xs italic text-black text-opacity-50">{{ help }}</div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

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
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
