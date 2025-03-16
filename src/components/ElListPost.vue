<script setup lang="ts">
import { defineProps } from 'vue';
import type { ListItemsElementType } from '@/types'
import { useElementStore } from '@/stores/layouts';

const props = defineProps<{
    dataItem: ListItemsElementType;
}>();

const layoutStore = useElementStore();

const emit = defineEmits(['delete']);

const handleDelete = () => {
    layoutStore.deleteElement(props.dataItem.id);
};
</script>

<template>
    <div class="w-full bg-white rounded shadow p-4 mb-2">
        <div class="flex justify-between items-center mb-3">
            <h4 class="font-medium">{{ dataItem.data.title }}</h4>
            <div class="flex space-x-2">
                <button class="px-2 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
                <button class="px-2 py-1 bg-red-500 text-white rounded text-sm" @click="handleDelete">Delete</button>
            </div>
        </div>

        <div class="space-y-2">
            <!-- List of posts mock -->
            <div v-for="i in 3" :key="i" class="flex items-start p-2 border-b border-gray-100">
                <div class="w-20 h-20 bg-gray-200 flex-shrink-0 rounded mr-3"></div>
                <div>
                    <h5 class="font-medium">Post Title {{ i }}</h5>
                    <p class="text-sm text-gray-600">Short description of the post goes here, explaining what the post
                        is about...</p>
                    <div class="text-xs text-gray-400 mt-1">March 17, 2025</div>
                </div>
            </div>
        </div>
    </div>
</template>