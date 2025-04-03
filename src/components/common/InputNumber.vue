<!-- NumberField.vue -->
<template>
  <div>
    <label
      :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >{{ label }}</label
    >
  </div>
  <div class="inline-flex items-center relative">
    <span
      @click="decrement"
      :disabled="internalValue <= min"
      class="w-8 h-8 absolute top-0 left-0 cursor-pointer flex items-center justify-center text-black rounded-md hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      -
    </span>

    <input
      :id="id"
      type="text"
      inputmode="decimal"
      v-model.number="internalValue"
      @keydown="restrictInput"
      :min="min"
      :max="max"
      :step="step"
      class="flex h-8 w-28 px-8 rounded-md border border-input bg-transparent py-1 text-sm text-center shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    />

    <span
      @click="increment"
      :disabled="internalValue >= max"
      class="w-8 h-8 absolute top-0 right-0 cursor-pointer flex items-center justify-center text-black rounded-md hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      +
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => `input-${uuidv4()}`,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 30,
  },
  step: {
    type: Number,
    default: 1,
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

const internalValue = ref(props.modelValue)

const increment = () => {
  if (internalValue.value < props.max) {
    internalValue.value += props.step
    emit('update:modelValue', internalValue.value)
  }
}

const decrement = () => {
  if (internalValue.value > props.min) {
    internalValue.value -= props.step
    emit('update:modelValue', internalValue.value)
  }
}

// Watch for input changes
watch(internalValue, (newValue) => {
  let value = newValue
  if (value < props.min) value = props.min
  if (value > props.max) value = props.max
  internalValue.value = value
  emit('update:modelValue', value)
})

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  },
)

// Restrict keyboard input to numbers only
const restrictInput = (event: KeyboardEvent) => {
  // Allow: backspace, delete, tab, escape, enter, and arrow keys
  const allowedKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ]

  // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
  if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
    return
  }

  // Prevent default if not a number or allowed key
  if (!allowedKeys.includes(event.key) && !/^[0-9.-]$/.test(event.key)) {
    event.preventDefault()
  }
}
</script>
