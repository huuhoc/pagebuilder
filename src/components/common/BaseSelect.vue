<template>
  <div>
    <label
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >{{ label }}</label
    >
    <div class="dropdown-select relative">
      <div
        @click="toggleDropdown"
        class="mt-1 relative w-full px-3 py-1.5 text-left bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        :class="{ 'border-indigo-500': isOpen }"
      >
        <span :class="selectedOption?.label ? 'text-black' : 'text-muted-foreground'">{{
          selectedOption?.label || placeholder
        }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SvgIcon
            name="chevron-down"
            class="w-5 h-5 text-gray-400"
            :class="{ 'rotate-180': isOpen }"
          />
        </span>
      </div>
      <div
        ref="dropdownContent"
        v-show="isOpen"
        class="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        :class="isDropdownAbove ? 'bottom-full top-auto mb-1' : 'top-full bottom-auto mt-1'"
      >
        <ul class="py-1 text-sm">
          <li
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
            :class="{ 'bg-indigo-50 text-indigo-700': selectedOption?.value === option.value }"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import type { OptionType } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
  options: {
    type: Array as PropType<OptionType[]>,
  },
  placeholder: {
    type: String,
    default: 'Chọn',
  },
  modelValue: {
    type: String || Number,
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

const emit = defineEmits(['update:modelValue'])

const optionInt =
  props.options && props.modelValue
    ? props.options?.find((item: OptionType) => item.value === props.modelValue)
    : undefined

const isOpen = ref(false)
const isDropdownAbove = ref(false)
const dropdownContent = ref<HTMLElement>()
const selectedOption = ref<OptionType | undefined>(optionInt)

// Handle clicks outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.dropdown-select')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// onMounted(() => {
//   document.addEventListener('click', handleClickOutside)
// })

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  nextTick(() => {
    checkDropdownPosition()
  })
}
const checkDropdownPosition = () => {
  const dropdown = dropdownContent.value
  if (!dropdown) return

  let parent = dropdown.parentElement
  let isParentOverflowHidden = false
  while (parent && parent !== document.body) {
    const style = window.getComputedStyle(parent)
    if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
      isParentOverflowHidden = true
      break
    }
    parent = parent.parentElement
  }

  const dropdownRect = dropdown.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  if (isParentOverflowHidden) {
    // If parent has overflow: hidden, check against parent's bounds
    const parentRect = parent!.getBoundingClientRect()
    isDropdownAbove.value = dropdownRect.bottom > parentRect.bottom
  } else {
    // Check against viewport if no overflow: hidden parent
    isDropdownAbove.value = viewportHeight - dropdownRect.bottom < dropdownRect.height
  }
}

const selectOption = (option: OptionType) => {
  selectedOption.value = option
  emit('update:modelValue', option.value)
  isOpen.value = false
  nextTick(() => {
    checkDropdownPosition()
  })
}
</script>
