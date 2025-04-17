<template>
  <BaseSelect
    v-model="selected"
    :label="label"
    :options="listOptions"
    :help="help"
    :language="language"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'

import BaseSelect from '@/components/common/BaseSelect.vue'

const categoryStore = useCategoryStore()

// Reactive listOptions using computed
const listOptions = computed(() =>
  categoryStore.menus.map((item) => ({
    value: item.code,
    label: item.name,
  })),
)

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
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
  options: {},
})
const emit = defineEmits(['update:modelValue'])

const selected = ref<string | undefined>(props.modelValue)

// Watch selected to emit updates to parent
watch(selected, (newValue) => {
  emit('update:modelValue', newValue)
})

// Watch props.modelValue to sync with selected
watch(
  () => props.modelValue,
  (newValue) => {
    const isValid = listOptions.value.some((option) => option.value === newValue)
    if (isValid) {
      selected.value = newValue
    }
  },
)
</script>
