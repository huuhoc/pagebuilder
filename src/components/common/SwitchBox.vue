<!-- SlideCheckbox.vue -->
<template>
  <div class="flex items-center">
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" v-model="internalValue" class="sr-only peer" />
      <span class="mr-3 text-sm font-medium text-gray-900" v-if="label">
        {{ label }}
      </span>
      <div
        class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"
      ></div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Define props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
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

// Define emits
const emit = defineEmits(['update:modelValue'])

// Internal value for v-model
const internalValue = ref(props.modelValue)

// Watch for changes and emit updates
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  },
)
</script>
