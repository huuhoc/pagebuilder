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
    type: String || null,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['select'])

const isSelected = computed(() => props.selected === props.node.slug)

const toggleSelect = () => {
  if (isSelected.value) {
    emit('select', '')
  } else {
    emit('select', props.node.slug)
  }
}
</script>
