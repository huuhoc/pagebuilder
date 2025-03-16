<script setup lang="ts">
import { onMounted, defineProps, ref } from 'vue';
import type { ListItemsElementType } from '@/types'
import { useElementStore } from '@/stores/layouts';
import ConfigModal from '@/components/ConfigModal.vue';

const props = defineProps<{
    dataItem: ListItemsElementType;
}>();

const layoutStore = useElementStore();

const emit = defineEmits(['delete']);

const handleDelete = () => {
    layoutStore.deleteElement(props.dataItem.id);
};

// Modal state
const isEditModalOpen = ref(false);

// Post content with defaults
const postContent = ref({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
    readingTime: 5
});

// Initialize post content from dataItem if available
onMounted(() => {
    if (props.dataItem.content) {
        postContent.value = { ...props.dataItem.content };
    } else {
        postContent.value.id = props.dataItem.id;
    }
});

const handleEdit = () => {
    isEditModalOpen.value = true;
};

const savePostChanges = (updatedPost: any) => {
    // Update local state
    postContent.value = updatedPost;

    // Update in store
    layoutStore.updateElement({
        id: props.dataItem.id,
        content: updatedPost
    });

    isEditModalOpen.value = false;
};

</script>

<template>
    <div class="w-full bg-white rounded shadow p-4 mb-2">
        <div class="flex justify-between items-center mb-3">
            <h4 class="font-medium">{{ dataItem.data.title }}</h4>
            <div class="flex space-x-2">
                <button class="px-2 py-1 bg-blue-500 text-white rounded text-sm" @click="handleEdit">Edit</button>
                <button class="px-2 py-1 bg-red-500 text-white rounded text-sm" @click="handleDelete">Delete</button>
            </div>
        </div>

        <div class="relative">
            <!-- Featured post mock display -->
            <div class="h-64 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <span class="text-gray-600">Featured Image</span>
            </div>

            <div class="space-y-2">
                <h3 class="text-xl font-bold">Featured Post Title</h3>
                <p class="text-gray-600">This is a featured post with a more prominent display that highlights important
                    content. It typically includes a large image and more detailed description than regular list posts.
                </p>

                <div class="flex items-center text-sm text-gray-500 mt-1">
                    <span class="mr-4">March 17, 2025</span>
                    <span>5 min read</span>
                </div>

                <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Read More</button>
            </div>
        </div>
    </div>
    <!-- Edit Modal -->
    <ConfigModal :is-open="isEditModalOpen" :post-data="postContent" @close="isEditModalOpen = false"
        @save="savePostChanges" />
</template>