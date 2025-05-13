<template>
  <div :class="['space-y-1', { 'pl-4': depth > 0 }]">
    <div
      class="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
      @click="toggleSelect"
    >
      <input
        type="checkbox"
        :checked="isSelected"
        class="mr-2"
        @click.stop
        @change="toggleSelect"
      />
      <span>{{ node.label }}</span>
    </div>
    <div v-if="node.children && node.children.length">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selected="selected"
        :isMultiple="isMultiple"
        :depth="depth + 1"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { TreeNodeType } from '@/types'

const props = defineProps({
  node: {
    type: Object as PropType<TreeNodeType>,
    required: true,
  },
  selected: {
    type: [String, Array] as PropType<string | string[] | undefined>,
    required: false,
    default: undefined,
  },
  isMultiple: {
    type: Boolean,
    default: false,
  },
  depth: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['select'])

const slug = computed(() => props.node.slug || '')

const isSelected = computed(() => {
  if (props.isMultiple) {
    console.log('slug', props.selected)

    return Array.isArray(props.selected) && props.selected.includes(slug.value)
  } else {
    return props.selected === slug.value
  }
})

const toggleSelect = () => {
  if (!slug.value) return

  if (props.isMultiple) {
    const current = Array.isArray(props.selected) ? [...props.selected] : []
    const index = current.indexOf(slug.value)

    if (index > -1) {
      current.splice(index, 1)
    } else {
      current.push(slug.value)
    }
    emit('select', current)
  } else {
    emit('select', isSelected.value ? '' : slug.value)
  }
}
</script>
