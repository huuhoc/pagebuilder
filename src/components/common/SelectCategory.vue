<template>
  <div class="space-y-2">
    <div class="flex gap-2 items-center">
      <label
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >{{ label }}:
      </label>
      <span v-if="nodeSelected && selected" class="bg-gray-100 rounded px-3 py-1 relative">
        <span>{{ language === 'en' ? nodeSelected?.englishName : nodeSelected?.name }}</span>
        <span
          class="bg-gray-100 rounded-full w-4 h-4 absolute -top-1.5 -right-1.5 cursor-pointer hover:text-red-500 flex items-center justify-center"
          @click="removeSelected"
          ><SvgIcon name="close" class="w-2 h-2"
        /></span>
      </span>
    </div>
    <div class="border border-muted rounded p-2 overflow-y-auto max-h-[300px]">
      <TreeNode
        v-for="node in tree"
        :key="node.id"
        :node="node"
        :selected="selected"
        @select="handleSelect"
      />
    </div>
    <div class="text-xs italic text-black text-opacity-50">{{ help }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import TreeNode from '@/components/base/TreeNode.vue'
import type { TreeNodeType, CategoryType } from '@/types'
import { useCategoryStore } from '@/stores/categoryStore'
import SvgIcon from '../SvgIcon.vue'

const categoryStore = useCategoryStore()

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
})

const convertToTree = (categories: CategoryType[], lang: string) => {
  const nodeMap = new Map<string, TreeNodeType>()
  const rootNodes: TreeNodeType[] = []

  // First pass: Create all nodes and populate the map
  categories.forEach((category) => {
    const label = lang === 'en' ? category.englishName : category.name
    const slug = lang === 'en' ? category.englishSlug : category.slug

    if (label && slug) {
      const node: TreeNodeType = {
        id: category.id,
        slug: lang === 'en' ? category.englishSlug : category.slug,
        label: lang === 'en' ? category.englishName : category.name,
        children: [],
      }
      nodeMap.set(category.id, node)
    }
  })

  // Second pass: Build the hierarchy
  categories.forEach((category) => {
    const node = nodeMap.get(category.id)
    // Skip if node wasn't created (due to undefined values)
    if (!node) {
      return
    }

    if (!category.parentId) {
      // If no parent, it's a root node
      rootNodes.push(node)
    } else {
      // Find parent and add as child
      const parentNode = nodeMap.get(category.parentId)
      if (parentNode) {
        if (!parentNode.children) {
          parentNode.children = []
        }
        parentNode.children.push(node)
      }
    }
  })

  // Clean up empty children arrays
  nodeMap.forEach((node) => {
    if (node.children && node.children.length === 0) {
      delete node.children
    }
  })

  return rootNodes
}

const tree = convertToTree(categoryStore.categories, props.language)

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)

const index = categoryStore.categories.findIndex((item) =>
  props.language === 'en' ? item.englishSlug === props.modelValue : item.slug === props.modelValue,
)
const nodeSelected = ref<CategoryType | undefined>(categoryStore.categories[index])

watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = newValue
  },
)

const handleSelect = (slug: string) => {
  if (slug) {
    const index = categoryStore.categories.findIndex((item) =>
      props.language === 'en' ? item.englishSlug === slug : item.slug === slug,
    )
    nodeSelected.value = categoryStore.categories[index]
    selected.value = slug
    emit('update:modelValue', slug)
  } else {
    emit('update:modelValue', '')
    nodeSelected.value = undefined
  }
}

const removeSelected = () => {
  nodeSelected.value = undefined
  selected.value = ''
  emit('update:modelValue', '')
}
</script>
