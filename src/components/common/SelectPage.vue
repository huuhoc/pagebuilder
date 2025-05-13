<template>
  <div class="space-y-2">
    <div class="flex gap-2 items-center">
      <label
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >{{ label }}:
      </label>
      <span v-if="nodeSelected && selected" class="bg-gray-100 rounded px-3 py-1 relative">
      <span
        v-for="(node, index) in nodeSelected"
        :key="index"
        class="bg-gray-100 rounded px-3 py-1 relative inline-block mr-2"
      >
        <span>{{ language === 'en' ? node.title_En : node.title }}</span>
        <span
          class="bg-gray-100 rounded-full w-4 h-4 absolute -top-1.5 -right-1.5 cursor-pointer hover:text-red-500 flex items-center justify-center"
          @click="removeSelected(node)"
        >
          <SvgIcon name="close" class="w-2 h-2" />
        </span>
      </span>
      </span>
    </div>
    <div class="border border-muted rounded p-2 overflow-y-auto max-h-[300px]">
      <TreeNode
        v-for="node in tree"
        :key="node.id"
        :node="node"
        :is-multiple="true"
        :selected="selected"
        @select="handleSelect"
      />
    </div>
    <div class="text-xs italic text-black text-opacity-50">{{ help }}</div>
  </div>
</template>

<script setup lang="ts">
import {type PropType, ref, watch} from 'vue'
import TreeNode from '@/components/base/TreeNode.vue'
import type {TreeNodeType, PageType} from '@/types'
import { usePageStore } from '@/stores/pageStore'
import SvgIcon from '../SvgIcon.vue'

const pageStore = usePageStore()

const props = defineProps({
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
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

const convertToTree = (pages: PageType[], lang: string) => {
  const nodeMap = new Map<string, TreeNodeType>()
  const rootNodes: TreeNodeType[] = []

  // First pass: Create all nodes and populate the map

  pages.forEach((page) => {
    const label = lang === 'en' ? page.title_En : page.title
    const slug = lang === 'en' ? page.slug_En : page.slug

    if (label && slug) {
      const node: TreeNodeType = {
        id: page.id,
        slug: lang === 'en' ? page.slug_En : page.slug,
        label: lang === 'en' ? page.title_En : page.title,
        children: [],
      }
      nodeMap.set(page.id, node)
    }
  })

  // Second pass: Build the hierarchy
  pages.forEach((page) => {
    const node = nodeMap.get(page.id)
    // Skip if node wasn't created (due to undefined values)
    if (!node) {
      return
    }

    if (!page.parentId) {
      // If no parent, it's a root node
      rootNodes.push(node)
    } else {
      // Find parent and add as child
      const parentNode = nodeMap.get(page.parentId)
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

const tree = convertToTree(pageStore.page, props.language)

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue);

const slugs = props.modelValue as string[] | undefined;

const filtered = slugs && slugs.length
  ? pageStore.page.filter((item: PageType) => (slugs as string[]).includes(item.slug))
  : [];

const nodeSelected = ref<PageType[] | undefined>(filtered)


watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = newValue
  },
)

const handleSelect = (slug: string | string[]) => {
  if (Array.isArray(slug)) {
    const selectedNodes = pageStore.page.filter((item: any) =>
      slug.includes(props.language === 'en' ? item.slug_En : item.slug)
    )
    nodeSelected.value = selectedNodes

    selected.value = slug
    emit('update:modelValue', slug)
  }
}


const removeSelected = (nodeToRemove?: PageType) => {
  if (Array.isArray(selected.value)) {
    selected.value = selected.value.filter(slug => {
      const nodeSlug = props.language === 'en' ? nodeToRemove?.slug_En : nodeToRemove?.slug
      return slug !== nodeSlug
    })
    if (Array.isArray(nodeSelected.value)) {
      nodeSelected.value = nodeSelected.value.filter(node => {
        const slug = props.language === 'en' ? node.slug_En : node.slug
        return slug !== (props.language === 'en' ? nodeToRemove?.slug_En : nodeToRemove?.slug)
      })
    }
    emit('update:modelValue', selected.value)
  }
}
</script>
